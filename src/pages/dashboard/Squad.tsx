import { useLocation, useNavigate } from 'react-router-dom';
import SquadCard from '../../components/Squad/SquadCard';
import { squadServices } from '../../services/squad';
import SquadCategoryTabBar from '../../components/Tab/SquadCategoryTabBar';
import dayjs from 'dayjs';
import TabBar2 from '../../components/Tab/TabBar2';
import useFetchWithParams from '../../hooks/useFetchWithParams';
import { useAuth } from '../../zustand/auth.store';
import React from 'react';
import { ProductContext } from '../../context/ProductContext';
import { TableEmpty } from '../../components/Table/Table';


const Squad = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate()
  const activeTab = searchParams.get("activeTab") || "upcoming";
  const product: any = React.useContext(ProductContext);
  const isVerified: boolean = useAuth((s) => s.verified);
  // const squadCartegory = searchParams.get("squadType") || "Brass";
  const profile = useAuth((s) => s.profile);

  const { data: squads, isLoading, refetch } = useFetchWithParams(
    ["query-all-squads", {
      status: activeTab === "pending" ? "upcoming" : activeTab.toLowerCase(),
      limit: 100
    }],
    squadServices.getAllSquads,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )

  function hasUser(squadData: any, userId: string): boolean {
    return squadData.squadMembers.some((member: any) => member.userId === userId);
  }

  return (
    <div className='px-3 md:px-6'>
      <TabBar2
        tabs={[
          "upcoming",
          "pending",
          "active",
          "completed",
        ]}
        isDashboard={false}
        activeTab={activeTab}
      />
      {/* <div className='mt-5'>
        <SquadCategoryTabBar
          tabs={[
            "Brass",
            "Bronze",
            "Silver",
            "Gold"
          ]}
          activeTab={squadCartegory}
        />
      </div> */}

      {!isVerified && (
        <div className="mt-5 p-4 bg-yellow-100 text-yellow-800 rounded-md">
          <p className="mb-3">
            You cannot join a squad until you complete your KYC and Agreement.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Complete KYC
          </button>
        </div>
      )}
      {
        isLoading &&
        <div className='mt-10 flex justify-center'>
          <img src="./logo.png" alt="" className='h-20 w-20' />
        </div>
      }
      {
        squads &&
        <div className='mt-10 grid lg:grid-cols-3 gap-4 lg:gap-8'>
          {
            squads.data.length === 0 ? (
              <div className='flex justify-center col-span-3 items-center'>
                <TableEmpty image='/empty-states/people.png' subtitle='No squads yet! Squads will be available soon' title='No squads Yet' />
              </div>
            ) : activeTab === "pending" ? (
              (() => {
                const pendingSquads = squads.data.filter((squad: any) =>
                  squad.status === "upcoming" &&
                  squad.squadMembers?.some((member: any) => member.userId === profile.id)
                );

                return pendingSquads.length === 0 ? (
                  <div className='flex justify-center col-span-3 items-center'>
                    <TableEmpty image='/empty-states/people.png' subtitle='No pending squads found' title='No Pending Squads' />
                  </div>
                ) : (
                  pendingSquads.map((squad: any, index: number) => (
                    <SquadCard
                      key={index}
                      id={squad.id}
                      payoutAmount={squad.amount}
                      date={new Date(squad.startDate)}
                      startDate={squad.startDate}
                      title={squad.name}
                      refetch={refetch}
                      category={squad.category}
                      squadDuration={dayjs(squad.endDate).diff(squad.startDate, 'month')}
                      numOfMaxMembers={10}
                      selectedPositions={squad?.squadMembers?.length > 0
                        ? squad.squadMembers.map((member: any) => member.position).flat()
                        : []}
                      hasJoinedSquad={hasUser(squad, profile.id)}
                      information={squad?.squadMembers?.find((member: any) => member.userId === profile.id)}
                      myPosition={squad?.squadMembers?.find((member: any) => member.userId === profile.id)?.position}
                    />
                  ))
                );
              })()
            ) : squads.data.map((squad: any, index: number) => (
              <SquadCard
                key={index}
                id={squad.id}
                payoutAmount={squad.amount}
                date={new Date(squad.startDate)}
                startDate={squad.startDate}
                title={squad.name}
                refetch={refetch}
                category={squad.category}
                squadDuration={dayjs(squad.endDate).diff(squad.startDate, 'month')}
                numOfMaxMembers={10}
                selectedPositions={squad?.squadMembers?.length > 0
                  ? squad.squadMembers.map((member: any) => member.position).flat()
                  : []}
                hasJoinedSquad={hasUser(squad, profile.id)}
                information={squad?.squadMembers?.find((member: any) => member.userId === profile.id)}
                myPosition={squad?.squadMembers?.find((member: any) => member.userId === profile.id)?.position}
              />
            ))
          }
        </div>
      }
    </div>
  )
}

export default Squad
