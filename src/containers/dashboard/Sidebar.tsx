import clsx from "clsx";
import { NavLink, useMatch, useLocation, useResolvedPath } from "react-router-dom";
import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useRef, useState, useContext } from "react";
import { useSingleState } from "../../hooks/useSingleState";
import { LogoutContext } from "../../context/LogoutContext";
import { sidebar } from "../../pages/dashboard/layout/AdminLayout";




export const DashboardSidebar = ({ items }: { items: SideItem[] }) => {
  const logout: any = useContext(LogoutContext)
  const collapsed = useSingleState(false);
  const hovered = useSingleState(false);
  const throttledHover = useRef(false);
  const isExpanded = hovered.get || !collapsed.get;
  const isCollapsed = !isExpanded;




  return (
    <aside
      className={clsx(
        "h-full md:flex hidden transition-[width,padding] text-white duration-300 flex-col overflow-y-hidden overflow-x-hidden bg-[#470E81] relative",
        "w-[300px]" 
      )}
    >
      <div
        className={clsx(
          " py-8 transition-[padding] border-b border-gray-500",
          isCollapsed ? "" : "px-4 w-full"
        )}
      >
        <img
          src={isCollapsed ? "/images/icon-logo.svg" : "/images/logo.svg"}
          className={clsx(
            isCollapsed ? "w-[72px]" : "w-[109px]",
            "transition-[width] h-[25px] "
          )}
          alt="yep_logo"
        />
      </div>
      <nav
        id="Sidebar-nav"
        onMouseEnter={() => {
          throttledHover.current = true;
          setTimeout(() => {
            if (throttledHover.current) {
              hovered.set(true);
            }
          }, 400);
        }}
        onMouseLeave={() => {
          hovered.set(false);
          throttledHover.current = false;
        }}
        className={clsx(
          isCollapsed ? "w-full" : "w-full",
          "flex-1 overflow-y-hidden hover:overflow-y-auto  custom-scrollbar"
        )}
      >

        <SidebarItem />


        <div className="absolute w-full bottom-0 h-16 pl-4 gap-3.5 bg-[#470E81] flex items-center">
          <div className="w-full flex cursor-pointer items-center gap-3.5">
            <img
              src={`/icons/sidebar/logout.svg`}
              className={clsx("h-6 w-6")}
              alt="log_out"
            />

            <span
              onClick={() => logout?.toggleLogout()}
              className={`whitespace-nowrap pc-text-danger ${isCollapsed ? "hidden" : ""
                }`}
            >
              Log Out
            </span>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export interface SideItem {
  name: string;
  path?: string;
  iconName?: string;
  children?: SideItem[];
}

export const SidebarItem = ({
  className
}: {
  className?: any;
}) => {
  const { pathname } = useLocation()
  return (
    <div className="mb-8">
      {sidebar.map((items, index) =>
        <div className="py-8 w-full border-b border-gray-500 px-3">
          {items.children ?
            <div>
              <h3 className="uppercase mb-2">{items.name}</h3>
              {items.children.map((item) =>
                <>
                  <NavLink to={item.path ?? "/"} className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 text-white px-3 py-2",
                      isActive ? "bg-white text-[#470E81] " : ""

                    )
                  }>
                    {({ isActive }) => <>
                      <img className={clsx(
                        isActive ? "" : "invert-[100%] brightness-0"
                      )} src={`/icons/sidebar/${item.iconName}.svg`} /> <h3  className={clsx("capitalize", isActive ? "text-[#470E81] " : "")}>{item.name}</h3>
                    </>}

                  </NavLink>
                </>
              )}

            </div> :
            <NavLink to={items.path ?? "/"} className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 text-white px-3 py-2",
                isActive ? "bg-white text-[#470E81] " : ""

              )
            }>
              {({ isActive }) => <>
                <img className={clsx(
                  isActive ? "" : "invert-[100%] brightness-0"
                )} src={`/icons/sidebar/${items.iconName}.svg`} /> <h3  className={clsx("capitalize", isActive ? "text-[#470E81] " : "")}>{items.name}</h3>
              </>}

            </NavLink>}

        </div>
      )}

    </div>


  );
};
