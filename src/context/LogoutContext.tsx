import React, { useState, useMemo, ReactNode, useEffect } from 'react'
import { useAuth } from '../zustand/auth.store';

// create context
export const LogoutContext = React.createContext<valueItf | null>(null)


interface valueItf {
    isLogoutOpen: boolean;
    toggleLogout: () => void;
    closeLogout: () => void;
}
interface LogoutITF {
    children:ReactNode
}

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

export const LogoutProvider = ({ children } : LogoutITF) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)

  function toggleLogout() {
    setIsLogoutOpen(!isLogoutOpen)
  }

  function closeLogout() {
    setIsLogoutOpen(false)
  }

  const value = useMemo(
    () => ({
      isLogoutOpen,
      toggleLogout,
      closeLogout,
    }),
    [isLogoutOpen]
  )

  let timer : any;

useEffect(() => {
  Object.values(events).forEach((item) => {
    window.addEventListener(item, () => {
      resetTimer();
      handleTimer();
    });
  });
}, []);

const resetTimer = () => {
  if (timer) clearTimeout(timer);
};

// logout after 5min of idleness 5 * 60 * 1000 = 300000
const handleTimer = () => {
  timer = setTimeout(() => {
    resetTimer();
    Object.values(events).forEach((item) => {
      window.removeEventListener(item, resetTimer);
    });
    logoutAction();
  }, 3000000);
};

const logoutAction = () => {
  useAuth.getState().logout();
};

  return <LogoutContext.Provider value={value}>{children}</LogoutContext.Provider>
}