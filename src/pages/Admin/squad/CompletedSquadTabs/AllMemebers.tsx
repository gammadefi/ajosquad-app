import React from 'react'
import { Table, TableEmpty } from '../../../../components/Table/Table';
import SearchInput from '../../../../components/FormInputs/SearchInput';
import { useParams } from 'react-router-dom';
import useFetchWithParams from '../../../../hooks/useFetchWithParams';
import { squadServices } from '../../../../services/squad';
import PageLoader from '../../../../components/spinner/PageLoader';
import { generateSerialNumber } from '../../../../utils/helpers';
import { fDate } from '../../../../utils/formatTime';

const AllMembers = () => {
    const { id } = useParams()
    const [search, setSearch] = React.useState("")
    const [currentPage, setCurrentPage] = React.useState(1)

    const { data: members, isLoading } = useFetchWithParams([`query-all-members`, {
        squadId: id,
        searchName: search,
    }], squadServices.getSquadMembers, {
        onSuccess: (data: any) => {
            console.log(data)
        }
    })

    console.log(id, members)
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
        <div>
            <div>
                <div className='my-8 flex justify-between items-center '>
                    <h3 className='text-xl font-semibold'>Squad</h3>

                    <div className='flex items-center gap-2'>
                        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
                        {/* <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button> */}
                    </div>


                </div>


                {
                    isLoading ? <PageLoader /> :
                        members && members.data.length === 0 ? <TableEmpty title='No member yet' image='/empty-states/transaction.png' subtitle="This user has not joined a squad" /> : <Table
                            data={members.data}
                            columns={columns}
                            loading={false}
                            pagination={
                                {
                                    page: currentPage,
                                    setPage: setCurrentPage,
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

export default AllMembers