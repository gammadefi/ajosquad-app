import React from 'react'
import { mockData } from '../../../samples/mockdata';
import { Table, TableEmpty } from '../../../components/Table/Table';
import SearchInput from '../../../components/FormInputs/SearchInput';
import { InfoCard } from '../../../components/InfoCard/InfoCard2';
import { Label } from '../../../components/Label/Label';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import { squadServices } from '../../../services/squad';
import { generateSerialNumber } from '../../../utils/helpers';
import { fDate } from '../../../utils/formatTime';
import PageLoader from '../../../components/spinner/PageLoader';
import { useQuery } from 'react-query';

const SquadMember = () => {
    const navigate = useNavigate()
    const [search, setSearch] = React.useState('')
    const [currentPage, setCurrentPage] = React.useState(1)
          const { data: stats, isLoading, error } = useQuery(['admin-squad-stats'], squadServices.getSquadStats );
    

    const { data: members, isLoading:isMembersLoading } = useFetchWithParams([`query-all-members`, {
        searchName: search,
        page:currentPage
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
                <InfoCard isLoading={isLoading} header="Squad Member" iconName='people' value={stats && stats.data.inactiveMembers + stats.data.activeMembers } />
                <InfoCard isLoading={isLoading} header="Active Member" iconName='profile-2user-active' value={stats && stats.data.activeMembers } />
                <InfoCard isLoading={isLoading} header="Inactive Member" iconName='profile-2user-inactive' value={stats && stats.data.inactiveMembers} />

                {/* <InfoCard header="Cash Rewards" iconName='moneys-credit' value="CAD$ 500,000.00" /> */}

            </div>

            <div>
                <div className='my-8 flex justify-between items-center '>
                    <h3 className='text-xl font-semibold'>All Members</h3>

                    <div className='flex items-center gap-2'>
                        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
                        <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button>
                    </div>


                </div>


                {
                     isMembersLoading ? <PageLoader /> :
                     members && members.data.length === 0 ? <TableEmpty title='No Member yet' image='/empty-states/people.png' subtitle="No member yet in any squad" /> :
                     <Table
                        data={members.data}
                       clickRowAction={(row:any) => navigate(`/squad/squad-member/${row.id}`)}
                        columns={columns}
                        loading={false}
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

export default SquadMember