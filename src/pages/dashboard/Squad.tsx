import { useLocation } from 'react-router-dom';
import SquadTabBar from '../../components/Tab/SquadTabBar';
import SquadCard from '../../components/Squad/SquadCard';
import { squadServices } from '../../services/squad';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import SquadCategoryTabBar from '../../components/Tab/SquadCategoryTabBar';
import dayjs from 'dayjs';

const fetchSquads = async () => {
  const res: AxiosResponse = await squadServices.getAllSquads();
  return res.data;
};

const Squad = () => {
  const { data: squads, isLoading } = useQuery(['squads'], fetchSquads);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("activeTab") || "upcoming";
  const squadCartegory = searchParams.get("squadType") || "brass";

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
            squads.data.map((squad: any) => (
              <SquadCard
                key={squad.id}
                id={squad.id}
                payoutAmount={squad.amount}
                date={new Date(squad.createdAt)}
                title={squad.name}
                category={squad.category}
                squadDuration={dayjs(squad.endDate).diff(squad.startDate, 'month')}
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
