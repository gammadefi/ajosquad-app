import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


interface SquadTabBarITF {
  tabs: string[],
  activeTab: string,
  onChange?: (e: any) => void;
}

const SquadTabBar = ({ tabs, activeTab }: SquadTabBarITF) => {
  const [active, setActive] = useState<string>(activeTab)

  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (val: string | any) => {
    setActive(val);
    const searchParams = new URLSearchParams(location.search); // Get current search params
    searchParams.set("activeTab", val); // Set new or update existing param
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }
  return (
    <div className='flex items-center gap-3 border-b-2 pb-2 border-[#E4E7EC]'>
      {
        tabs.map((items: string) => <Tab active={active} label={items} onClick={() => handleTabChange(items)} />)
      }
    </div>
  )
}

const Tab = ({ active, label, onClick }: { active: string, label: string, onClick: (param: any) => void }) => {

  return (
    <button onClick={() => onClick(label)} className={`relative ${active === label ? "h-[30px] text-xs min-w-[84px] text-primary flex items-center justify-center font-semibold lg:text-sm shadow-sm px-2 lg:px-3 capitalize" : "h-[30px] min-w-[84px] text-xs lg:text-sm flex rounded-b-sm text-gray-500 font-semibold items-center justify-center px-2 lg:px-3 capitalize"}`}>
      {label}
      <span className={`absolute ${active === label && "bg-blue-500 h-[2px] -bottom-[10px] w-full"}`}></span>
    </button>
  )
}

export default SquadTabBar