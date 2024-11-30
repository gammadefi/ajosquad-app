import { useLocation, useNavigate } from 'react-router-dom';

interface TabBar2ITF {
  tabs: string[],
  activeTab: string
}

const TabBar2 = ({ tabs, activeTab }: TabBar2ITF) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (val: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("activeTab", val);
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }
  return (
    <div className='overflow-x-scroll flex items-center gap-3 border-b-2 pb-2 border-[#E4E7EC]'>
      {
        tabs.map((items: string) => <Tab activeTab={activeTab} label={items} onClick={() => handleTabChange(items)} />)
      }
    </div>
  )
}

const Tab = ({ activeTab, label, onClick }: { activeTab: string, label: string, onClick: (param: string) => void }) => {

  return (
    <button onClick={() => onClick(label)} className={`relative text-nowrap flex items-center justify-center capitalize text-xs w-full lg:w-fit lg:text-sm pb-1 px-2 lg:px-3 ${activeTab === label ? "text-primary shadow-sm" : "text-gray-500"}`}>
      {label}
      <span className={`absolute ${activeTab === label && "bg-blue-500 h-[2px] -bottom-2 w-full"}`}></span>
    </button>
  )
}

export default TabBar2;