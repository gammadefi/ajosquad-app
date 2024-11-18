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
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("activeTab", val);
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
    <button onClick={() => onClick(label)} className={`flex items-center justify-center capitalize text-xs w-full md:w-32 lg:text-sm pb-1 px-2 lg:px-3 relative ${active === label ? "text-primary shadow-sm" : "text-gray-500"}`}>
      {label}
      <span className={`absolute ${active === label && "bg-blue-500 h-[2px] -bottom-[10px] w-full"}`}></span>
    </button>
  )
}

export default SquadTabBar