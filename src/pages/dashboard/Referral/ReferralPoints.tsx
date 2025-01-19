import { useState } from 'react'
import { InfoCard } from '../../../components/InfoCard/InfoCard2'
import { Button } from '../../../components/Button/Button'
import { IoCopyOutline } from "react-icons/io5";
import SearchInput from '../../../components/FormInputs/SearchInput';
import { Table, TableEmpty } from '../../../components/Table/Table';
import { Label } from '../../../components/Label/Label';
import { ReferralServices } from '../../../services/referral';
import { useAuth } from '../../../zustand/auth.store';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import PageLoader from '../../../components/spinner/PageLoader';

const ReferralPoints = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const profile = useAuth(state => state.profile)
    const [currentPage, setCurrentPage] = useState(1)

    const { data: referralStats, isLoading } = useFetchWithParams([`referralStats-${profile.id}`, {

    }], ReferralServices.getReferralStats, {
        onSuccess: (data: any) => {

        },
    })

    console.log(referralStats)

    const columns = [
        {
            header: "S/N",
            view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, { pageSize: 10, currentPage })}</div>
        },
        {
            header: "Name",
            view: (row: any) => <div>{row.firstName} {row.lastName}</div>,
        },
        {
            header: "Email",
            view: (row: any) => <div>{row.email_address}</div>,
        },
        {
            header: "Point",
            view: (row: any) => <div>{row.point || "N/A"}</div>,
        },
        {
            header: "Date",
            view: (row: any) => <div>{formatDate2(row.createdAt)}</div>,
        },
        {
            header: "Status",
            view: (row: any) => <Label variant="success" >{row?.verificationStatus}</Label>,
        },
    ];

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h3 className='text-base md:text-xl font-semibold'>Share the Savings, Earn Rewards!</h3>

                <button>Redeem Point <span></span></button>



            </div>
            <div className='lg:gri flex my-6 py-4 gap-3 overflow-x-auto grid-cols-5'>
                <InfoCard isLoading={isLoading} header="Total Referrals" iconName='profile-2user' value={referralStats ? referralStats.stats.referralsCount.toLocaleString() : 0} />
                <InfoCard isLoading={isLoading} header="Approved Referrals" iconName='profile-tick' value={referralStats ? referralStats.stats.referralsCount.toLocaleString() : 0} />
                <InfoCard isLoading={isLoading} header="Points" iconName='ticket-discount' value={referralStats ? referralStats.stats.rewardsEarned.toLocaleString() : 0} />
                <InfoCard isLoading={isLoading} header="Redeemed Points" iconName='ticket-discount-1' value={referralStats ? referralStats.stats.totalRedeemedPoints.toLocaleString() : 0} />
                <InfoCard isLoading={isLoading} header="Cash Rewards" iconName='moneys-credit' value={`CAD$ ${referralStats ? referralStats.stats.rewardsEarned.toLocaleString() : 0}`} />
            </div>

            <div>
                <h3 className='text-base md:text-xl font-semibold mb-4'>Referral a Friend</h3>
                <div >
                    <h4 className='mb-1 font-semibold'>Invite Link</h4>
                    <div className='flex items-center gap-2'>
                        <input readOnly disabled name='inviteLink' className='border rounded-md h-[44px] px-3 w-[343px] text-sm' value={`${window.location.origin}/sign-up?ref=${profile.referralCode}`} />
                        <Button label='Copy Link' className='whitespace-nowrap' iconPosition='beforeText' icon={<IoCopyOutline color='white' />} />
                    </div>
                    <small>Minimum point to redeem is CAD$50</small>
                </div>

                <div className='my-8 flex flex-col md:flex-row gap-3 justify-between lg:items-center'>
                    <h3 className='text-xl font-semibold'>Referral</h3>
                    <div className='flex items-center gap-2'>
                        <SearchInput
                            placeholder='Search...'
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
                            defaultValue={searchParams.get('status') || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                const params = new URLSearchParams(window.location.search);
                                if (value) {
                                    params.set('status', value);
                                } else {
                                    params.delete('status');
                                }
                                navigate(`?${params.toString()}`);
                            }}
                            className='bg-[#F5F5F9] lg:w-full disabled:text-[#666666] h-full pl-4 py-1.5 border-[0.4px] border-[#C8CCD0] rounded md:text-lg'
                        >
                            <option value="">Filter by</option>
                            <option value="verified">Verified</option>
                            <option value="active">Active</option>
                        </select>
                    </div>
                </div>

                {
                    isLoading ? <PageLoader /> :
                        referralStats && referralStats?.referrals.length === 0 ? <TableEmpty title='No user  yet' image='/empty-states/people.png' subtitle="you are yet to refer a user" /> : <Table
                            data={referralStats.referrals}
                            columns={columns}
                            loading={false}
                            pagination={
                                {
                                    page: currentPage,
                                    setPage: (page) => setCurrentPage(page),
                                    totalRows: referralStats?.totalReferrals,
                                }
                            }

                        />
                }
            </div>
        </div>
    )
}

export default ReferralPoints