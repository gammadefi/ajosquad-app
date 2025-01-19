import { useState } from 'react'
import { Table, TableEmpty } from '../../../components/Table/Table';
import SearchInput from '../../../components/FormInputs/SearchInput';
import { InfoCard } from '../../../components/InfoCard/InfoCard2';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import { squadServices } from '../../../services/squad';
import { generateSerialNumber } from '../../../utils/helpers';
import { fDate } from '../../../utils/formatTime';
import PageLoader from '../../../components/spinner/PageLoader';
import { useQuery } from 'react-query';
import { useSearchParamsToObject } from '../../../hooks/useSearchParamsToObject';

const SquadMember = () => {
    const navigate = useNavigate()
    const searchParamsObject = useSearchParamsToObject();
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);

    const { data: stats, isLoading, error } = useQuery(['admin-squad-stats'], squadServices.getSquadStats);
    const { data: members, isLoading: isMembersLoading } = useFetchWithParams([`query-all-members`, {
        ...searchParamsObject,
        page: currentPage
    }], squadServices.getSquadMembers, {
        onSuccess: (data: any) => {
            console.log(data)
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
            header: "Member Name",
            view: (row: any) => <div>{row.firstName} {row.lastName}</div>,
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
            view: (row: any) => <div>{fDate(row.createdAt)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <div className={`capitalize rounded-lg p-1 ${row.status === "active" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>{row.status}</div>,
        }
    ];
    return (
        <div className='px-3  md:px-6'>
            <button onClick={() => navigate(-1)} className='text-sm font-medium text-black flex items-center gap-1'><IoIosArrowRoundBack size={24} /> Back</button>
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>Squad Member</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        You can view all the squad member information and record here.
                    </p>
                </div>
            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-3'>
                <InfoCard isLoading={isLoading} header="Squad Member" iconName='people' value={stats && stats.data.inactiveMembers + stats.data.activeMembers} />
                <InfoCard isLoading={isLoading} header="Active Member" iconName='profile-2user-active' value={stats && stats.data.activeMembers} />
                <InfoCard isLoading={isLoading} header="Inactive Member" iconName='profile-2user-inactive' value={stats && stats.data.inactiveMembers} />
            </div>

            <div>
                <div className='my-8 flex flex-col lg:flex-row justify-between items-center gap-4'>
                    <div className='w-full flex justify-between items-center'>
                        <h3 className='text-xl font-semibold'>All Member</h3>
                        <button className='lg:hidden text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button>
                    </div>

                    <div className='w-full flex justify-between items-center gap-2 h-10'>
                        <SearchInput placeholder='Search...'
                            value={searchParams.get('searchName') || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                const params = new URLSearchParams(window.location.search);
                                if (value) {
                                    params.set('searchName', value);
                                } else {
                                    params.delete('searchName');
                                }
                                navigate(`?${params.toString()}`);
                            }}
                        />
                        <select
                            defaultValue={searchParams.get('status') || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                const params = new URLSearchParams(window.location.search);
                                if (value) {
                                    params.set('status', value);
                                } else {
                                    params.delete('status');
                                }
                                navigate(`?${params.toString()}`);
                            }}
                            className='bg-[#F5F5F9] lg:w-full disabled:text-[#666666] h-full pl-4 py-1.5 border-[0.4px] border-[#C8CCD0] rounded md:text-lg'
                        >
                            <option value="">Filter by Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <button className='hidden lg:block text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button>
                    </div>


                </div>
                {
                    isMembersLoading ? <PageLoader /> :
                        members && members.data.length === 0 ? <TableEmpty title='No Member yet' image='/empty-states/people.png' subtitle="No member yet in any squad" /> :
                            <Table
                                data={members.data}
                                clickRowAction={(row: any) => navigate(`/squad/squad-member/${row.id}`)}
                                columns={columns}
                                loading={false}
                                pagination={
                                    {
                                        page: currentPage,
                                        setPage: (page) => setCurrentPage(page),
                                        pageSize: 10,
                                        totalRows: members?.total
                                    }
                                }

                            />
                }


            </div>
        </div>
    )
}

export default SquadMember