import { useLocation } from 'react-router-dom';
import SquadCard from '../../components/Squad/SquadCard';
import { squadServices } from '../../services/squad';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import SquadCategoryTabBar from '../../components/Tab/SquadCategoryTabBar';
import dayjs from 'dayjs';
import TabBar2 from '../../components/Tab/TabBar2';
import useFetchWithParams from '../../hooks/useFetchWithParams';

// const fetchSquads = async () => {
//   const res: AxiosResponse = await squadServices.getAllSquads();
//   return res.data;
// };

const Squad = () => {
  // const { data: squads, isLoading } = useQuery(['squads'], fetchSquads);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("activeTab") || "upcoming";
  const squadCartegory = searchParams.get("squadType") || "Brass";

  const { data: squads, isLoading, refetch } = useFetchWithParams(
    ["query-all-squads", {
      category: squadCartegory, status: activeTab.toLowerCase()
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




  const selectedPositions: string[] = Array.from(
    new Set(
      squads?.data?.length > 0 ?
        squads.data.flatMap((squad: any) =>
          squad.squadMembers.flatMap((member: any) => member.position)
        ) : []
    )
  );


  console.log(squads, selectedPositions);

  return (
    <div className='px-3 md:px-6'>
      <TabBar2
        tabs={[
          "upcoming",
          "active",
          "completed",
          "pending"
        ]}
        activeTab={activeTab}
      />
      <div className='mt-5'>
        <SquadCategoryTabBar
          tabs={[
            "Brass",
            "Bronze",
            "Silver",
            "Gold"
          ]}
          activeTab={squadCartegory}
        />
      </div>
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
            squads.data.map((squad: any, index: number) => (
              <SquadCard
                key={index}
                id={squad.id}
                payoutAmount={squad.amount}
                date={new Date(squad.createdAt)}
                title={squad.name}
                category={squad.category}
                squadDuration={dayjs(squad.endDate).diff(squad.startDate, 'month')}
                numOfMaxMembers={10}
                selectedPositions={squad?.squadMembers?.length > 0 
                  ? squad.squadMembers.map((member: any) => member.position).flat() 
                  : []}
              />
            ))
          }
        </div>
      }
    </div>
  )
}

export default Squad
