import React from 'react'
import { mockData } from '../../../samples/mockdata';
import { Table, TableEmpty } from '../../../components/Table/Table';
import SearchInput from '../../../components/FormInputs/SearchInput';
import { InfoCard } from '../../../components/InfoCard/InfoCard2';
import { Label } from '../../../components/Label/Label';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useQuery } from 'react-query';
import { squadServices } from '../../../services/squad';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import PageLoader from '../../../components/spinner/PageLoader';

const CompletedSquad = () => {
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = React.useState(1)
        const [search, setSearch] = React.useState('')
    
    const { data: stats, isLoading, error } = useQuery(['admin-squad-stats-completed'], () => squadServices.getSquadStatsByStatus("completed"));

    const { data: squads, isLoading: isLoadingSquads } = useFetchWithParams([`query-all-completed-squads`,
        {
            status: "completed",
            page: currentPage,
            search
        }],
        squadServices.getAllSquads,
        {
            onSuccess: (data: any) => {
                console.log(data)
            }
        })


    const columns = [
        {
            header: "S/N",
            view: (row: any) => <div className="pc-text-blue">{row.serialNumber}</div>
        },
        {
            header: "Member ID",
            view: (row: any) => <div>{row.description}</div>,
        },
        {
            header: "Member Email",
            view: (row: any) => <div>{row.description}</div>,
        },
        {
            header: "Payment Description",
            view: (row: any) => <div>{row.position}</div>,
        },
        {
            header: "Amount",
            view: (row: any) => <div>{row.amount}</div>,
        },
        {
            header: "Date",
            view: (row: any) => <div>{row.date}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <Label variant="success" >{row?.status}</Label>,
        },
    ];
    return (
        <div className='px-3  md:px-6'>
            <button onClick={() => navigate(-1)} className='text-sm font-medium text-black flex items-center gap-1'><IoIosArrowRoundBack size={24} /> Back</button>
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>Completed Squad</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        You can view all completed squad here, its transaction record and its member.
                    </p>
                </div>




            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-5'>
                <InfoCard isLoading={isLoading} header="Total Active Squad" iconName='tick-square' value={stats && stats.data.total} />
                <InfoCard isLoading={isLoading} header="Brass Squad" iconName='tick-square' value={stats && stats.data.brass} />
                <InfoCard isLoading={isLoading} header="Bronze Squad" iconName='tick-square' value={stats && stats.data.bronze} />
                <InfoCard isLoading={isLoading} header="Silver Squad" iconName='tick-square' value={stats && stats.data.silver} />
                <InfoCard isLoading={isLoading} header="Gold Squad" iconName='tick-square' value={stats && stats.data.gold} />

                {/* <InfoCard header="Cash Rewards" iconName='moneys-credit' value="CAD$ 500,000.00" /> */}

            </div>

            <div>
                <div className='my-8 flex justify-between items-center '>
                    <h3 className='text-xl font-semibold'>Squad</h3>

                    <div className='flex items-center gap-2'>
                        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
                        {/* <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button> */}
                    </div>


                </div>


                {
                   isLoadingSquads ? <PageLoader /> :
                   squads && squads.data?.length === 0 ? <TableEmpty title='No Member yet' image='/empty-states/people.png' subtitle="No member yet in any squad" /> :
                        <Table
                            clickRowAction={(row: any) => navigate(`/squad/completed-squad/${row.id}`)}
                            data={squads && squads?.data}
                            columns={columns}
                            loading={false}
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


            </div>
        </div>
    )
}

export default CompletedSquad