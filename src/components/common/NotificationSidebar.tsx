import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useClickOutside";
import { Link } from "react-router-dom";

interface INO {
  isNotificationOpen: boolean;
  setIsNotificationOpen: any;
}

const NotificationSidebar = ({
  isNotificationOpen,
  setIsNotificationOpen,
}: INO) => {
  const sideNavRef = useRef<any>();


  useOnClickOutside(sideNavRef, () => {
    setIsNotificationOpen(false);
  });

  
  // console.log(data?.data);
 

  return (
    <>
    {isNotificationOpen && (
        <section
        ref={sideNavRef}
        className={`fixed notification-sidebar ${
          isNotificationOpen ? "active" : ""
        } rounded-tl rounded-bl transition-transform duration-1000 h-full w-80  top-0 shadow-md bg-white z-30 right-0`}
      >
        <div className="h-full flex flex-col pr-1 justify-center">
          <div
            style={{ borderColor: "#EBEFF2" }}
            className="py-5 flex justify-between items-center px-5 border-b"
          >
            <div className="flex items-center">
              <h6 className="text-[#101010]">Notifications</h6>
              {/* <span className="text-pc-secondaryshade1 ml-8 text-sm">
                Clear All
              </span> */}
            </div>
            <img
              onClick={() => {
                setIsNotificationOpen(false);
              }}
              src="/icons/close-nav.svg"
              className="w-6 cursor-pointer"
              alt=""
            />
          </div>
          <div className="flex-1 scrollbar px-4 py-4 overflow-y-auto">
           
          <h3>lol</h3>
          </div>
          
        </div>
      </section>
    )}
    
    </>
  
  );
};

export default NotificationSidebar;
