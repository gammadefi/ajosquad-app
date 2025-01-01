import { useState } from 'react'
import { InfoCard } from '../../components/InfoCard/InfoCard2'
import SearchInput from '../../components/FormInputs/SearchInput'
import { Table, TableEmpty } from '../../components/Table/Table'
import { Label } from '../../components/Label/Label'
import Filter from '../../components/Filter/Filter'
import { useAuth } from '../../zustand/auth.store'
import { PayoutService } from '../../services/payout'
import useFetchWithParams from '../../hooks/useFetchWithParams'
import { useSearchParamsToObject } from '../../hooks/useSearchParamsToObject'
import PageLoader from '../../components/spinner/PageLoader'
import { formatDate2 } from '../../utils/formatTime'

const Payout = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const searchParamsObject = useSearchParamsToObject();
    const [lastMonths, setLastMonths] = useState("All Time");
    const profile = useAuth((s) => s.profile)

    const columns = [
        {
            header: "S/N",
            view: (row: any) => <div className="pc-text-blue">{row.index}</div>
        },
        {
            header: "Member ID",
            view: (row: any) => <div>{row.squadMemberId}</div>,
        },
        {
            header: "Member Email",
            view: (row: any) => <div>{row.email || "N/A"}</div>,
        },
        {
            header: "Payment Description",
            view: (row: any) => <div>{row.description}</div>,
        },
        {
            header: "Type",
            view: (row: any) => <div>{row.type || "N/A"}</div>,
        },
        {
            header: "Amount",
            view: (row: any) => <div>CAD$ {row.amount}</div>,
        },
        {
            header: "Date",
            view: (row: any) => <div>{formatDate2(row.createdAt)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <Label variant="success" >{row?.status}</Label>,
        },
    ];

    const { data: payouts, isLoading, error } = useFetchWithParams(
        [`query-all-payouts-${profile.id}`, {
            ...searchParamsObject,
            page: currentPage
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

    const { data: payoutsTotal, isLoading: isLoadingCount } = useFetchWithParams(
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

    console.log(payouts)
    return (
        <div className='px-3  md:px-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>Manage and oversee all payout activities in one place</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        Monitor and manage all payout activities from a single, intuitive dashboard.
                    </p>
                </div>

            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-4'>
                <InfoCard onfilterChange={(e) => setLastMonths(e)} isLoading={isLoadingCount} iconName='moneys-debit' value={`CA$ ${payoutsTotal?.data.toLocaleString() ?? "0"}`} header='Total Withdrwal' />
                <InfoCard onfilterChange={(e) => setLastMonths(e)} isLoading={isLoadingCount} iconName='moneys-debit' value={`CA$ ${payoutsTotal?.data.toLocaleString() ?? "0"}`} header='AjoSquad Withdrawal' />
                <InfoCard iconName='moneys-debit' isLoading={false} value='CA$ 0.00' header='AjoHome Withdrawal' />
                <InfoCard iconName='moneys-debit' isLoading={false} value='CA$ 0.00' header='AjoBusiness Withdrawal' />
            </div>


            <div className='my-8 flex flex-col lg:flex-row gap-3 justify-between lg:items-center'>
                <div className='flex justify-between'>
                    <h3 className='text-xl font-semibold'>Payout Information</h3>
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




        </div>
    )
}

export default Payout