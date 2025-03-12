import { useState } from 'react'
import { InfoCard } from '../../components/InfoCard/InfoCard2'
import SearchInput from '../../components/FormInputs/SearchInput'
import { Table, TableEmpty } from '../../components/Table/Table'
import Filter from '../../components/Filter/Filter'
import useFetchWithParams from '../../hooks/useFetchWithParams'
import { PaymentService } from '../../services/payment'
import { useSearchParamsToObject } from '../../hooks/useSearchParamsToObject'
import PageLoader from '../../components/spinner/PageLoader'
import { formatDate2 } from '../../utils/formatTime'
import Modal from '../../components/Modal/Modal'
import PaymentModal from '../../components/Payment/admin/PaymentModal'
import { generateSerialNumber, jsonToCSV } from '../../utils/helpers'

const Payment = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const [lastMonths, setLastMonths] = useState("All Time");
    const [currentPage, setCurrentPage] = useState(1);
    const [id, setId] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const searchParamsObject = useSearchParamsToObject();
    const [search, setSearch] = useState("");
    

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
            view: (row: any) => <div>{row.User.firstName} {row.User.lastName}</div>,
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
            view: (row: any) => <div>{row.paymentType	 || "N/A"}</div>,
        },
        {
            header: "Amount",
            view: (row: any) => <div>CAD$ {row.amount}</div>,
        },
        {
            header: "Date",
            view: (row: any) => <div className='whitespace-nowrap'>{formatDate2(row.dueDate)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <span className={`px-3 py-0.5 rounded-xl font-medium ${row.status === 'completed' ? "text-[#036B26] bg-[#E7F6EC]" : row.status === 'upcoming' ? "text-[#92610E] bg-[#FDF1DC]" : "text-red-500 bg-red-100"}`}>{row.status === 'completed' ? "Successful" : row.status === 'upcoming' ? "Upcoming" : "Pending"}</span>
            ,
        },
    ];

    const { data: payments, isLoading, error } = useFetchWithParams(
        ["query-all-payments-admin", {
            ...searchParamsObject,
            page: currentPage,
            search
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

    const { data: paymentsTotal, isLoading: isLoadingCount } = useFetchWithParams(
        ["query-all-total-payments-admin", {
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

    const handleDownload = () => {
        if (payments && payments.data) {
            const formattedData = payments.data.map((payment: any) => {
                const { User, ...rest } = payment;
                return {
                    ...rest,
                    firstName: User.firstName,
                    lastName: User.lastName,
                    email: User.email_address,
                };
            });
            jsonToCSV(formattedData, 'payments.csv');
        }
    };

    return (
        <div className='px-3  md:px-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>Manage and oversee all deposit activities in one place</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        Monitor and manage all deposit activities from a single, intuitive dashboard.
                    </p>
                </div>

            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-4'>
                <InfoCard onfilterChange={(e) => setLastMonths(e)} isLoading={isLoadingCount} iconName='moneys-credit' value={`CA$ ${paymentsTotal?.total.toLocaleString() ?? "0"}`} header='Total deposit' />
                <InfoCard onfilterChange={(e) => setLastMonths(e)} isLoading={isLoadingCount} iconName='moneys-credit' value={`CA$ ${paymentsTotal?.total.toLocaleString() ?? "0"}`} header='AjoSquad deposit' />
                <InfoCard iconName='moneys-credit' isLoading={false} value='CA$ 0.00' header='AjoHome deposit' />
                <InfoCard iconName='moneys-credit' isLoading={false} value='CA$ 0.00' header='AjoBusiness deposit' />
            </div>


            <div className='my-8 flex flex-col lg:flex-row gap-3 justify-between lg:items-center'>
                <div className='flex justify-between'>
                    <h3 className='text-xl font-semibold'>Payment Information</h3>
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
                isLoading ? <PageLoader /> :
                    payments.data && payments.data.length === 0 ? <TableEmpty title='Payment History Details' image='/empty-states/payment.png' subtitle="On this page, you'll find a record of your previous payment, and upcoming payment." /> : <Table
                        data={payments.data.sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())}
                        columns={columns}
                        loading={false}
                        clickRowAction={(row) => {
                            setId(row.id);
                            setOpenModal(true);
                        }}
                        pagination={
                            {
                                page: currentPage,
                                pageSize: 10,
                                setPage: setCurrentPage,
                                totalRows: payments.pagination.total
                            }
                        }
                    />
            }
            <Modal open={openModal} onClick={() => setOpenModal(!openModal)}>
                <PaymentModal id={id} />
            </Modal>
        </div>
    )
}

export default Payment