import { useState } from 'react'
import { InfoCard } from '../../../components/InfoCard/InfoCard2'
import SearchInput from '../../../components/FormInputs/SearchInput';
import { Table, TableEmpty } from '../../../components/Table/Table';
import { Label } from '../../../components/Label/Label';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { squadServices } from '../../../services/squad';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import { useSearchParamsToObject } from '../../../hooks/useSearchParamsToObject';
import { statisticsServices } from '../../../services/statistics';
import PageLoader from '../../../components/spinner/PageLoader';
import Filter from '../../../components/Filter/Filter';
import { generateSerialNumber, jsonToCSV } from '../../../utils/helpers';
import { fDate } from '../../../utils/formatTime';

const Index = () => {
    const navigate = useNavigate()
    const { data: stats, isLoading, error } = useQuery(['admin-squad-stats'], squadServices.getSquadStats);


    const [search, setSearch] = useState("");
    const [openFilter, setOpenFilter] = useState(false);
    const searchParamsObject = useSearchParamsToObject();
    const [currentPage, setCurrentPage] = useState(1)
    const { data: transactionData, isLoading: isTransactionLoading } = useFetchWithParams(
        [`query-all-transactions-admin-`, {
            fromAmount: searchParamsObject.minAMount,
            toAmount: searchParamsObject.maxAmount,
            endDate: searchParamsObject.endDate,
            startDate: searchParamsObject.startDate,
            search,
            page: currentPage,

        }], statisticsServices.getTransactions,
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
        if (transactionData && transactionData.data) {
            jsonToCSV(transactionData.data, 'transactions.csv');
        }
    };

    const columns = [
        {
            header: "S/N",
            view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, {
                pageSize: 10,
                currentPage
            })}</div>
        },
        {
            header: "Member ID",
            view: (row: any) => <div>{row.id}</div>,
        },
        // {
        //     header: "Member Email",
        //     view: (row: any) => <div>{row.description}</div>,
        // },
        {
            header: "Payment Description",
            view: (row: any) => <div>{row.description}</div>,
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
            view: (row: any) => <Label variant="success" >{row?.status}</Label>,
        },
    ];

    return (
        <div className='px-3  md:px-6'>
            <div className='flex flex-wrap justify-between items-center'>
                <div>
                    <h3 className='text-base  md:text-xl font-semibold'>Manage and oversee all squad activities in one place</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        Monitor and control all squad activities from a centralized dashboard. Efficiently track progress, create squad, and drive squad productivity
                    </p>
                </div>
                <button className='h-[44px] border mt-5 lg:mt-0 border-primary px-4 py-2 rounded' >Create Squad <span></span></button>



            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-4'>
                <InfoCard header="Squad Member" iconName='people' isLoading={isLoading} action={{
                    label: "View More",
                    buttonAction: () => {
                        navigate("/squad/squad-member")
                    }
                }} value={stats && stats.data.inactiveMembers + stats.data.activeMembers} />
                <InfoCard header="Completed Squad" iconName='tick-square' isLoading={isLoading} action={{
                    label: "View More",
                    buttonAction: () => {
                        navigate("/squad/completed-squad")

                    }
                }} value={stats && stats.data.completedSquads.toString()} />
                <InfoCard header="Active Squad" iconName='activity' isLoading={isLoading} action={{
                    label: "View More",
                    buttonAction: () => {
                        navigate("/squad/active-squad")
                    }
                }} value={stats && stats.data.activeSquads.toString()} />
                <InfoCard header="Upcoming Squad" iconName='timer' isLoading={isLoading} action={{
                    label: "View More",
                    buttonAction: () => {
                        navigate("/squad/upcoming-squad")
                    }
                }} value={stats && stats.data.upcomingSquads.toString()} />
            </div>

            <div>
                <div className='my-8 flex flex-col lg:flex-row gap-3 justify-between lg:items-center'>
                    <div className='flex justify-between'>
                        <h3 className='text-xl font-semibold'>All Transaction</h3>
                        <button onClick={handleDownload} className='lg:hidden text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button>
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
                        <button onClick={handleDownload} className='hidden lg:block text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button>
                    </div>
                    <Filter filterBy={["amount", "date", "position", "squad", "status"]} open={openFilter} onClose={() => setOpenFilter(false)} />
                </div>
                {
                    isTransactionLoading ? <PageLoader /> :
                        transactionData.data.length === 0 ? <TableEmpty title="You haven't made any transactions yet" image='/empty-states/transaction.png' subtitle="You're just getting started! Join a Squad and track all transaction on your account here." /> : <Table
                            data={transactionData.data}
                            columns={columns}
                            loading={false}
                            pagination={
                                {
                                    pageSize: 10,
                                    page: currentPage,
                                    setPage: setCurrentPage,
                                    totalRows: transactionData.totalItems

                                }
                            }

                        />
                }


            </div>
        </div>
    )


}

export default Index