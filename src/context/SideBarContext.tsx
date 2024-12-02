import React, { useState, useMemo, ReactNode, useEffect } from 'react'
import { useAuth } from '../zustand/auth.store';

// create context
export const SideBarContext = React.createContext<valueItf | null>(null)


interface valueItf {
    isSideBarOpen: boolean;
    toggleSideBar: () => void;
    closeSideBar: () => void;
}
interface SideBarITF {
    children:ReactNode
}


export const SideBarProvider = ({ children } : SideBarITF) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  function toggleSideBar() {
    setIsSideBarOpen(!isSideBarOpen)
  }

  function closeSideBar() {
    setIsSideBarOpen(false)
  }

  const value = useMemo(
    () => ({
      isSideBarOpen,
      toggleSideBar,
      closeSideBar,
    }),
    [isSideBarOpen]
  )


  return <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
}