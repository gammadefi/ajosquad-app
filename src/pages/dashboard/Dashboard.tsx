import React, { useState } from 'react'
import { LiaFileContractSolid } from "react-icons/lia";
import { useAuth } from '../../zustand/auth.store'
import clsx from 'clsx'
import People from '../../icons/reusables/people';
import TodayDate from '../../components/common/TodayDate';
import { InfoCard } from '../../components/InfoCard/InfoCard';
import { GraphWrapper } from '../../components/Graph/GraphWrapper';
import LineChart from '../../components/Graph/Graphs/LineChart';
import { TableEmpty } from '../../components/Table/Table';
import { Table } from '../../components/Table/TableTwo';
import { Label } from '../../components/Label/Label';
import SearchInput from '../../components/FormInputs/SearchInput';
import useFetchWithParams from '../../hooks/useFetchWithParams';
import { useLocation } from 'react-router-dom';
import { squadServices } from '../../services/squad';
import TabBar2 from '../../components/Tab/TabBar2';
import { BsChevronDown } from 'react-icons/bs';
import SquadCard from '../../components/Squad/SquadCard';
import dayjs from 'dayjs';
import { PayoutService } from '../../services/payout';
import { PaymentService } from '../../services/payment';
import Filter from '../../components/Filter/Filter';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { statisticsServices } from '../../services/statistics';
import { useSearchParamsToObject } from '../../hooks/useSearchParamsToObject';
import PageLoader from '../../components/spinner/PageLoader';
import { contractAgreementServices } from '../../services/contract-agreement';
import { FaRegCalendarAlt } from "react-icons/fa";
import { fDate, formatDate2, formatStartDate } from '../../utils/formatTime';
import { generateSerialNumber, jsonToCSV } from '../../utils/helpers';

const fetchDashboardGraphData = async () => {
  const res = await statisticsServices.getUserStatDashboard();
  return res;
}

const Dashboard = () => {
  const kycVerified: boolean = useAuth(s => s.profile.userAgreedAjosquad);
  const [activeSquad, setActiveSquad] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [showBrassSquad, setShowBrassSquad] = useState(false);
  const [showBronzeSquad, setShowBronzeSquad] = useState(false);
  const [showSilverSquad, setShowSilverSquad] = useState(false);
  const [showGoldSquad, setShowGoldSquad] = useState(false);
  const [lastMonths, setLastMonths] = useState("All Time");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [lastMonthsPayment, setLastMonthsPayment] = useState("All Time");

  console.log(kycVerified);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParamsObject = useSearchParamsToObject();
  const activeTab = searchParams.get("activeTab") || "upcoming";
  const profile = useAuth((s) => s.profile);

  const { data: graphData, isLoading: isLoadingGraphData } = useQuery(['userDashBoardData'], fetchDashboardGraphData);

  const { data: squads, isLoading, refetch } = useFetchWithParams(
    ["query-all-squads", {
      status: activeTab == "pending" ? "upcoming" : activeTab.toLowerCase()
    }],
    squadServices.getAllSquads,
    {
      onSuccess: (data: any) => {
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )

  const { data: payoutsTotal, isLoading: isLoadingCount, refetch: refetchCount } = useFetchWithParams(
    [`query-all-total-payouts-${profile.id}`, {
      months: lastMonths === "All Time" ? "" : lastMonths === "Last Month" ? "1" : "2"
    }],
    PayoutService.getTotalPayout,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )

  const { data: payouts, isLoading: isPayoutLoading, error } = useFetchWithParams(
    [`query-all-payouts-${profile.id}`, {
      ...searchParamsObject,
      page: currentPage,
      payoutType: "AjosquadPayout"
    }],
    PayoutService.getPayouts,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )

  const { data: paymentsTotal, isLoading: isLoadingCount2, refetch: refetchCount2 } = useFetchWithParams(
    [`query-all-total-payments-${profile.id}`, {
      months: lastMonthsPayment === "All Time" ? "" : lastMonthsPayment === "Last Month" ? "1" : "2"
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

  const { data: transactionData, isLoading: isTransactionLoading } = useFetchWithParams(
    [`query-all-transactions-${profile.id}`, {
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

  const columns = [
    {
      header: "S/N",
      view: (row: any, index: number) => <div className="pc-text-blue">{generateSerialNumber(index, {
        pageSize: 10,
        currentPage
      })}</div>
    },
    {
      header: "Description",
      view: (row: any) => <div>{row.description}</div>,
    },
    {
      header: "Amount",
      view: (row: any) => <div>{row.amount}</div>,
    },
    {
      header: "Date",
      view: (row: any) => <div>{formatDate2(row.createdAt)	}</div>,
    },
    {
      header: "Status",
      view: (row: any) => <Label variant="success" >{row?.status}</Label>,
    },
  ];

  const [selectedRange, setSelectedRange] = useState("1Y");

  function hasUser(squadData: any, userId: string): boolean {
    return squadData.squadMembers.some((member: any) => member.userId === userId);
  }

  console.log(transactionData);

  const handleDownload = () => {
    if (transactionData && transactionData.data) {
        jsonToCSV(transactionData.data, 'transactions.csv');
    }
  };

  return (
    <div>
      {
        (kycVerified === false || activeSquad === false) ? (
          <div>
            <Verification kycVerified={kycVerified} activeSquad={activeSquad} />
          </div>
        ) :

          <div className='px-3 md:px-6'>
            <div className='flex justify-between items-center'>

              <div >
                {
                  payouts && payouts.data.length > 0 &&
                  <>
                    <h1 className="font-medium text-lg mb-2">Upcoming Payout</h1>
                    <div className='flex gap-3 items-center'>
                      {
                        payouts.data
                          .filter((payout: any) => payout.status === 'upcoming' && new Date(payout.payoutDate) >= new Date())
                          .slice(0, 2)
                          .map((payout: any) => <UpcomingPayout payout={payout} key={payout.id} />)
                      }
                    </div>


                  </>
                }

              </div>
              <div className="hidden md:block">
                <TodayDate />

              </div>

            </div>

            <div className='grid my-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <InfoCard onfilterChange={(e) => setLastMonthsPayment(e)} iconName='moneys-credit' value={`CA$ ${paymentsTotal?.total.toLocaleString() ?? "0"}`} header='Total deposit' />
              <InfoCard onfilterChange={(e) => setLastMonths(e)} iconName='moneys-debit' value={`CA$ ${payoutsTotal?.data.toLocaleString() ?? "0"}`} header='Total Withdrwal' />
              <InfoCard type='squad' iconName='people' value='2' header='Squad' />

            </div>

            <div className='lg:h-[630px] grid my-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              <div className='col-span-3'>
                {
                  isLoadingGraphData ? <>Loading</> :
                    (
                      graphData &&
                      <GraphWrapper graphTitle="Overall Sale">
                        <div className='flex mb-4 justify-between items-center gap-3'>
                          <div>
                            <h3 className='text-sm md:text-base text-[#525866]'>All Transaction</h3>
                            <h1 className='text-lg md:text-2xl font-semibold'>CA$ 0.00</h1>
                          </div>
                          <div className="flex bg-[#F7F7F8] py-2 px-2 space-x-4 ">
                            {["7d", "6M", "1Y", "Max"].map((range) => (
                              <button
                                key={range}
                                className={`px-4 py-2 bg-white rounded-lg ${selectedRange === range
                                  ? "border-blue-600 border text-gray-800"
                                  : " text-gray-800"
                                  }`}
                                onClick={() => setSelectedRange(range)}
                              >
                                {range}
                              </button>
                            ))}
                          </div>

                        </div>
                        <LineChart
                          type='line'
                          colors={["#0E8837", "#D42620",]}
                          xAxisLabel={graphData?.[selectedRange].xAxisLabel}
                          seriesData={graphData?.[selectedRange].seriesData}
                        />
                      </GraphWrapper>
                    )
                }
              </div>
              <div className='h-full overflow-y-scroll col-span-3 w-full md:col-span-3 lg:col-span-2 border-[0.4px] rounded-[10px] shadow'>
                <div className='space-y-3'>
                  <h3 className='border-b py-3 px-5 text-lg font-semibold'>Squad</h3>
                  <div className='px-3 py-2 sticky top-0 bg-white'>
                    <TabBar2
                      tabs={[
                        "Upcoming",
                        "Active",
                        "Completed",
                        "Pending"
                      ]}
                      isDashboard={true}
                      activeTab={activeTab}
                    />
                  </div>
                  {
                    isLoading &&
                    <div className='mt-10 flex justify-center'>
                      <img src="./logo.png" alt="" className='h-20 w-20' />
                    </div>
                  }
                  <div className='px-3'>
                    {
                      squads &&
                      <div className='space-y-2 pb-5'>
                        <div className='flex flex-col gap-1.5'>
                          <div onClick={() => setShowBrassSquad(!showBrassSquad)} className={`flex justify-between items-center p-4 cursor-pointer rounded-lg border ${showBrassSquad ? "border-[#DCC841] bg-[#DCC8411A]" : "border"}`}>
                            <div className='flex gap-2 items-center'>
                              <h3 className='text-lg'>Brass Squad</h3>
                              <span className={`h-5 w-5 rounded-full p-1 text-white flex items-center justify-center ${showBrassSquad ? "bg-[#DCC31D]" : "bg-primary"}`}>{squads.data.filter((squad: any) => squad.category === 'Brass').length}</span>
                            </div>
                            <BsChevronDown size={20} className={`transition-all duration-200 ${showBrassSquad && "rotate-180"}`} />
                          </div>
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showBrassSquad ? "max-h-screen" : "max-h-0"}`}>
                            {
                              squads.data.filter((squad: any) => squad.category === 'Brass').map((squad: any) => (
                                <SquadCard
                                  key={squad.id}
                                  id={squad.id}
                                  payoutAmount={squad.amount}
                                  date={new Date(squad.createdAt)}
                                  startDate={squad.startDate}
                                  title={squad.name}
                                  refetch={refetch}
                                  category={squad.category}
                                  squadDuration={dayjs(squad.endDate).diff(squad.startDate, 'month')}
                                  numOfMaxMembers={10}
                                  selectedPositions={squad?.squadMembers?.length > 0
                                    ? squad.squadMembers.map((member: any) => member.position).flat()
                                    : []}
                                  hasJoinedSquad={
                                    hasUser(squad, profile.id)
                                  }
                                  information={squad?.squadMembers?.find((member: any) => member.userId === profile.id)}
                                  myPosition={squad?.squadMembers?.find((member: any) => member.userId === profile.id)?.position}
                                />
                              ))
                            }
                          </div>
                        </div>
                        <div className='flex flex-col gap-1.5'>
                          <div onClick={() => setShowBronzeSquad(!showBronzeSquad)} className={`flex justify-between items-center p-4 cursor-pointer rounded-lg border ${showBronzeSquad ? "border-[#DCC841] bg-[#DCC8411A]" : "border"}`}>
                            <div className='flex gap-2 items-center'>
                              <h3 className='text-lg'>Bronze Squad</h3>
                              <span className={`h-5 w-5 rounded-full p-1 text-white flex items-center justify-center ${showBronzeSquad ? "bg-[#DCC31D]" : "bg-primary"}`}>{squads.data.filter((squad: any) => squad.category === 'Brass').length}</span>
                            </div>
                            <BsChevronDown size={20} className={`transition-all duration-200 ${showBronzeSquad && "rotate-180"}`} />
                          </div>
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showBronzeSquad ? "max-h-screen" : "max-h-0"}`}>
                            {
                              squads.data.filter((squad: any) => squad.category === 'Bronze').map((squad: any) => (
                                <SquadCard
                                  key={squad.id}
                                  id={squad.id}
                                  payoutAmount={squad.amount}
                                  date={new Date(squad.createdAt)}
                                  startDate={squad.startDate}
                                  title={squad.name}
                                  refetch={refetch}
                                  category={squad.category}
                                  squadDuration={dayjs(squad.endDate).diff(squad.startDate, 'month')}
                                  numOfMaxMembers={10}
                                  selectedPositions={squad?.squadMembers?.length > 0
                                    ? squad.squadMembers.map((member: any) => member.position).flat()
                                    : []}
                                  hasJoinedSquad={
                                    hasUser(squad, profile.id)
                                  }
                                  information={squad?.squadMembers?.find((member: any) => member.userId === profile.id)}
                                  myPosition={squad?.squadMembers?.find((member: any) => member.userId === profile.id)?.position}
                                />
                              ))
                            }
                          </div>
                        </div>
                        <div className='flex flex-col gap-1.5'>
                          <div onClick={() => setShowSilverSquad(!showSilverSquad)} className={`flex justify-between items-center p-4 cursor-pointer rounded-lg border ${showSilverSquad ? "border-[#DCC841] bg-[#DCC8411A]" : "border"}`}>
                            <div className='flex gap-2 items-center'>
                              <h3 className='text-lg'>Silver Squad</h3>
                              <span className={`h-5 w-5 rounded-full p-1 text-white flex items-center justify-center ${showSilverSquad ? "bg-[#DCC31D]" : "bg-primary"}`}>{squads.data.filter((squad: any) => squad.category === 'Brass').length}</span>
                            </div>
                            <BsChevronDown size={20} className={`transition-all duration-200 ${showSilverSquad && "rotate-180"}`} />
                          </div>
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showSilverSquad ? "max-h-screen" : "max-h-0"}`}>
                            {
                              squads.data.filter((squad: any) => squad.category === 'Silver').map((squad: any) => (
                                <SquadCard
                                  key={squad.id}
                                  id={squad.id}
                                  payoutAmount={squad.amount}
                                  date={new Date(squad.createdAt)}
                                  startDate={squad.startDate}
                                  title={squad.name}
                                  refetch={refetch}
                                  category={squad.category}
                                  squadDuration={dayjs(squad.endDate).diff(squad.startDate, 'month')}
                                  numOfMaxMembers={10}
                                  selectedPositions={squad?.squadMembers?.length > 0
                                    ? squad.squadMembers.map((member: any) => member.position).flat()
                                    : []}
                                  hasJoinedSquad={
                                    hasUser(squad, profile.id)
                                  }
                                  information={squad?.squadMembers?.find((member: any) => member.userId === profile.id)}
                                  myPosition={squad?.squadMembers?.find((member: any) => member.userId === profile.id)?.position}
                                />
                              ))
                            }
                          </div>
                        </div>
                        <div className='flex flex-col gap-1.5'>
                          <div onClick={() => setShowGoldSquad(!showGoldSquad)} className={`flex justify-between items-center p-4 cursor-pointer rounded-lg border ${showGoldSquad ? "border-[#DCC841] bg-[#DCC8411A]" : "border"}`}>
                            <div className='flex gap-2 items-center'>
                              <h3 className='text-lg'>Gold Squad</h3>
                              <span className={`h-5 w-5 rounded-full p-1 text-white flex items-center justify-center ${showGoldSquad ? "bg-[#DCC31D]" : "bg-primary"}`}>{squads.data.filter((squad: any) => squad.category === 'Brass').length}</span>
                            </div>
                            <BsChevronDown size={20} className={`transition-all duration-200 ${showGoldSquad && "rotate-180"}`} />
                          </div>
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showGoldSquad ? "max-h-screen" : "max-h-0"}`}>
                            {
                              squads.data.filter((squad: any) => squad.category === 'Gold').map((squad: any) => (
                                <SquadCard
                                  key={squad.id}
                                  id={squad.id}
                                  payoutAmount={squad.amount}
                                  date={new Date(squad.createdAt)}
                                  startDate={squad.startDate}
                                  title={squad.name}
                                  refetch={refetch}
                                  category={squad.category}
                                  squadDuration={dayjs(squad.endDate).diff(squad.startDate, 'month')}
                                  numOfMaxMembers={10}
                                  selectedPositions={squad?.squadMembers?.length > 0
                                    ? squad.squadMembers.map((member: any) => member.position).flat()
                                    : []}
                                  hasJoinedSquad={
                                    hasUser(squad, profile.id)
                                  }
                                  information={squad?.squadMembers?.find((member: any) => member.userId === profile.id)}
                                  myPosition={squad?.squadMembers?.find((member: any) => member.userId === profile.id)?.position}
                                />
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>

              </div>

            </div>

            <div className='my-5'>
              <div className='my-8 flex flex-col lg:flex-row gap-3 justify-between lg:items-center'>
                <div className='flex justify-between'>
                  <h3 className='text-xl font-semibold'>Transaction History</h3>
                  <button onClick={handleDownload} className='lg:hidden text-primary px-4 py-2 border border-primary rounded-lg font-semibold'>Download</button>
                </div>
                <div className='flex items-center gap-2'>
                  <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
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
                <Filter filterBy={["amount", "date", "status"]} open={openFilter} onClose={() => setOpenFilter(false)} />
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
      }
    </div>
  )
}


const Verification = ({ kycVerified, activeSquad } = { kycVerified: false, activeSquad: false }) => {
  const profile: any = useAuth((s) => s.profile);
  const { setUserProfile } = useAuth();

  const [isAgreeing, setIsAgreeing] = useState(false);
  const [isIframeVisible, setIframeVisible] = useState(false);

  const { data: contractAgreements, error, isLoading } = useQuery('contractAgreements', async () => {
    const response = await contractAgreementServices.user.getAllContractAgreements();
    return response.data;
  });


  const handleOpenIframe = () => setIframeVisible(true);
  const handleCloseIframe = () => setIframeVisible(false);

  const handleAgreeToContractAgreement = async (contractorAgreementId: string) => {
    setIsAgreeing(true);
    try {
      const res = await contractAgreementServices.user.agreeOrRejectContractAgreement(contractorAgreementId, { option: true });
      if (res) {
        const updatedUserProfile = { ...profile, userAgreedAjosquad: true }
        setUserProfile(updatedUserProfile);
        setIframeVisible(false);
        setIsAgreeing(false);
      }
    } catch (error) {
      setIsAgreeing(false);
    }
  }

  if (isLoading) return <PageLoader />
  if (error) return <div>An error occurred while fetching contracts</div>

  return (
    <div className='px-3 py-20 md:px-12'>
      <h3 className=' text-3xl md:text-5xl font-semibold '>Hi, <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#23454F] via-[#0066FF] to-[#1EB7CF]'>{profile.firstName} {profile.lastName}</span></h3>
      <h5 className='text-base md:text-xl mt-2 text-[#656565]'>You still have a few more step to complete your profile</h5>
      <div className='mt-8'>
        <h3 className='text-2xl font-semibold'>Account set up Checklist</h3>
        <div className='flex mt-2 gap-3'>
          <div className='w-[350px] h-[214px] flex flex-col rounded-xl p-[16px] bg-[#08354C] text-white'>
            <div className='flex gap-2'>
              <div className="mt-2">
                <LiaFileContractSolid size={24} />
              </div>

              <h3 className=" text-lg font-bold md:text-2xl">Read and sign the  Ajosquad Agreement</h3>
            </div>

            <h5 className='text-xs md:text-sm mt-3'>Almost done! Read and sign our User Agreement to unlock all Ajosquad features and start exploring.</h5>

            <button onClick={handleOpenIframe} className={clsx('px-5 max-w-[205px] py-2 border border-white rounded-md mt-auto',


            )}>Read & Sign Agreement</button>

          </div>
          <div>
            {isIframeVisible && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1000,
                }}
              >
                <div className='z-[1000] absolute flex gap-6 top-5 right-10'>
                  <button
                    onClick={handleCloseIframe}
                    className='py-2 px-4 bg-white rounded-md'
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleAgreeToContractAgreement(contractAgreements.data.find((contract: any) => contract.productType === "Ajosquad").id)}
                    disabled={isAgreeing}
                    className='py-2 px-4 rounded-md disabled:cursor-not-allowed disabled:bg-primary/50 bg-primary text-white font-medium'
                  >
                    Agree
                  </button>
                </div>
                <iframe
                  src={contractAgreements.data.find((contract: any) => contract.productType === "Ajosquad").agreement_url}
                  title="Ajosquad Agreement"
                  style={{
                    width: '90%',
                    height: '90%',
                    border: 'none',
                    borderRadius: '10px',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


const UpcomingPayout = ({ payout }: { payout: any }) => {
  return (
    <div>

      <div>
        <div className="flex flex-col border rounded-lg p-3 shadow-md bg-white w-fit">
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">{payout.description.split(' ')[2]} {payout.description.split(' ')[3]}</span>
            <button className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              {formatStartDate(payout.payoutDate).replace("Starts", "")}
            </button>

          </div>
          <div className="ml-auto justify-between flex  gap-2  items-center">

            <div className="flex items-center text-gray-600">
              <FaRegCalendarAlt className="mr-1" />
              <span>{fDate(payout.payoutDate)}</span>
            </div>
            <span className="text-sm font-bold">CA$ {payout.amount}.00</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// const VerificationCards = ({ disabled = false, children }: { disabled?: boolean, children: React.ReactNode }) => {
//   return (
//     <div className={clsx('w-[350px] h-[214px] flex flex-col rounded-xl p-[16px] ',
//       disabled ? "bg-[#0000002E] text-[#1e232c44] " : "bg-[#08354C] text-white"
//     )}>
//       {children}
//     </div>
//   )
// }

export default Dashboard