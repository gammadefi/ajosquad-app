import { useLocation } from 'react-router-dom';
import SquadCard from '../../components/Squad/SquadCard';
import { squadServices } from '../../services/squad';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import SquadCategoryTabBar from '../../components/Tab/SquadCategoryTabBar';
import dayjs from 'dayjs';
import TabBar2 from '../../components/Tab/TabBar2';
import useFetchWithParams from '../../hooks/useFetchWithParams';
import { useAuth } from '../../zustand/auth.store';

// const fetchSquads = async () => {
//   const res: AxiosResponse = await squadServices.getAllSquads();
//   return res.data;
// };

const Squad = () => {
  // const { data: squads, isLoading } = useQuery(['squads'], fetchSquads);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("activeTab") || "upcoming";
  // const squadCartegory = searchParams.get("squadType") || "Brass";
  const profile = useAuth((s) => s.profile);

  const { data: squads, isLoading, refetch } = useFetchWithParams(
    ["query-all-squads", {
      status: activeTab === "pending" ? "upcoming" : activeTab.toLowerCase()
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

  console.log("test")



  // console.log(squads, selectedPositions);

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
            activeTab === "pending" ? squads.data.filter((squad: any) =>
              squad.status === "upcoming" &&
              squad.squadMembers?.some((member: any) => member.userId === profile.id)
            ).map((squad: any, index: number) => {
              console.log(squad, squad?.squadMembers?.find((member: any) => member.userId === profile.id))
              return (
                <SquadCard
                  key={index}
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
              )
            }) :
              squads.data.map((squad: any, index: number) => (
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
                  hasJoinedSquad={
                    hasUser(squad, profile.id)
                  }
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
