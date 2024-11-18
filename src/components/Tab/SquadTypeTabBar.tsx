import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


interface SquadTypeTabBarITF {
  tabs: string[],
  activeTab: string,
  onChange?: (e: any) => void;
}

const SquadTypeTabBar = ({ tabs, activeTab }: SquadTypeTabBarITF) => {
  const [active, setActive] = useState<string>(activeTab)

  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (val: string | any) => {
    setActive(val);
    const searchParams = new URLSearchParams(location.search); // Get current search params
    searchParams.set("squadType", val); // Set new or update existing param
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }
  return (
    <div className='flex items-center gap-3'>
      {
        tabs.map((items: string) => <Tab active={active} label={items} onClick={() => handleTabChange(items)} />)
      }
    </div>
  )
}

const Tab = ({ active, label, onClick }: { active: string, label: string, onClick: (param: any) => void }) => {

  return (
    <button onClick={() => onClick(label)} className={`${active === label ? "text-xs min-w-[84px] text-primary border-[0.2px] border-primary rounded-lg flex items-center justify-center gap-2 font-semibold lg:text-sm shadow-sm py-2 px-2 lg:px-3 capitalize" : "min-w-[84px] text-xs lg:text-sm flex rounded-b-sm text-gray-500 font-semibold items-center justify-center px-2 lg:px-3 capitalize"}`}>
      <span>{label} Squad</span>
      <span className={`h-5 w-5 rounded-full p-1 text-white flex items-center justify-center ${active === label ? "bg-primary" : ""}`}>8</span>
    </button>
  )
}

export default SquadTypeTabBar