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
import { generateSerialNumber, jsonToCSV } from '../../utils/helpers'
import clsx from 'clsx'
import { useSearchParams } from 'react-router-dom'
import { useSearchParamsToObject } from '../../hooks/useSearchParamsToObject'

const Payment = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const [lastMonths, setLastMonths] = useState("All Time");
    const {status, ...searchParamsObject} = useSearchParamsToObject();


    const profile = useAuth((s) => s.profile)

    const columns = [
        {
            header: "S/N",
            view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, {
                pageSize: 10,
                currentPage
            })}</div>
        },
        {
            header: "Description",
            view: (row: any) => <div>{row.description}</div>,
        },
        {
            header: "Position",
            view: (row: any) => <div>{ row.position?.length > 0 ? row.position : "N/A"}</div>,
        },
        {
            header: "Amount",
            view: (row: any) => <div>CAD$ {parseInt(row.amount)}</div>,
        },
        {
            header: "Debit Date",
            view: (row: any) => <div>{fDate(row.dueDate)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <span className={`px-3 py-0.5 rounded-xl font-medium ${row.paymentStatus === 'completed' ? "text-[#036B26] bg-[#E7F6EC]" : (row.paymentStatus === 'upcoming' || row.paymentStatus === 'pending') ? "text-[#92610E] bg-[#FDF1DC]" : "text-blue-500 bg-blue-100"}`}> {row.paymentStatus === 'completed' ? "Successful" : row.paymentStatus === 'upcoming' ? "Upcoming" :  row.paymentStatus === 'pending' ? "Pending" : "Submitted"}</span>
        },
    ];

    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1);

    const { data: payments, isLoading, refetch, error } = useFetchWithParams(
        [`query-all-payments-${profile.id}`, {
            ...searchParamsObject,
            page: currentPage,
            paymentType: "AjosquadPayment",
            search,
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

    console.log(searchParamsObject);

    const { data: paymentsTotal, isLoading: isLoadingCount, refetch : refetchCount } = useFetchWithParams(
        [`query-all-total-payments-${profile.id}`, {
            months: lastMonths === "All Time" ? "" : lastMonths === "Last Month" ? "1" : "2"
        }],
        PaymentService.getTotalPayment,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )


    if (isLoadingCount) return <PageLoader />
    if (error) return <div className='px-3 md:px-6 text-center text-lg mt-10'>Error fetching payment history</div>

    return (
        <div className='px-3  md:px-6'>
            <>
                <div>
                    <InfoCard onfilterChange={(e) => setLastMonths(e) } iconName='moneys-credit'  value={`CA$ ${(parseInt(paymentsTotal?.total)).toLocaleString() ?? "0"}`} header='Total deposit' />
                </div>

                <h3 className='mt-8 text-[#0000006B] text-sm '><span className='text-[#000] mr-2 font-semibold text-xl '>Payment</span>  Stay on top of your finances! Track every payment made on your account.</h3>

                <div className='my-8 flex flex-col lg:flex-row gap-3 justify-between lg:items-center'>
                    <div className='flex justify-between'>
                        <h3 className='text-xl font-semibold'>All Payment  Transaction</h3>
                        {/* <button onClick={handleDownload} className='lg:hidden text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button> */}
                    </div>
                    <div className='flex items-center gap-2'>
                        <SearchInput onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search...' />
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
                        {/* <button onClick={handleDownload} className='hidden lg:block text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button> */}
                    </div>
                    <Filter filterBy={["amount", "date", "position", "squad", "paymentStatus"]} open={openFilter} onClose={() => setOpenFilter(false)} />
                </div>

                {
                    isLoading ? <PageLoader /> :
                    payments && payments.data && payments.data.length === 0 ? <TableEmpty title='Payment History Details' image='/empty-states/payment.png' subtitle="On this page, you'll find a record of your previous payment, and upcoming payment." /> :
                        <Table
                            data={payments.data.sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())}
                            columns={columns}
                            loading={false}
                            pagination={
                                {
                                    page: currentPage,
                                    pageSize: 10,
                                    setPage: setCurrentPage,
                                    totalRows: payments?.pagination.total
                                }
                            }
                        />
                }
            </>
        </div>
    )
}

export default Payment
