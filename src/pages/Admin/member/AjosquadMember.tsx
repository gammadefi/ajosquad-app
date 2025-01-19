import { useState } from 'react'
import { Table, TableEmpty } from '../../../components/Table/Table';
import SearchInput from '../../../components/FormInputs/SearchInput';
import { InfoCard } from '../../../components/InfoCard/InfoCard2';
import { Label } from '../../../components/Label/Label';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useQuery } from 'react-query';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import { squadServices } from '../../../services/squad';
import PageLoader from '../../../components/spinner/PageLoader';
import { formatDate2 } from '../../../utils/formatTime';
import { generateSerialNumber } from '../../../utils/helpers';

const AjosquadMember = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);

    const { data: stats, isLoading, error } = useQuery(['admin-squad-stats'], squadServices.getSquadStats);
    const { data: members, isLoading: isMembersLoading } = useFetchWithParams([`query-all-members`, {
        searchName: search,
        page: currentPage
    }], squadServices.getSquadMembers, {
        onSuccess: (data: any) => {
            console.log(data)
        }
    })
    console.log(members)
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
            view: (row: any) => <div>{`${row.firstName} ${row.lastName}`}</div>,
        },
        {
            header: "Member ID",
            view: (row: any) => <div>{row.id}</div>,
        },
        {
            header: "Member Email",
            view: (row: any) => <div>{row.email_address}</div>,
        },
        {
            header: "Date Joined",
            view: (row: any) => <div>{formatDate2(row.createdAt)}</div>,
        },
        {
            header: "KYC Status",
            view: (row: any) => <div>{row.kycVerificationStatus}</div>,
        },
        {
            header: "Operation Status",
            view: (row: any) => <Label variant="success" >{row?.operationStatus || "N/A"}</Label>,
        },
    ];
    return (
        <div className='px-3  md:px-6'>
            <button onClick={() => navigate(-1)} className='text-sm font-medium text-black flex items-center gap-1'><IoIosArrowRoundBack size={24} /> Back</button>
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>Ajosquad Member</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        You can view all Ajosquad Member here.
                    </p>
                </div>
            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-4'>
                <InfoCard header="Ajosquad Member" isLoading={isLoading} iconName='people' value={stats && stats.data.totalSquadMembers} />
            </div>
            <div>
                <div className='my-8 flex justify-between items-center '>
                    <h3 className='text-xl font-semibold'>Ajosquad Member</h3>

                    <div className='flex items-center gap-2'>
                        <SearchInput placeholder='Search...' />
                        <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button>
                    </div>
                </div>
                {
                    isMembersLoading ? <PageLoader /> :
                        members && members.data.length === 0 ? <TableEmpty title='No Member yet' image='/empty-states/people.png' subtitle="No member yet in any squad" /> : <Table
                            data={members.data}
                            columns={columns}
                            loading={false}
                            clickRowAction={(row) => {
                                console.log(row.id)
                                navigate(`/member-management/member-information/${row.id}`)
                            }}
                            pagination={
                                {
                                    page: currentPage,
                                    setPage: (page) => setCurrentPage(page),
                                    pageSize: 10,
                                    totalRows: members?.total,

                                }
                            }
                        />
                }
            </div>
        </div>
    )
}

export default AjosquadMember