import React, { useState } from 'react'


interface TabBarITF {
    tabs:string[],
    onChange?: (e: any) => void;
}

const TabBar = ({tabs, onChange = () => {}} : TabBarITF) => {
    const [active,setActive] = useState<string>(tabs[0])

    const handleTabChange = (val:string | any) => {
        setActive(val)
        onChange(val)
    }
  return (
    <div className='flex items-center gap-4 overflow-x-auto border-b-2 pb-2 border-[#E4E7EC]'>
        {
            tabs.map((items:string) =>  <Tab active={active} label={items} onClick={() => handleTabChange(items)} />)
        }
       
    </div>
  )
}

const Tab = ({ active, label, onClick }: { active: string, label: string, onClick: (param:any) => void }) => {

    return (
      <button onClick={() => onClick(label)} className={`flex items-center whitespace-nowrap justify-center capitalize text-xs w-auto  lg:text-sm pb-1 px-2 lg:px-3 relative ${active === label ? "text-primary font-bold" : "text-gray-500"}`}>
        {label}
        <span className={`absolute ${active === label && "bg-blue-500 h-[2px] -bottom-[10px] w-full"}`}></span>
      </button>
    )
  }

export default TabBar