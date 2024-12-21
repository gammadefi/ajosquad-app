import React, { useState } from 'react'
import { InfoCard } from '../../components/InfoCard/InfoCard'
import SearchInput from '../../components/FormInputs/SearchInput'
import { Table, TableEmpty } from '../../components/Table/Table'
import Filter from '../../components/Filter/Filter'
import useFetchWithParams from '../../hooks/useFetchWithParams'
import { PaymentService } from '../../services/payment'
import PageLoader from '../../components/spinner/PageLoader'
import { useAuth } from '../../zustand/auth.store'
import { fDate } from '../../utils/formatTime'
import { generateSerialNumber } from '../../utils/helpers'
import clsx from 'clsx'

const Payment = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const [filterParams, setFilterParams] = useState({});
    const profile = useAuth((s) => s.profile)
    const columns = [
        {
            header: "S/N",
            view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, {
                pageSize: 10,
                currentPage})}</div>
        },
        {
            header: "Description",
            view: (row: any) => <div>{row.description}</div>,
        },
        {
            header: "Position",
            view: (row: any) => <div>{row.position}</div>,
        },
        {
            header: "Amount",
            view: (row: any) => <div>{row.amount}</div>,
        },
        {
            header: "Date",
            view: (row: any) => <div>{fDate(row.createdAt)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <span className={clsx(
                "px-3 text-xs border py-1 rounded-lg",
                row.paymentStatus === "success" && "bg-[#E7F6EC] text-[#036B26]",
                row.paymentStatus === "pending" && "bg-[#FDF1DC] text-[#AD3307]",
            )}>{row?.paymentStatus}</span>,
        },
    ];

    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const { data: payments, isLoading, refetch } = useFetchWithParams(
        [`query-all-payments-${profile.id}`, {

            page: currentPage
        }],
        PaymentService.getPayments,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    console.log(payments)




    return (
        <div className='px-3  md:px-6'>
            {
                isLoading ? <PageLoader /> :
                    <>
                        <div>
                            <InfoCard iconName='moneys-credit' value='CA$ 50,500.00' header='Total deposit' />
                        </div>

                        <h3 className='mt-8 text-[#0000006B] text-sm '><span className='text-[#000] mr-2 font-semibold text-xl '>Payment</span>  Stay on top of your finances! Track every payment made on your account.</h3>

                        <div className='my-8 flex flex-col lg:flex-row gap-3 justify-between lg:items-center'>
                            <div className='flex justify-between'>
                                <h3 className='text-xl font-semibold'>All Payment  Transaction</h3>
                                <button className='lg:hidden text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button>
                            </div>
                            <div className='flex items-center gap-2'>
                                <SearchInput placeholder='Search...' />
                                <button onClick={() => setOpenFilter(true)} className='bg-[#F5F5F9] w-full md:w-1/5 lg:w-full flex items-center justify-center gap-2 border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>
                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="20" height="3.33333" transform="translate(0 1.66797)" fill="#464749" />
                                        <rect width="20" height="3.33333" transform="translate(0 8.33203)" fill="#464749" />
                                        <rect width="20" height="3.33333" transform="translate(0 15)" fill="#464749" />
                                        <rect x="3.07617" width="3.07692" height="6.66667" rx="1.53846" fill="#464749" />
                                        <rect x="3.07617" y="13.332" width="3.07692" height="6.66667" rx="1.53846" fill="#464749" />
                                        <rect x="14.6133" y="6.66797" width="3.07692" height="6.66667" rx="1.53846" fill="#464749" />
                                    </svg>
                                    <span>
                                        Filter By
                                    </span>
                                </button>
                                <button className='hidden lg:block text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button>
                            </div>
                            <Filter filterBy={["amount", "date", "position", "squad", "status"]} open={openFilter} onClose={() => setOpenFilter(false)} />
                        </div>

                        {
                            isLoading ? <PageLoader /> :

                              payments.data &&  payments.data.payments.length === 0 ? <TableEmpty title='Payment History Details' image='/empty-states/payment.png' subtitle="On this page, you'll find a record of your previous payment, and upcoming payment." /> : 
                                <Table
                                    data={payments.data.payments}
                                    columns={columns}
                                    loading={false}
                                    pagination={
                                        {
                                            page: currentPage,
                                            pageSize:10,
                                            setPage: setCurrentPage,
                                            totalRows: payments?.pages

                                        }
                                    }

                                />
                        }
                    </>
            }



        </div>
    )
}

export default Payment