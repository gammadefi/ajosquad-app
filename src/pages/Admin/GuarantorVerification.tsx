import { Table, TableEmpty } from '../../components/Table/Table';
import SearchInput from '../../components/FormInputs/SearchInput';
import { InfoCard } from '../../components/InfoCard/InfoCard';
import { Label } from '../../components/Label/Label';
import { useNavigate } from 'react-router-dom';
import { guarantorServices } from '../../services/guarantor';
import useFetchWithParams from '../../hooks/useFetchWithParams';
import { useAuth } from '../../zustand/auth.store';
import { useQuery } from 'react-query';
import { useState } from 'react';
import PageLoader from '../../components/spinner/PageLoader';
import { formatDate2 } from '../../utils/formatTime';

const GuarantorVerification = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const profile = useAuth((s) => s.profile);

    const { data, isLoading, error } = useQuery('guarantor-stats', async () => {
        const response = await guarantorServices.getGuarantorStats();
        return response;
    })

    const { data: data2, isLoading: isLoading2, refetch } = useFetchWithParams(
        [`guarantor-${profile.id}`, {
            page: currentPage
        }],
        guarantorServices.getAllGuarantors,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    const columns = [
        {
            header: "S/N",
            view: (row: any) => <div className="pc-text-blue">{row.serialNumber}</div>
        },
        {
            header: "Member Name",
            view: (row: any) => <div>{row.name}</div>,
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
            header: "File ID",
            view: (row: any) => <div>{row.file || "N/A"}</div>,
        },
        {
            header: "Date Uploaded",
            view: (row: any) => <div>{formatDate2(row.createdAt)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <Label variant="success" >{row?.verificationStatus}</Label>,
        },
    ];

    console.log(data, data2)

    if (isLoading || isLoading2) return <PageLoader />
    if (error) return <div className='px-3 md:px-6 text-center text-lg mt-10'>Error fetching payment history</div>

    return (
        <div className='px-3  md:px-6'>
            <div className='flex justify-between flex-wrap items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>Manage and Verify all your member guarantor in one place</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        Easily view and verify all member guarantors from a single dashboard.
                    </p>
                </div>
            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-4'>
                <InfoCard header="Total Guarantor" iconName='profile-2user' value={isLoading ? "Please wait" : error ? "N/A" : `${data?.data?.total}`} />
                <InfoCard header="Verified Guarantor" iconName='profile-tick' value={isLoading ? "Please wait" : error ? "N/A" : `${data?.data?.approved}`} />
                <InfoCard header="Unapproved Guarantor" iconName='profile-2user' value={isLoading ? "Please wait" : error ? "N/A" : `${data?.data?.declined}`} />
            </div>
            <div>
                <div className='my-8 flex justify-between items-center '>
                    <h3 className='text-xl font-semibold'>All Member</h3>

                    <div className='flex items-center gap-2'>
                        <SearchInput placeholder='Search...' />
                        <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button>
                    </div>
                </div>
                {
                    data2.guarantors && data2.guarantors.length === 0 ? <TableEmpty title='No Member yet' image='/empty-states/people.png' subtitle="No member yet in any squad" /> : <Table
                        data={data2.guarantors.data}
                        columns={columns}
                        loading={false}
                        pagination={
                            {
                                page: currentPage,
                                pageSize: 10,
                                setPage: setCurrentPage,
                                totalRows: data2.guarantors.total
                            }
                        }
                    />
                }
            </div>
        </div>
    )
}

export default GuarantorVerification