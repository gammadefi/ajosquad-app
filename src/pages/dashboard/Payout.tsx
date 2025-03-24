import { useState } from 'react'
import { InfoCard } from '../../components/InfoCard/InfoCard'
import SearchInput from '../../components/FormInputs/SearchInput'
import { Table, TableEmpty } from '../../components/Table/Table'
import Filter from '../../components/Filter/Filter'
import { useAuth } from '../../zustand/auth.store'
import useFetchWithParams from '../../hooks/useFetchWithParams'
import { PayoutService } from '../../services/payout'
import PageLoader from '../../components/spinner/PageLoader'
import { fDate } from '../../utils/formatTime'
import clsx from 'clsx'
import { useSearchParamsToObject } from '../../hooks/useSearchParamsToObject'
import { generateSerialNumber, jsonToCSV } from '../../utils/helpers'

const Payout = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const searchParamsObject = useSearchParamsToObject();
    const [lastMonths, setLastMonths] = useState("All Time");
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
            view: (row: any) => <div>{row.position}</div>,
        },
        {
            header: "Amount",
            view: (row: any) => <div>{row.amount}</div>,
        },
        {
            header: "Date",
            view: (row: any) => <div>{fDate(row.payoutDate)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <span className={clsx(
                "px-3 text-xs border py-1 rounded-lg",
                row.status === "success" && "bg-[#E7F6EC] text-[#036B26]",
                row.status === "pending" && "bg-[#FDF1DC] text-[#AD3307]",
            )}>{row?.status}</span>,
        },
    ];


    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const { data: payouts, isLoading, refetch, error } = useFetchWithParams(
        [`query-all-payouts-${profile.id}`, {
            ...searchParamsObject,
            page: currentPage,
            payoutType: "AjosquadPayout",
            search
        }],
        PayoutService.getPayouts,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    const { data: payoutsTotal, isLoading: isLoadingCount, refetch : refetchCount } = useFetchWithParams(
        [`query-all-total-payouts-${profile.id}`, {
            months: lastMonths === "All Time" ? "" : lastMonths === "Last Month" ? "1" : "2" 
        }],
        PayoutService.getTotalPayout,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    const handleDownload = () => {
        if (payouts && payouts.data) {
            jsonToCSV(payouts.data, 'payouts.csv');
        }
    };

    if (isLoadingCount) return <PageLoader />
    if (error) return <div className='px-3 md:px-6 text-center text-lg mt-10'>Error fetching payment history</div>

    console.log(lastMonths)
    return (
        <div className='px-3  md:px-6'>


            {
                false ? <PageLoader />

                    :
                    <>

                        <div>
                            <InfoCard onfilterChange={(e) => setLastMonths(e) } iconName='moneys-debit' value={`CA$ ${payoutsTotal?.data.toLocaleString() ?? "0"}`} header='Total Withdrwal' />
                        </div>

                        <h3 className='mt-8 text-[#0000006B] text-sm '><span className='text-[#000] mr-2 font-semibold text-xl '>Payout</span>  Track your payouts easily. See every transaction in one place.</h3>

                        <div className='my-8 flex flex-col lg:flex-row gap-3 justify-between lg:items-center'>
                            <div className='flex justify-between'>
                                <h3 className='text-xl font-semibold'>All Payout  Transaction</h3>
                                {/* <button onClick={handleDownload} className='lg:hidden text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button> */}
                            </div>
                            <div className='flex items-center gap-2'>
                                <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
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
                            <Filter filterBy={["amount", "date", "position", "squad", "status"]} open={openFilter} onClose={() => setOpenFilter(false)} />
                        </div>

                        {
                            isLoading ? <PageLoader /> :
                                payouts && payouts.data.length === 0 ? <TableEmpty title='Payout History Details' image='/empty-states/payout.png' subtitle="On this page, you'll find a record of your previous payouts, including dates, and amount." /> : <Table
                                    data={payouts.data}
                                    columns={columns}
                                    loading={false}
                                    pagination={
                                        {
                                            page: currentPage,
                                            setPage: setCurrentPage,
                                            totalRows: payouts.pagination.pages,
                                        }
                                    }
                                />
                        }

                    </>

            }
        </div>
    )
}

export default Payout