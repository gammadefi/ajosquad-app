import { useLocation, useNavigate } from 'react-router-dom';

interface SquadTypeTabBarITF {
  tabs: string[],
  activeTab: string,
  onChange?: (e: any) => void;
}

const SquadTypeTabBar = ({ tabs, activeTab }: SquadTypeTabBarITF) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (val: string) => {
    const searchParams = new URLSearchParams(location.search); // Get current search params
    searchParams.set("squadType", val); // Set new or update existing param
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }
  return (
    <div className='overflow-x-scroll'>
      <div className='w-fit md:w-full flex items-center gap-3'>
        {
          tabs.map((items: string) => <Tab activeTab={activeTab} label={items} onClick={() => handleTabChange(items)} />)
        }
      </div>
    </div>
  )
}

const Tab = ({ activeTab, label, onClick }: { activeTab: string, label: string, onClick: (param: string) => void }) => {
  return (
    <button onClick={() => onClick(label)} className={`flex items-center justify-center gap-2 text-xs lg:text-sm font-semibold py-2 px-2 lg:px-3 capitalize md:w-36 ${activeTab === label ? "text-primary border-[0.2px] border-primary rounded-lg shadow-sm" : "text-gray-500"}`}>
      <span className='text-nowrap'>{label} Squad</span>
      <span className={`h-5 w-5 rounded-full p-1 text-white flex items-center justify-center ${activeTab === label ? "bg-primary" : "bg-gray-400"}`}>8</span>
    </button>
  )
}

export default SquadTypeTabBar