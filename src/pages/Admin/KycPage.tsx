import React from 'react'
import { mockData } from '../../samples/mockdata';
import { Table, TableEmpty } from '../../components/Table/Table';
import SearchInput from '../../components/FormInputs/SearchInput';
import { InfoCard } from '../../components/InfoCard/InfoCard2';
import { Label } from '../../components/Label/Label';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import useFetchWithParams from '../../hooks/useFetchWithParams';
import { useAuth } from '../../zustand/auth.store';
import { userServices } from '../../services/user';
import PageLoader from '../../components/spinner/PageLoader';
import clsx from 'clsx';
import { fDate } from '../../utils/formatTime';
import { useQuery } from 'react-query';

const KycPage = () => {
    const navigate = useNavigate()
    const profile = useAuth(state => state.profile)
    const [search, setSearch] = React.useState('')
    const [currentPage, setCurrentPage] = React.useState(1)
    const {data: count, isLoading, error} = useQuery(['admin-user-count'], userServices.user.countAll);
    const { data: users, isLoading: isLoadingUsers } = useFetchWithParams([`get-all-users+${profile.id}`, {
        page: currentPage,
        search
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
            view: (row: any) => <span className={clsx("px-2 py-1 rounded-md whitespace-nowrap", row?.kycVerificationStatus === "verified" ? "bg-[#E7F6EC] text-[#036B26]" : "bg-[#FBEAE9] text-[#9E0A05]")} >{row?.kycVerificationStatus === "verified" ? "Verified" : "Not Verified" }</span>,
        },
    ];
    console.log(count)
    return (
        <div className='px-3  md:px-6'>
            {/* <button onClick={() => navigate(-1)} className='text-sm font-medium text-black flex items-center gap-1'><IoIosArrowRoundBack size={24} /> Back</button> */}
            <div className='flex justify-between flex-wrap items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>KYC Management</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        View and keep track of both verified and non-verified members in a single dashboard.
                    </p>
                </div>




            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-4'>
                <InfoCard isLoading={isLoading} header="Total Member" iconName='profile-2user' value={count && count.data.totalUsers}/>
                <InfoCard isLoading={isLoading} header="Verified Member" iconName='profile-2user' value={count && count.data.verifiedUsers}/>
                <InfoCard isLoading={isLoading} header="Non-verified member" iconName='profile-2user' value={count && (count.data.totalUsers - count.data.verifiedUsers)} />


                {/* <InfoCard header="Cash Rewards" iconName='moneys-credit' value="CAD$ 500,000.00" /> */}

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