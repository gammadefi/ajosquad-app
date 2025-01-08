import clsx from "clsx";
import { NavLink, useMatch, useLocation, useResolvedPath } from "react-router-dom";
import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useRef, useState, useContext } from "react";
import { useSingleState } from "../../hooks/useSingleState";
import { LogoutContext } from "../../context/LogoutContext";
import { sidebar, sidebarEnd, sidebarHome, sidebarMid } from "../../pages/dashboard/layout/DashboardLayout";
import { ProductContext } from "../../context/ProductContext";
import { useAuth } from "../../zustand/auth.store";




export const DashboardSidebar = ({ items }: { items: SideItem[] }) => {
  const collapsed = useSingleState(false);
  const hovered = useSingleState(false);
  const throttledHover = useRef(false);
  const isExpanded = hovered.get || !collapsed.get;
  const isCollapsed = !isExpanded;




  return (
    <aside
      className={clsx(
        "h-full lg:flex hidden border-r text-sm transition-[width,padding] text-[#5A5C5E] duration-300 flex-col overflow-y-hidden overflow-x-hidden bg-white relative",
        "w-[250px]"
      )}
    >
      <div
        className={clsx(
          " py-8 transition-[padding] ",
          isCollapsed ? "" : "px-4 w-full"
        )}
      >
        <img
          src={isCollapsed ? "/logo.png" : "/logo.svg"}
          className={clsx(
            "w-[50px]",
            "transition-[width]  "
          )}

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
        <SidebarMidItem />

        <div className="flex flex-col mt-auto mb-0 items-end ">
          <SidebarEndItem />

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
  const role: any = useAuth((s) => s.role)
  const product = useAuth((s) => s.product)
  const sideBarToRender = product === "AjoHome" ? sidebarHome[role] : sidebar[role]
  return (
    <div className="mb-6">
      { sideBarToRender.map((items: any, index: number) =>
        <div className="py-2 w-full px-3">

          <NavLink to={items.path ?? "/"} className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 text-[#5A5C5E] px-3 py-2",
              isActive ? "bg-white border-primary-darker border rounded-md text-transparent bg-clip-text" : ""

            )
          }>
            {({ isActive }) => <>
              <div
                className={clsx(
                  "w-5 h-5",
                  isActive ? "gradient-icon" : "invert-[100%] brightness-0"
                )}
                style={
                  isActive
                    ? {
                      WebkitMaskImage: `url(/sidebar-icons/${items.iconName}.svg)`,
                      maskImage: `url(/sidebar-icons/${items.iconName}.svg)`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      background: "linear-gradient(90deg, #23454F 0%, #222834 0%, #0066FF 69.76%, #1EB7CF 100%)",
                      WebkitMaskSize: "cover",
                      maskSize: "cover",
                    }
                    : {
                      backgroundImage: `url(/sidebar-icons/${items.iconName}.svg)`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      filter: "invert(100%) brightness(0)", // Make the icon grayscale when inactive
                    }
                }
              ></div> <h3 className={clsx("capitalize", isActive ? "bg-custom-gradient font-semibold text-transparent bg-clip-text" : "")}>{items.name}</h3>
            </>}

          </NavLink>

        </div>
      )}

    </div>


  );
};


export const SidebarMidItem = ({
  className
}: {
  className?: any;
}) => {
  const { pathname } = useLocation()
  const role: any = useAuth((s) => s.role)
  return (
    <div className="mb-8 pt-2 border-t">
      {sidebarMid[role].map((items: any, index: number) =>
        <div className="py-2 w-full px-3">

          <NavLink to={items.path ?? "/"} className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 text-[#5A5C5E] px-3 py-2",
              isActive ? "bg-white border-primary-darker border rounded-md text-transparent bg-clip-text" : ""

            )
          }>
            {({ isActive }) => <>
              <div
                className={clsx(
                  "w-5 h-5",
                  isActive ? "gradient-icon" : "invert-[100%] brightness-0"
                )}
                style={
                  isActive
                    ? {
                      WebkitMaskImage: `url(/sidebar-icons/${items.iconName}.svg)`,
                      maskImage: `url(/sidebar-icons/${items.iconName}.svg)`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      background: "linear-gradient(90deg, #23454F 0%, #222834 0%, #0066FF 69.76%, #1EB7CF 100%)",
                      WebkitMaskSize: "cover",
                      maskSize: "cover",
                    }
                    : {
                      backgroundImage: `url(/sidebar-icons/${items.iconName}.svg)`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      filter: "invert(100%) brightness(0)", // Make the icon grayscale when inactive
                    }
                }
              ></div> <h3 className={clsx("capitalize", isActive ? "bg-custom-gradient text-transparent bg-clip-text" : "")}>{items.name}</h3>
            </>}

          </NavLink>

        </div>
      )}

    </div>


  );
};

export const SidebarEndItem = ({
  className
}: {
  className?: any;
}) => {
  const { pathname } = useLocation()
  const logout: any = useContext(LogoutContext)
  const product = useContext(ProductContext)
  const role: any = useAuth((s) => s.role)

  return (
    <div className="mb-0 pb-3 mt-12 pt-2 w-full">
      {sidebarEnd[role].map((items: any, index: number) =>
        <div className="py-2 w-full px-3">

          <NavLink to={items.path ?? "/"} className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 text-[#5A5C5E] px-3 py-2",
              isActive ? "bg-white" : ""

            )
          }>
            {({ isActive }) => <>
              <img
                src={`/sidebar-icons/${items.iconName}.svg`}
                className={clsx(
                  "w-5 h-5",
                )}

              /> <h3 className={clsx("capitalize", isActive ? "bg-custom-gradient text-transparent bg-clip-text" : "")}>{items.name}</h3>
            </>}

          </NavLink>

        </div>
      )}

      {
        role !== "ADMIN" && <div className="py-2 w-full px-3">

          <button
            onClick={() => product?.toggleProduct()}
            className={clsx(
              "flex items-center gap-3 text-[#5A5C5E] px-3 py-2")
            }>

            <img
              src={`/sidebar-icons/Logo.svg`}
              className={clsx(
                "w-5 h-5",
              )}
            /> <h3 className={clsx("capitalize")}>Explore Other Product</h3>


          </button>

        </div>
      }



      <div className="w-full px-6 py-2 flex cursor-pointer items-center gap-3.5">
        <img
          src={`/sidebar-icons/logout.svg`}
          className={clsx("h-5 w-5")}
          alt="log_out"
        />

        <span
          onClick={() => logout?.toggleLogout()}
          className={`whitespace-nowrap text-red-500`}
        >
          Log Out
        </span>
      </div>

    </div>


  );
};