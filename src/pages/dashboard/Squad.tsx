import { useLocation } from 'react-router-dom';
import SquadTabBar from '../../components/Tab/SquadTabBar';
import SquadCard from '../../components/Squad/SquadCard';
import { sqaudServices } from '../../services/squad';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import SquadCategoryTabBar from '../../components/Tab/SquadCategoryTabBar';

const fetchSquads = async () => {
  const res: AxiosResponse = await sqaudServices.getAllSquads();
  return res.data;
};

const Squad = () => {
  const { data: squads, isLoading } = useQuery(['squads'], fetchSquads);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("activeTab") || "upcoming";
  const squadCartegory = searchParams.get("squadType") || "brass";

  // useEffect(() => {
  //   const fetchData = async () => {

  //   }
  //   fetchData();
  // }, [])

  console.log(squads);

  return (
    <div className='px-3 md:px-6'>
      <SquadTabBar
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
            "brass",
            "bronze",
            "silver",
            "gold"
          ]}
          activeTab={squadCartegory}
        />
      </div>
      {isLoading && <p className='mt-10'>Loading......</p>}
      {
        squads &&
        <div className='mt-10 grid lg:grid-cols-3 gap-4 lg:gap-8'>
          {
            squads.data.map((squad: any) => (
              <SquadCard
                key={squad.id}
                id={squad.id}
                payoutAmount={squad.amount}
                date={new Date(squad.createdAt)}
                title={squad.name}
                category={squad.category}
                squadDuration={5}
                numOfMaxMembers={10}
              />
            ))
          }
        </div>
      }
    </div>
  )
}

export default Squad
