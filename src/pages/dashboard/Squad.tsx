import React from 'react'
import { useLocation } from 'react-router-dom';
import SquadTabBar from '../../components/Tab/SquadTabBar';
import SquadTypeTabBar from '../../components/Tab/SquadTypeTabBar';

const Squad = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("activeTab") || "upcoming";
  const squadType = searchParams.get("squadType") || "brass";

  return (
    <div className='px-3 md:px-6 space-y-5'>
      <SquadTabBar
        tabs={[
          "upcoming",
          "active",
          "completed",
          "pending"
        ]}
        activeTab={activeTab}
      />
      
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
  )
}

export default Squad
