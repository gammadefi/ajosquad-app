import React, { useContext, useState } from "react";
import NotificationIcon from "../../components/common/NotificationIcon";
import NotificationSidebar from "../../components/common/NotificationSidebar";
import SearchInput from "../../components/FormInputs/SearchInput";
import { Link, useLocation, useNavigation } from "react-router-dom";
import { useAuth } from "../../zustand/auth.store";
import { SideBarContext } from "../../context/SideBarContext";
import { RxHamburgerMenu } from "react-icons/rx";
import clsx from "clsx";


const _extractInitials = (val: string) => {
  const _first = val.split(" ")[0].slice(0, 1);
  const _second = val?.split(" ")[1]?.slice(0, 1);
  return `${_first.toLocaleUpperCase()}${_second && _second.toLocaleUpperCase()}`;
};

const DashboardHeader = ({ title = "" }: { title?: any }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profile: any = useAuth((s) => s.profile);
  const role = useAuth((s) => s.role)
  const sideBar = useContext(SideBarContext)
  const { pathname } = useLocation()



  const _openNav = () => {
    setIsNotificationOpen(true);
  };
  return (
    <header className={clsx(pathname === "/personal-information" ? "h-20 w-full bg-white  fixed top-0 z-50 overflow-hidden" : "h-20 w-full sticky top-0 z-50 overflow-hidden")}>
      <div className="md:px-6 pl-3 h-full flex justify-between items-center">
        <div className="flex items-center gap-2">

          {
            pathname === "/personal-information" &&  <img
            src={"/logo.svg"}
            className={clsx(
              "w-[50px]",
              "transition-[width]  "
            )}

          />
          }
         
          <h3 className="text-[#464749] text-xl md:text-2xl font-semibold">{title}</h3>

        </div>
        <div className="flex items-center">


          <div className="flex items-center md:px-6">

            {
              role === "USER" &&
              <Link className="hidden md:block" to={"/help"} >
                <img src="/help_outline.svg" />
              </Link>
            }

            <Link
              to={"/notification"}
              className={`w-10 h-10 rounded-full bg-opacity-20 cursor-pointer ${isNotificationOpen ? "bg-pc-lightblue" : "bg-transparent"
                } flex justify-center items-center`}
            >
              <img src="/notification.svg" className="h-6 w-6" />

            </Link>

            <div className="border-l border-[#A0A3A6] mx-3 border h-[30px]" />

            <Link className="flex items-center gap-2" to="/account">
              <span className="w-8 h-8 bg-[#464749] text-white text-xl font-medium rounded-full flex items-center justify-center">
                {_extractInitials(`${profile?.firstName ?? "Admin"} `)}
              </span>
              <div className="hidden md:block">
                <h3 className="text-xs font-medium">Hello, {profile?.firstName ?? "Admin"} {profile?.lastName ?? "Ajosquad"}</h3>
                <h5 className="text-[10px] text-[#5A5C5E]">Good day</h5>
              </div>

            </Link>
            <button
              onClick={sideBar?.toggleSideBar}
              className="pr-3 pl-4 inline-block lg:hidden"
            >
              <RxHamburgerMenu size={30} />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
