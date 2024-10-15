import React, { useState } from "react";
import NotificationIcon from "../../components/common/NotificationIcon";
import NotificationSidebar from "../../components/common/NotificationSidebar";
import SearchInput from "../../components/FormInputs/SearchInput";
import { Link } from "react-router-dom";

const _extractInitials = (val: string) => {
  const _first = val.split(" ")[0].slice(0, 1);
  const _second = val?.split(" ")[1]?.slice(0, 1);
  return `${_first.toLocaleUpperCase()}${_second && _second.toLocaleUpperCase() }`;
};

const DashboardHeader = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const _openNav = () => {
    setIsNotificationOpen(true);
  };
  return (
    <header className="h-20 w-full sticky top-0 bg-white shadow-sm z-50 overflow-hidden">
      <div className="px-6 h-full flex justify-between items-center">
        <div>
          <SearchInput placeholder="search" />
        </div>
        <div className="flex items-center">


          <div className="flex items-center px-6">
            <NotificationSidebar
              setIsNotificationOpen={setIsNotificationOpen}
              isNotificationOpen={isNotificationOpen}
            />
            <div
              onClick={_openNav}
              className={`w-10 h-10 rounded-full bg-opacity-20 cursor-pointer ${isNotificationOpen ? "bg-pc-lightblue" : "bg-transparent"
                } flex justify-center items-center`}
            >
              <div className="relative p-2 mr-3 mt-1">
                <span className="w-3 h-3 absolute bg-red-500 rounded-full z-10 top-1 right-[0.45rem] "></span>
                <NotificationIcon fill="#470E81" />
              </div>
            </div>
            <Link to="/profile">
              <span className="w-8 h-8 bg-[#470E81] text-white text-xl font-medium rounded-full flex items-center justify-center">
                {_extractInitials(`${"Demilade"} `)}
              </span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
