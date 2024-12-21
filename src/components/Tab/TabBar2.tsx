import { useLocation, useNavigate } from 'react-router-dom';

interface TabBar2ITF {
  tabs: string[],
  activeTab: string,
  isDashboard: boolean
}

const TabBar2 = ({ tabs, activeTab, isDashboard }: TabBar2ITF) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (val: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("activeTab", val.toLowerCase());
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }

  if (isDashboard) {
    return (
      <div className='overflow-x-scroll flex items-center gap-3 pb-2 border-[#E4E7EC]'>
        {
          tabs.map((items: string) => <Tab2 activeTab={activeTab} label={items} onClick={() => handleTabChange(items)} />)
        }
      </div>
    )
  }

  return (
    <div className='overflow-x-scroll flex items-center gap-3 border-b-2 pb-2 border-[#E4E7EC]'>
      {
        tabs.map((items: string) => <Tab1 activeTab={activeTab} label={items} onClick={() => handleTabChange(items)} />)
      }
    </div>
  )
}

const Tab1 = ({ activeTab, label, onClick }: { activeTab: string, label: string, onClick: (param: string) => void }) => {
  return (
    <button onClick={() => onClick(label)} className={`relative text-nowrap flex items-center justify-center capitalize text-xs w-full lg:w-fit lg:text-sm pb-1 px-2 lg:px-3 ${activeTab === label ? "text-primary shadow-sm" : "text-gray-500"}`}>
      {label}
      <span className={`absolute ${activeTab === label && "bg-blue-500 h-[2px] -bottom-2 w-full"}`}></span>
    </button>
  )
}

const Tab2 = ({ activeTab, label, onClick }: { activeTab: string, label: string, onClick: (param: string) => void }) => {
  return (
    <button onClick={() => onClick(label)} className={`flex items-center justify-center gap-2 text-xs lg:text-sm font-semibold py-2 px-2 lg:px-3 capitalize md:w-36 ${activeTab === label.toLowerCase() ? "text-primary border-[0.2px] border-primary rounded-lg shadow-sm" : "text-gray-500"}`}>
      <span className='text-nowrap'>{label}</span>
      <span className={`h-5 w-5 rounded-full p-1 text-white flex items-center justify-center ${activeTab === label.toLowerCase() ? "bg-primary" : "bg-gray-400"}`}>8</span>
    </button>
  )
}

export default TabBar2;