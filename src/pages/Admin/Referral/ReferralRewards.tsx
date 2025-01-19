import { useState } from 'react'
import { InfoCard } from '../../../components/InfoCard/InfoCard2'
import SearchInput from '../../../components/FormInputs/SearchInput';
import { Table, TableEmpty } from '../../../components/Table/Table';
import { Label } from '../../../components/Label/Label';
import { ReferralServices } from '../../../services/referral';
import { useQuery } from 'react-query';
import { useAuth } from '../../../zustand/auth.store';
import useFetchWithParams from '../../../hooks/useFetchWithParams';
import PageLoader from '../../../components/spinner/PageLoader';
import { useSearchParamsToObject } from '../../../hooks/useSearchParamsToObject';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { generateSerialNumber } from '../../../utils/helpers';
import { formatDate2 } from '../../../utils/formatTime';
import { statisticsServices } from '../../../services/statistics';

const ReferralRewards = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParamsObject = useSearchParamsToObject();
  const profile = useAuth(state => state.profile);

  const { data: referralStats, isLoading } = useQuery(["referralStats", profile.id], () => ReferralServices.getReferralStats(profile.id))

  const { data: referralsTransaction, isLoading: isLoadingReferralsTransaction } = useFetchWithParams(["get-all-referrals-transactions", {
    page: currentPage,
    type: "ReferralRewards",
    ...searchParamsObject
  }], statisticsServices.getTransactions, {
    onSuccess: (data: any) => {
    },
  });

  console.log(referralStats)

  // {
  //   success: true,
  //   message: 'Referral stats fetched successfully',
  //   data: {
  //     totalReferrals: 2,
  //     pages: 1,
  //     currentPage: 1,
  //     referrals: [
  //       {
  //         id: '678913bede3ebec89b2c8eed',
  //         firstName: 'Huncho',
  //         lastName: 'Smith',
  //         email_address: 'hunchosmith4@gmail.com',
  //         referredById: '67018b05b136f21294954277',
  //         createdAt: '2025-01-16T14:12:14.458Z'
  //       },
  //       {
  //         id: '6788e623e3d671d2deb19c5d',
  //         firstName: 'John',
  //         lastName: 'Abugu',
  //         email_address: 'henrysidny@gmail.com',
  //         referredById: '672b6363647798dd645a7fc4',
  //         createdAt: '2025-01-16T10:57:39.240Z'
  //       }
  //     ],
  //     stats: {
  //       totalRewardsEarned: 20,
  //       totalRedeemedPoints: 0,
  //       totalReferralsCount: 2
  //     }
  //   }
  // }

  const columns = [
    {
      header: "S/N",
      view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, { pageSize: 10, currentPage })}</div>
    },
    {
      header: "Member ID",
      view: (row: any) => <div>{row.id}</div>,
    },
    {
      header: "Member Name",
      view: (row: any) => <div>{row.firstName} {row.lastName}</div>,
    },
    {
      header: "Pointed Claimed",
      view: (row: any) => <div>{row.rewardsEarned}</div>,
    },
    {
      header: "Amount",
      view: (row: any) => <div>{row.rewardsEarned}</div>,
    },
    {
      header: "Date",
      view: (row: any) => <div>{formatDate2(row.createdAt)}</div>,
    },
    {
      header: "Status",
      view: (row: any) => <Label variant="success" >CAD$ {row?.rewardsEarned.toLocaleString()}</Label>,
    },
  ];
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h3 className='text-base md:text-xl font-semibold'>Share the Savings, Earn Rewards!</h3>
      </div>
      <div className='lg:gri flex my-6 py-4 gap-3 overflow-x-auto grid-cols-5'>
        <InfoCard isLoading={isLoading} header="Total Referral Withdrawal" iconName='moneys-debit' value={`CAD$ ${referralStats ? referralStats.data.stats.totalRedeemedPoints.toLocaleString() : 0}`} />
      </div>
      <div>
        <div className='my-8 flex flex-col lg:flex-row gap-3 justify-between lg:items-center'>
          <div className='flex justify-between'>
            <h3 className='text-xl font-semibold'>Referral Transaction</h3>
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
              <option value="">Filter by Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>

        {
          isLoadingReferralsTransaction ? <PageLoader /> :
            referralsTransaction && referralsTransaction?.data.length === 0 ? <TableEmpty title='No Transactions Yet' image='/empty-states/people.png' subtitle="No referral transactions yet" /> : <Table
              data={referralsTransaction.data}
              columns={columns}
              loading={false}
              pagination={
                {
                  page: currentPage,
                  setPage: (page) => setCurrentPage(page),
                  totalRows: referralsTransaction.totalPages,
                }
              }

            />
        }


      </div>
    </div>
  )
}

export default ReferralRewards