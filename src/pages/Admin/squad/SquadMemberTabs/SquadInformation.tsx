import React from 'react'
import { Table, TableEmpty } from '../../../../components/Table/Table';
import SearchInput from '../../../../components/FormInputs/SearchInput';
import useFetchWithParams from '../../../../hooks/useFetchWithParams';
import { squadServices } from '../../../../services/squad';
import { useParams } from 'react-router-dom';
import PageLoader from '../../../../components/spinner/PageLoader';
import { generateSerialNumber } from '../../../../utils/helpers';
import { fDate } from '../../../../utils/formatTime';
import clsx from 'clsx';

const SquadInformation = () => {
    const [currentPage, setCurrentPage] = React.useState(1)
    const { id }: any = useParams()

    const { data: squads, isLoading } = useFetchWithParams([`query-all-user-squads-${id}`,
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
            header: "Amount",
            view: (row: any) => <div>CAD$ {row.amount.toLocaleString()}</div>,
        },
        {
            header: "Memebrs",
            view: (row: any) => <div>{row.squadMembers.length}</div>,
        },
        {
            header: "Date created",
            view: (row: any) => <div>{fDate(row.createdAt)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <span
                className={clsx(
                    "px-3 text-xs border py-1 rounded-lg",
                    row.status === "completed" && "bg-[#E7F6EC] text-[#036B26]",
                   ( row.status === "upcoming" || row.status === "active")  && "bg-[#FDF1DC] text-[#AD3307]",)}
            >{row.status}</span>,
        },
        // {
        //     header: "Start Date",
        //     view: (row: any) => <div>{fDate(row.startDate)}</div>,
        // },
        // {
        //     header: "End Date",
        //     view: (row: any) => <div>{fDate(row.endDate)}</div>,
        // },
    ];

    console.log(isLoading, squads)
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

                        squads && squads.data.length === 0 ? <TableEmpty title='No squad yet' image='/empty-states/transaction.png' subtitle="This user has not joined a squad" /> : <Table
                            data={squads.data}
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

export default SquadInformation