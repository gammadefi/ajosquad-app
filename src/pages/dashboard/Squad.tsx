import React from 'react'
import { useLocation } from 'react-router-dom';
import SquadTabBar from '../../components/Tab/SquadTabBar';
import SquadTypeTabBar from '../../components/Tab/SquadTypeTabBar';
import SquadCard from '../../components/Squad/SquadCard';

const Squad = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("activeTab") || "upcoming";
  const squadType = searchParams.get("squadType") || "brass";

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
        <SquadTypeTabBar
          tabs={[
            "brass",
            "bronze",
            "silver",
            "gold"
          ]}
          activeTab={squadType}
        />
      </div>
      <div className='mt-10 grid lg:grid-cols-3 gap-4 lg:gap-8'>
        <SquadCard
          payoutAmount='5,000.00'
          date={new Date("2024-12-05T13:30:00")}
          title='Brass 12.0'
          squadDuration={5}
          numOfMaxMembers={10}
        />
        <SquadCard
          payoutAmount='5,000.00'
          date={new Date("2024-12-05T13:30:00")}
          title='Brass 12.0'
          squadDuration={5}
          numOfMaxMembers={10}
        />
        <SquadCard
          payoutAmount='5,000.00'
          date={new Date("2024-12-05T13:30:00")}
          title='Brass 12.0'
          squadDuration={5}
          numOfMaxMembers={10}
        />
        <SquadCard
          payoutAmount='5,000.00'
          date={new Date("2024-12-05T13:30:00")}
          title='Brass 12.0'
          squadDuration={5}
          numOfMaxMembers={10}
        />
        <SquadCard
          payoutAmount='5,000.00'
          date={new Date("2024-12-05T13:30:00")}
          title='Brass 12.0'
          squadDuration={5}
          numOfMaxMembers={10}
        />
        <SquadCard
          payoutAmount='5,000.00'
          date={new Date("2024-12-05T13:30:00")}
          title='Brass 12.0'
          squadDuration={5}
          numOfMaxMembers={10}
        />
        <SquadCard
          payoutAmount='5,000.00'
          date={new Date("2024-12-05T13:30:00")}
          title='Brass 12.0'
          squadDuration={5}
          numOfMaxMembers={10}
        />
        <SquadCard
          payoutAmount='5,000.00'
          date={new Date("2024-12-05T13:30:00")}
          title='Brass 12.0'
          squadDuration={5}
          numOfMaxMembers={10}
        />
        <SquadCard
          payoutAmount='5,000.00'
          date={new Date("2024-12-05T13:30:00")}
          title='Brass 12.0'
          squadDuration={5}
          numOfMaxMembers={10}
        />
      </div>
    </div>
  )
}

export default Squad
