import { Table, TableEmpty } from '../../components/Table/Table';
import SearchInput from '../../components/FormInputs/SearchInput';
import { InfoCard } from '../../components/InfoCard/InfoCard2';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useFetchWithParams from '../../hooks/useFetchWithParams';
import { useAuth } from '../../zustand/auth.store';
import { userServices } from '../../services/user';
import PageLoader from '../../components/spinner/PageLoader';
import clsx from 'clsx';
import { fDate } from '../../utils/formatTime';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useSearchParamsToObject } from '../../hooks/useSearchParamsToObject';

const KycPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchParamsObject = useSearchParamsToObject();
    const profile = useAuth(state => state.profile);

    const [currentPage, setCurrentPage] = useState(1);

    const { data: count, isLoading, error } = useQuery(['admin-user-count'], userServices.user.countAll);
    const { data: users, isLoading: isLoadingUsers } = useFetchWithParams([`get-all-users+${profile.id}`, {
        page: currentPage,
        ...searchParamsObject
    }], userServices.user.getAllUsers, {
        onSuccess: (data: any) => {

        },

    })



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
            view: (row: any) => <div>{row.email_address}</div>,
        },
        {
            header: "Date",
            view: (row: any) => <div>{fDate(row.createdAt)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <span className={clsx("px-2 py-1 rounded-md whitespace-nowrap", row?.kycVerificationStatus === "verified" ? "bg-[#E7F6EC] text-[#036B26]" : "bg-[#FBEAE9] text-[#9E0A05]")} >{row?.kycVerificationStatus === "verified" ? "Verified" : "Not Verified"}</span>,
        },
    ];

    return (
        <div className='px-3  md:px-6'>
            <button onClick={() => navigate(-1)} className='text-sm font-medium text-black flex items-center gap-1'><IoIosArrowRoundBack size={24} /> Back</button>
            <div className='flex justify-between flex-wrap items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>KYC Management</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        View and keep track of both verified and non-verified members in a single dashboard.
                    </p>
                </div>
            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-4'>
                <InfoCard isLoading={isLoading} header="Total Member" iconName='profile-2user' value={count && count.data.totalUsers} />
                <InfoCard isLoading={isLoading} header="Verified Member" iconName='profile-2user' value={count && count.data.verifiedUsers} />
                <InfoCard isLoading={isLoading} header="Non-verified member" iconName='profile-2user' value={count && (count.data.totalUsers - count.data.verifiedUsers)} />
            </div>

            <div>
                <div className='my-8 flex flex-col lg:flex-row justify-between items-center gap-4'>
                    <div className='w-full flex justify-between items-center'>
                        <h3 className='text-xl font-semibold'>All Member</h3>
                        <button className='lg:hidden text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button>
                    </div>

                    <div className='w-full flex justify-between items-center gap-2 h-10'>
                        <SearchInput placeholder='Search...'
                            value={searchParams.get('search') || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                const params = new URLSearchParams(window.location.search);
                                if (value) {
                                    params.set('search', value);
                                } else {
                                    params.delete('search');
                                }
                                navigate(`?${params.toString()}`);
                            }}
                        />
                        <select
                            defaultValue={searchParams.get('kycStatus') || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                const params = new URLSearchParams(window.location.search);
                                if (value) {
                                    params.set('kycStatus', value);
                                } else {
                                    params.delete('kycStatus');
                                }
                                navigate(`?${params.toString()}`);
                            }}
                            className='bg-[#F5F5F9] lg:w-full disabled:text-[#666666] h-full pl-4 py-1.5 border-[0.4px] border-[#C8CCD0] rounded md:text-lg'
                        >
                            <option value="">Filter by Status</option>
                            <option value="verified">Verified</option>
                            <option value="pending">Not Verified</option>
                        </select>
                        <button className='hidden lg:block text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button>
                    </div>


                </div>
                {
                    isLoadingUsers ? <PageLoader /> :
                        users && users?.users.length === 0 ? <TableEmpty title='No Member yet' image='/empty-states/people.png' subtitle="No member yet in any squad" /> : <Table
                            data={users.users}
                            columns={columns}
                            loading={false}
                            pagination={
                                {
                                    page: currentPage,
                                    setPage: (page) => setCurrentPage(page),
                                    totalRows: users?.pages,
                                }
                            }

                        />
                }


            </div>
        </div>
    )
}

export default KycPage