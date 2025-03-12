import { useState } from 'react'
import { InfoCard } from '../../../components/InfoCard/InfoCard2'
import SearchInput from '../../../components/FormInputs/SearchInput';
import { Table, TableEmpty } from '../../../components/Table/Table';
import { Label } from '../../../components/Label/Label';
import { useNavigate } from 'react-router-dom';
import { userServices } from '../../../services/user';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import PageLoader from '../../../components/spinner/PageLoader';
import { formatDate2 } from '../../../utils/formatTime';
import { useQuery } from 'react-query';
import { generateSerialNumber } from '../../../utils/helpers';

const Index = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const { data, isLoading } = useFetchWithParams(
        ["admin-all-users", {
            page: currentPage,
            search
        }],
        userServices.user.getAllUsers,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    const { data: data2, isLoading: isLoading2, error: error2 } = useQuery("admin-all-users", async () => {
        const response = await userServices.user.countAll()
        return response.data
    })

    console.log(data2);
    // const { data, isLoading } = useQuery("admin-all-users", async () => {
    //     const response = await userServices.user.getAllUsers({ page: currentPage })
    //     return response.data
    // })

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
            view: (row: any) => <div>{`${row.firstName} ${row.lastName}`}</div>,
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
            header: "Date Joined",
            view: (row: any) => <div>{formatDate2(row.createdAt)}</div>,
        },
        {
            header: "KYC Status",
            view: (row: any) => <div>{row.kycVerificationStatus}</div>,
        },
        // {
        //     header: "Operation Status",
        //     view: (row: any) => <Label variant="success" >{row?.operationStatus || "N/A"}</Label>,
        // },
    ];
    return (
        <div className='px-3  md:px-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-base md:text-xl font-semibold'>Manage and oversee all your users in one place</h3>
                    <p className='max-w-[648px] text-[#5A5C5E]'>
                        View and manage all Member information, interactions, and activities from a single, intuitive dashboard.
                    </p>
                </div>



            </div>
            <div className='lg:grid flex my-6 py-4 gap-3 overflow-x-auto grid-cols-5'>
                <InfoCard isLoading={isLoading} header="Total Member" iconName='people' value={error2 ? "N/A" : `${data2?.totalUsers}`} />
                <InfoCard isLoading={isLoading} header="Inactive Member" iconName='people' action={{
                    label: "View More",
                    buttonAction: () => {
                        navigate("/member-management/inactive-member")

                    }
                }} value={error2 ? "N/A" : `${data2?.unverifiedUsers}`} />
                <InfoCard isLoading={isLoading} header="AjoSquad Member" iconName='people' action={{
                    label: "View More",
                    buttonAction: () => {
                        navigate("/member-management/ajosquad-member")
                    }
                }} value={error2 ? "N/A" : `${data2?.verifiedUsers}`} />
                <InfoCard isLoading={isLoading} header="AjoHome Member" iconName='people' action={{
                    label: "View More",
                    buttonAction: () => {
                        navigate("/member-management/ajohome-member")
                    }
                }} value={error2 ? "N/A" : `0`} />
                <InfoCard isLoading={isLoading} header="AjoBusiness Member" iconName='people' action={{
                    label: "View More",
                    buttonAction: () => {
                        navigate("/member-management/ajobusiness-member")
                    }
                }} value={error2 ? "N/A" : `0`} />
                {/* <InfoCard header="Cash Rewards" iconName='moneys-credit' value="CAD$ 500,000.00" /> */}

            </div>

            <div>
                <div className='my-8 flex justify-between items-center '>
                    <h3 className='text-xl font-semibold'>All Member</h3>

                    <div className='flex items-center gap-2'>
                        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
                        <button className='bg-[#F5F5F9] border-[0.4px] border-[#C8CCD0] text-[#666666] py-2 px-3 rounded-md'>Filter</button>
                    </div>


                </div>


                {
                    isLoading ? <PageLoader /> :
                        data.users && data.users.length === 0 ? <TableEmpty title='No members yet' image='/empty-states/people.png' subtitle="You're just getting started! No members has registered yet on the platform." /> : <Table
                            data={data.users}
                            clickRowAction={(row: any) => navigate(`/member-management/member-information/${row.id}`)}
                            columns={columns}
                            loading={false}
                            pagination={
                                {
                                    page: currentPage,
                                    pageSize: 10,
                                    setPage: setCurrentPage,
                                    totalRows: data.totalUsers
                                }
                            }

                        />
                }


            </div>
        </div>
    )
}

export default Index