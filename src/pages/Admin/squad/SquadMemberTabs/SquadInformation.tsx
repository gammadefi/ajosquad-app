import { useState } from 'react'
import { Table, TableEmpty } from '../../../../components/Table/Table';
import SearchInput from '../../../../components/FormInputs/SearchInput';
import useFetchWithParams from '../../../../hooks/useFetchWithParams';
import { squadServices } from '../../../../services/squad';
import { useParams } from 'react-router-dom';
import PageLoader from '../../../../components/spinner/PageLoader';
import { generateSerialNumber } from '../../../../utils/helpers';
import { fDate, formatDate2 } from '../../../../utils/formatTime';
import clsx from 'clsx';
import Modal from '../../../../components/Modal/Modal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { MdArrowDropDown } from 'react-icons/md';
import toast from 'react-hot-toast';
import SquadMemberDetails from '../SquadMemberDetails';
import { ca } from 'date-fns/locale';
import { FaArrowRight } from 'react-icons/fa6';

const SquadInformation = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [squadId, setSquadId] = useState("");

    const { id }: any = useParams()

    const { data: squads, isLoading, error } = useFetchWithParams([`query-all-user-squads-${id}`,
    {
        page: currentPage
    }],
        () => squadServices.getUserSquad(id),
        {
            onSuccess: (data: any) => {
                // console.log(data)
            }
        })

    const columns = [
        {
            header: "S/N",
            view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, {
                pageSize: 10,
                currentPage
            })}</div>
        },
        {
            header: "Squad Name",
            view: (row: any) => <div>{row.name}</div>,
        },
        {
            header: "Position",
            view: (row: any) => {
                const position = row.squadMembers.find((squadMember: any) => squadMember.userId === id)?.position.length > 0 ? (row.squadMembers.find((squadMember: any) => squadMember.userId === id))?.position[0].slice(9) : "Nil";
                return (
                    <div>{position}</div>
                )
            },
        },
        {
            header: "Payout Date",
            view: (row: any) => {
                const data = row.squadMembers.find((squadMember: any) => squadMember.userId === id);
                const payoutDate = data.payoutDate;
                return (
                    <div>{payoutDate ? fDate(payoutDate) : "N/A"}</div>
                )
            }
        },
        {
            header: "Total Amount",
            view: (row: any) => <div>CAD$ {row.amount.toLocaleString()}</div>,
        },
        {
            header: "Date Joined",
            view: (row: any) => <div>{fDate(row.createdAt)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <span
                className={clsx(
                    "px-3 text-xs border py-1 rounded-lg",
                    row.status === "completed" && "bg-[#E7F6EC] text-[#036B26]",
                    (row.status === "upcoming" || row.status === "active") && "bg-[#FDF1DC] text-[#AD3307]",)}
            >{row.status}</span>,
        }
    ];
    return (
        <div>
            <div>
                <div className='my-8 flex justify-between items-center '>
                    <h3 className='text-xl font-semibold'>Squad</h3>

                    <div className='flex items-center gap-2'>
                        <SearchInput placeholder='Search...' />
                        <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button>
                    </div>
                </div>
                {
                    isLoading ? <PageLoader /> :
                        error ? <p>Error fetching data</p> :
                            squads && squads.data.length === 0 ? <TableEmpty title='No squad yet' image='/empty-states/transaction.png' subtitle="This user has not joined a squad" /> : <Table
                                data={squads.data}
                                columns={columns}
                                loading={false}
                                clickRowAction={(row) => {
                                    setSquadId(row.id);
                                    setOpenModal(true);
                                }}
                                pagination={
                                    {
                                        page: currentPage,
                                        setPage: setCurrentPage,
                                        pageSize: 10,
                                        totalRows: squads?.total,

                                    }
                                }

                            />
                }
                <Modal open={openModal} onClick={() => setOpenModal(false)}>
                    <SquadInformationDetail userId={id} squadId={squadId} closeModal={() => setOpenModal(false)} />
                </Modal>
            </div>
        </div>
    )
}

export default SquadInformation

export function SquadInformationDetail({ squadId, userId, closeModal }: { userId: string, squadId: string, closeModal: () => void }) {
    const positions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [step, setStep] = useState(1);
    const [newPosition, setNewPosition] = useState(0)
    const [showPositions, setShowPositions] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery(`admin-user-squad-information-${squadId}`, async () => {
        const response = await squadServices.getSquad(squadId);
        return response.data;
    })

    const selectedPositions = data?.squadMembers?.reduce((acc: any[], member: any) => {
        if (member.position.length > 0) {
            acc.push({
                position: member.position[0]?.slice(9) || '',
                name: `${member.User.firstName} ${member.User.lastName}`
            });
        }
        return acc;
    }, []) || [];

    const user = data ? (data.squadMembers.find((squadMember: any) => squadMember.userId === userId)) : {}


    const mutation = useMutation(async ({ payload }: { payload: any }) => {
        const res = await squadServices.updateSquadMemberPosition(squadId, user.id, payload);
        return res.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries([`query-all-user-squads-${userId}`]);
            queryClient.invalidateQueries([`admin-user-squad-information-${squadId}`]);
        },
    });

    const removeMutation = useMutation(async () => {
        const res = await squadServices.removeSquadMember(squadId, user.id);
        return res;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries([`query-all-user-squads-${userId}`]);
            queryClient.invalidateQueries([`admin-user-squad-information-${squadId}`]);
        },
    });


    // console.log(user)

    const handleUpdatePosition = async () => {
        if (!newPosition) {
            toast.error("Please select a position")
            return
        }
        const payload = {
            "newPosition": [newPosition]
        }

        try {
            setIsUpdating(true)
            const res = await mutation.mutateAsync({ payload });
            if (res) {
                toast.success("Action success")
                setIsUpdating(false)
                setStep(3);
            }
        } catch (error: any) {
            // console.log(error)
            setIsUpdating(false)
            toast.error(error.response.data.message || "Failed to update member position. Please try again")
        }
    }

    const handleRemoveMember = async () => {
        if (user.position.length > 0 && parseInt(user.position[0].slice(9)) >= 1 && parseInt(user.position[0].slice(9)) <= 5 && user.guarantorId) {
            toast.error("Cannot remove member with a guarantor in positions 1 to 5");
            return;
        }

        try {
            setIsUpdating(true);
            const res = await removeMutation.mutateAsync();
            console.log(res)
            if (res) {
                toast.success("Member removed successfully");
                setIsUpdating(false);
                closeModal();
            }
        } catch (error: any) {
            setIsUpdating(false);
            toast.error(error.response.data.message || "Failed to remove member. Please try again");
        }
    }



    if (isLoading) return <PageLoader />
    if (error) return <div className='px-3 md:px-6 text-center text-lg mt-10'>Error fetching payment history</div>

    return (
        <div className='w-[90vw] md:w-[500px] max-h-[500px] overflow-y-scroll'>
            {
                (step === 1) &&
                <div>
                    <div className='flex items-center justify-between'>
                        <div>
                        <h2 className='text-2xl md:text-3xl font-semibold'>Squad Information</h2>
                        <p>Squad information are provided below:</p>
                        </div>
                        <button  className=' font-semibold px-10 border border-[#f78457] rounded-lg text-red-500 inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50' onClick={() => setStep(4)}>Remove Member</button>
                    </div>
                   
                    <div className='mt-2 space-y-5 text-sm md:text-base'>
                        <div className='bg-[#F8F8F8] flex flex-col gap-2 p-2.5 rounded-lg mt-4'>
                            <div className="flex justify-between">
                                <span className='font-semibold'>Squad Name</span>
                                <span className='text-[#464749]'>{data.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status</span>
                                <span className={clsx(
                                    "px-3 text-xs border py-1 rounded-lg capitalize font-semibold",
                                    data.status === "completed" && "bg-[#E7F6EC] text-[#036B26]",
                                    (data.status === "upcoming" || data.status === "active") && "bg-[#FDF1DC] text-[#AD3307]",)}
                                >
                                    {data.status}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Amount</span>
                                <span className='text-[#464749] font-semibold'>CAD$ {data.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Description</span>
                                <span className='text-[#464749]'>{data.description}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Position</span>
                                <div className='text-[#464749]'>
                                    <span className='font-semibold'> {data?.squadMembers.find((member: any) => member.userId === userId)?.position.length
                                        ? `${data.squadMembers.find((member: any) => member.userId === userId)?.position[0].slice(9)}/10`
                                        : "Nil"}</span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span>Date Started</span>
                                <span className='text-[#464749]'>{formatDate2(data.startDate, true)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Ending Date</span>
                                <span className='text-[#464749]'>{formatDate2(data.endDate, true)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between gap-5">
                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={isUpdating}
                                className="disabled:cursor-not-allowed border border-primary font-medium px-10 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setStep(2)}
                                disabled={isUpdating}
                                className='bg-primary disabled:cursor-not-allowed font-medium rounded-lg text-white p-3 disabled:bg-opacity-50'
                            >

                                {user.position.length === 0 ? "Assign Member Position" : " Change Member Position"}
                            </button>
                        </div>
                    </div>
                </div>
            }

            {
                (step === 2) &&
                <div>
                    <h2 className='text-2xl md:text-3xl font-semibold'>{user.position.length === 0 ? "Assign Member Position" : " Change Member Position"}</h2>
                    <div className='mt-2 space-y-5 text-sm md:text-base'>
                        <div className='bg-[#F8F8F8] flex flex-col gap-2 p-2.5 rounded-lg mt-4'>
                            <div className="flex justify-between">
                                <span className='font-semibold'>Squad Name</span>
                                <span className='text-[#464749]'>{data.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status</span>
                                <span className={clsx(
                                    "px-3 text-xs border py-1 rounded-lg capitalize font-semibold",
                                    data.status === "completed" && "bg-[#E7F6EC] text-[#036B26]",
                                    (data.status === "upcoming" || data.status === "active") && "bg-[#FDF1DC] text-[#AD3307]",)}
                                >
                                    {data.status}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Amount</span>
                                <span className='text-[#464749] font-semibold'>CAD$ {data.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Member Name</span>
                                <span className='text-[#464749]'>{`${user.User.firstName} ${user.User.lastName}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Member ID</span>
                                <span className='text-[#464749]'>{user.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Position</span>
                                <div className='text-[#464749]'>
                                    <span className='font-semibold'> {data?.squadMembers.find((member: any) => member.userId === userId)?.position.length
                                        ? `${data.squadMembers.find((member: any) => member.userId === userId)?.position[0].slice(9)}/10`
                                        : "Nil"}</span>
                                </div>
                            </div>
                        </div>
                        <div className='space-y-1 text-sm'>
                            <span className='font-medium'>Select Position</span>
                            <div onClick={() => setShowPositions(!showPositions)} className='py-2.5 px-3.5 cursor-pointer rounded-lg border border-[#D0D5DD] w-full flex justify-between items-center'>
                                <span className='text-#787A7D]'>Select a new position for member</span>
                                <MdArrowDropDown size={25} />
                            </div>
                            {
                                showPositions &&
                                <div className='text-base py-1.5 px-2.5 rounded-lg border border-[#D0D5DD] w-full space-y-2'>
                                    {
                                        positions.map((position) => {
                                            const result = selectedPositions.find((selectPosition: any) => position === Number(selectPosition.position));
                                            return (
                                                <div key={position}>
                                                    {
                                                        result ?
                                                            (
                                                                <div className='text-black/50 py-3 px-2 cursor-not-allowed flex justify-between items-center'>
                                                                    <div className='flex flex-col'>
                                                                        <span>{`Position ${position}`}</span>
                                                                        <span className='font-semibold'>{result.name}</span>
                                                                    </div>
                                                                    <span className='text-white rounded-xl py-0.5 px-2 bg-[#101928] bg-opacity-30'>Unavailable</span>
                                                                </div>
                                                            )
                                                            :
                                                            <div className={`py-3 px-2 rounded-lg cursor-pointer border ${position === newPosition ? "border-black" : "border-white"}`} onClick={() => setNewPosition(position)}>
                                                                {`Position ${position}`}
                                                            </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className="flex justify-between gap-5 font-medium">
                            <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => setStep(1)}
                                className="disabled:cursor-not-allowed border border-primary px-10 rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleUpdatePosition}
                                disabled={isUpdating}
                                className='bg-primary disabled:cursor-not-allowed rounded-lg px-10  text-white p-3 disabled:bg-opacity-50'
                            >
                                {user.position.length === 0 ? `Assign${isUpdating ? "ing" : ""}` : `Updat${isUpdating ? "ing" : "e"}`}
                            </button>
                        </div>
                    </div>
                </div>
            }
            {
                (step === 3) &&
                <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
                    <img src="/Trophy.svg" alt="Trophy" className='w-52 h-52' />
                    <div>
                        <h3 className='font-bold text-2xl text-center'>
                            Member Position Changed
                        </h3>
                    </div>
                    <p className='text-sm text-center'>
                        Success! the member position has been successfully changed, they would be notified.
                    </p>
                    <button
                        onClick={closeModal}
                        className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
                    >
                        Dismiss
                    </button>
                </div>
            }

            {
                (step === 4) &&

                <div className='md:w-[550px] lg:w-full flex flex-col items-center gap-5'>
                    <img src="/Delete.svg" alt="Delete bank" className='w-52 h-52' />
                    <div>
                        <h3 className='font-bold text-2xl text-center'>
                            Are you sure you want to remove this user?
                        </h3>
                    </div>
                    <p className='text-sm text-center'>
                        This action cannot be undone. The member will be permanently removed from the squad. If you're sure, click 'Remove' to confirm.
                    </p>
                    <div className="my-3 w-full flex justify-between">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="border border-primary font-medium px-10 rounded-lg"
                        >
                            Back
                        </button>
                        <button
                            type='submit'
                            disabled={false}
                            onClick={() => handleRemoveMember()}
                            className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
                        >
                            {removeMutation.isLoading ? "Removeing" : "Remove"}
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
