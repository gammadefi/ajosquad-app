import { Table, TableEmpty } from '../../components/Table/Table';
import SearchInput from '../../components/FormInputs/SearchInput';
import { InfoCard } from '../../components/InfoCard/InfoCard2';
import { Label } from '../../components/Label/Label';
import { guarantorServices } from '../../services/guarantor';
import useFetchWithParams from '../../hooks/useFetchWithParams';
import { useQuery } from 'react-query';
import { useState } from 'react';
import PageLoader from '../../components/spinner/PageLoader';
import { formatDate2 } from '../../utils/formatTime';
import Modal from '../../components/Modal/Modal';
import GuarantorVerificationModal from '../../components/Guarantor/admin/GuarantorVerification';
import { useSearchParamsToObject } from '../../hooks/useSearchParamsToObject';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { generateSerialNumber } from '../../utils/helpers';

const GuarantorVerification = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [id, setId] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const searchParamsObject = useSearchParamsToObject();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { data, isLoading, error } = useQuery('guarantor-stats', async () => {
        const response = await guarantorServices.getGuarantorStats();
        return response;
    })

    const { data: guarantors, isLoading: isLoading2 } = useFetchWithParams(
        ["adminGuarantor", {
            page: currentPage,
            // orderBy: "createdAt,desc",
            ...searchParamsObject
        }],
        guarantorServices.getAllGuarantors,
        {
            onSuccess: (data: any) => {
                console.log(data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    const columns = [
        {
            header: "S/N",
            view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, {
                pageSize: 10,
                currentPage
            })}</div>
        },
        {
            header: "Member Name",
            view: (row: any) => <div>{row.name}</div>,
        },
        {
            header: "Member ID",
            view: (row: any) => <div>{row.id}</div>,
        },
        {
            header: "Member Email",
            view: (row: any) => <div>{row.email}</div>,
        },
        {
            header: "File ID",
            view: (row: any) => <div>{row.file || "N/A"}</div>,
        },
        {
            header: "Date Uploaded",
            view: (row: any) => <div>{formatDate2(row.createdAt)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <Label variant="success" >{row?.verificationStatus}</Label>,
        },
    ];



    return (
        <div className='px-3  md:px-6'>
            <div className='flex justify-between flex-wrap items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>Manage and Verify all your member guarantor in one place</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        Easily view and verify all member guarantors from a single dashboard.
                    </p>
                </div>
            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-4'>
                <InfoCard isLoading={isLoading} header="Total Guarantor" iconName='profile-2user' value={error ? "N/A" : `${data?.data?.total}`} />
                <InfoCard isLoading={isLoading} header="Verified Guarantor" iconName='profile-tick' value={error ? "N/A" : `${data?.data?.approved}`} />
                <InfoCard isLoading={isLoading} header="Unapproved Guarantor" iconName='profile-2user' value={error ? "N/A" : `${data?.data?.declined}`} />
            </div>
            <div>
                <div className='my-8 flex justify-between items-center '>
                    <h3 className='text-xl font-semibold'>All Member</h3>
                    <div className='flex items-center gap-2'>
                        <SearchInput placeholder='Search...'
                            value={searchParams.get('name') || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                const params = new URLSearchParams(window.location.search);
                                if (value) {
                                    params.set('name', value);
                                    setCurrentPage(1);
                                } else {
                                    params.delete('name');
                                }
                                navigate(`?${params.toString()}`);
                            }}
                        />
                        <select
                            defaultValue={searchParams.get('verificationStatus') || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                const params = new URLSearchParams(window.location.search);
                                if (value) {
                                    params.set('verificationStatus', value);
                                    setCurrentPage(1);
                                } else {
                                    params.delete('verificationStatus');
                                }
                                navigate(`?${params.toString()}`);
                            }}
                            className='bg-[#F5F5F9] lg:w-full disabled:text-[#666666] h-full pl-4 py-1.5 border-[0.4px] border-[#C8CCD0] rounded md:text-lg'
                        >
                            <option value="">Filter by Status</option>
                            <option value="verified">Verified</option>
                            <option value="pending">Pending</option>
                            <option value="declined">Declined</option>
                        </select>
                    </div>
                </div>
                {
                    isLoading2 ? <PageLoader /> :
                        guarantors && guarantors.data.length === 0 ? <TableEmpty title='No Member yet' image='/empty-states/people.png' subtitle="No member yet in any squad" /> : <Table
                            data={guarantors.data}
                            columns={columns}
                            loading={false}
                            clickRowAction={(row) => {
                                setId(row.id);
                                setOpenModal(true);
                            }}
                            pagination={
                                {
                                    page: currentPage,
                                    pageSize: 10,
                                    setPage: setCurrentPage,
                                    totalRows: guarantors.totalItems
                                }
                            }
                        />
                }
            </div>
            <Modal open={openModal} onClick={() => setOpenModal(!openModal)}>
                <GuarantorVerificationModal id={id} closeModal={() => setOpenModal(!openModal)} />
            </Modal>
        </div>
    )
}

export default GuarantorVerification