import React, { useState } from 'react'
import { InfoCard } from '../../../components/InfoCard/InfoCard2'
import TextInput from '../../../components/FormInputs/TextInput2'
import { Button } from '../../../components/Button/Button'
import { IoCopyOutline } from "react-icons/io5";
import SearchInput from '../../../components/FormInputs/SearchInput';
import { mockData } from '../../../samples/mockdata';
import { Table, TableEmpty } from '../../../components/Table/Table';
import { Label } from '../../../components/Label/Label';
import Filter from '../../../components/Filter/Filter2';
import { ReferralServices } from '../../../services/referral';
import { useQuery } from 'react-query';
import { useAuth } from '../../../zustand/auth.store';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import { userServices } from '../../../services/user';
import PageLoader from '../../../components/spinner/PageLoader';

const ReferralPoints = () => {
    const [filterBy, setFilterBy] = useState("");
    const profile = useAuth(state => state.profile)
    const [currentPage, setCurrentPage] = useState(1)

    const {data: referralStats, isLoading} = useQuery(["referralStats", profile.id ], () => ReferralServices.getReferralStats(profile.id))

    const {data: users, isLoading: isLoadingUsers} = useFetchWithParams([`get-all-users+${profile.id}`, {
        page: currentPage
    } ], userServices.user.getAllUsers, {
        onSuccess: (data:any) => {
            
        },
        
    })

    const columns = [
        {
            header: "S/N",
            view: (row: any) => <div className="pc-text-blue">{row.serialNumber}</div>
        },
        {
            header: "Member Name",
            view: (row: any) => <div>{row.firstName} {row.lastName}</div>,
        },
        {
            header: "Member Id",
            view: (row: any) => <div>{row.id}</div>,
        },
        {
            header: "Total Referral",
            view: (row: any) => <div>{row.referralsCount}</div>,
        },
        {
            header: "Earned Point",
            view: (row: any) => <div>{row.rewardsEarned}</div>,
        },
        {
            header: "Redeemed Point",
            view: (row: any) => <div>{row.totalRedeemedPoints}</div>,
        },
        {
            header: "Rewards Earned",
            view: (row: any) => <Label variant="success" >CAD$ {row?.rewardsEarned.toLocaleString()}</Label>,
        },
    ];

    console.log(referralStats,users )
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h3 className='text-base md:text-xl font-semibold'>Share the Savings, Earn Rewards!</h3>

                



            </div>
            <div className='lg:gri flex my-6 py-4 gap-3 overflow-x-auto grid-cols-5'>
                <InfoCard isLoading={isLoading} header="Total Referrals" iconName='profile-2user' value={referralStats ? referralStats.data.stats.totalReferralsCount.toLocaleString() : 0}/>
                <InfoCard isLoading={isLoading} header="Approved Referrals" iconName='profile-tick' value={referralStats ? referralStats.data.stats.totalReferralsCount.toLocaleString() : 0} />
                <InfoCard isLoading={isLoading} header="Points" iconName='ticket-discount' value={referralStats ? referralStats.data.stats.totalReferralsCount.toLocaleString() : 0} />
                <InfoCard isLoading={isLoading} header="Redeemed Points" iconName='ticket-discount-1' value={referralStats ? referralStats.data.stats.totalRedeemedPoints.toLocaleString() : 0} />
                <InfoCard isLoading={isLoading} header="Cash Rewards" iconName='moneys-credit' value={`CAD$ ${referralStats ? referralStats.data.stats.totalRewardsEarned.toLocaleString() : 0}`} />

            </div>

            <div>
                <h3 className='text-base md:text-xl font-semibold mb-4'>Referral a Friend</h3>
                <div >
                    <h4 className='mb-1 font-semibold'>Invite Link</h4>
                    <div className='flex items-center gap-2'>
                        <input readOnly disabled name='inviteLink' className='border rounded-md h-[44px] px-3 w-[343px] text-sm' value={"ajosquad.com/favidesign62g"} />
                        <Button label='Copy Link' className='whitespace-nowrap' iconPosition='beforeText' icon={<IoCopyOutline color='white' />} />
                    </div>
                    <small>Minimum point to redeem is CAD$50</small>
                </div>

                <div className='my-8 flex flex-col lg:flex-row gap-3 justify-between lg:items-center'>
                    <div className='flex justify-between'>
                        <h3 className='text-xl font-semibold'>Referral</h3>
                        {/* <button className='lg:hidden text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Redeem Points</button> */}
                    </div>
                    <div className='flex items-center gap-2'>
                        <SearchInput placeholder='Search...' />
                        {/* <Filter />
                        <button className='hidden lg:block text-primary px-4 py-2 border text-nowrap border-primary rounded-lg font-semibold'>Redeem Points</button> */}
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
                                page:currentPage,
                                setPage:(page) => setCurrentPage(page),
                                totalRows: users?.totalUsers,
                               }
                            }

                        />
                }


            </div>
        </div>
    )
}

export default ReferralPoints