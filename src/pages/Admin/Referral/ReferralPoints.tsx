import { useState } from 'react'
import { InfoCard } from '../../../components/InfoCard/InfoCard2'
import SearchInput from '../../../components/FormInputs/SearchInput';
import { Table, TableEmpty } from '../../../components/Table/Table';
import { Label } from '../../../components/Label/Label';
import { ReferralServices } from '../../../services/referral';
import { useQuery } from 'react-query';
import { useAuth } from '../../../zustand/auth.store';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import { userServices } from '../../../services/user';
import PageLoader from '../../../components/spinner/PageLoader';
import { useSearchParamsToObject } from '../../../hooks/useSearchParamsToObject';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { generateSerialNumber } from '../../../utils/helpers';

const ReferralPoints = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchParamsObject = useSearchParamsToObject();
    const profile = useAuth(state => state.profile);

    const { data: referralStats, isLoading } = useQuery(["referralStats", profile.id], () => ReferralServices.getReferralStats(profile.id))

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
            view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, { pageSize: 10, currentPage })}</div>
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
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h3 className='text-base md:text-xl font-semibold'>Share the Savings, Earn Rewards!</h3>
            </div>
            <div className='lg:gri flex my-6 py-4 gap-3 overflow-x-auto grid-cols-5'>
                <InfoCard isLoading={isLoading} header="Total Referrals" iconName='profile-2user' value={referralStats ? referralStats.data.stats.totalReferralsCount.toLocaleString() : 0} />
                <InfoCard isLoading={isLoading} header="Approved Referrals" iconName='profile-tick' value={referralStats ? referralStats.data.stats.totalReferralsCount.toLocaleString() : 0} />
                <InfoCard isLoading={isLoading} header="Points" iconName='ticket-discount' value={referralStats ? referralStats.data.stats.totalReferralsCount.toLocaleString() : 0} />
                <InfoCard isLoading={isLoading} header="Redeemed Points" iconName='ticket-discount-1' value={referralStats ? referralStats.data.stats.totalRedeemedPoints.toLocaleString() : 0} />
                <InfoCard isLoading={isLoading} header="Cash Rewards" iconName='moneys-credit' value={`CAD$ ${referralStats ? referralStats.data.stats.totalRewardsEarned.toLocaleString() : 0}`} />
            </div>

            <div>
                <div className='my-8 flex flex-col lg:flex-row gap-3 justify-between lg:items-center'>
                    <div className='flex justify-between'>
                        <h3 className='text-xl font-semibold'>Referral</h3>
                    </div>
                    <div className='flex items-center gap-2'>
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

export default ReferralPoints