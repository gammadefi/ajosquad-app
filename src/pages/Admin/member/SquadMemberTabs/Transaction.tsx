import { useState } from 'react'
import { Label } from '../../../../components/Label/Label';
import { Table, TableEmpty } from '../../../../components/Table/Table';
import SearchInput from '../../../../components/FormInputs/SearchInput';
import { useQuery } from 'react-query';
import { statisticsServices } from '../../../../services/statistics';
import { useParams } from 'react-router-dom';
import PageLoader from '../../../../components/spinner/PageLoader';

const Transaction = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { id } = useParams();

    const columns = [
        {
            header: "S/N",
            view: (row: any) => <div className="pc-text-blue">{row.serialNumber}</div>
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

    const { data: transactonData, isLoading, error } = useQuery('transactions', async () => {
        const data = await statisticsServices.getTransactions({
            userId: id
        })
        return data.data;
    })

    console.log(transactonData);



    return (
        <div>
            {
                isLoading ? <PageLoader /> :
                    error ? <p>Error</p> :
                        transactonData ?
                            <div>
                                <div className='my-8 flex justify-between items-center '>
                                    <h3 className='text-xl font-semibold'>All transaction</h3>

                                    <div className='flex items-center gap-2'>
                                        <SearchInput placeholder='Search...' />
                                        <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button>
                                    </div>


                                </div>

                                {
                                    transactonData.data && transactonData.data.length === 0 ? <TableEmpty title='No transactions yet' image='/empty-states/transaction.png' subtitle="You're just getting started! No transaction has occurred yet on the platform." /> : <Table
                                        data={transactonData.data}
                                        columns={columns}
                                        loading={false}
                                        pagination={
                                            {
                                                page: currentPage,
                                                setPage: (page) => setCurrentPage(page),
                                                pageSize: 10,
                                                totalRows: transactonData.totalItems,

                                            }
                                        }

                                    />
                                }


                            </div>
                            :
                            <></>
            }
        </div>
    )
}

export default Transaction