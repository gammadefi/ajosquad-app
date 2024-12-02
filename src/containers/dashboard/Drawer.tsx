import React, { useRef, useState } from 'react'
import { FaChevronCircleUp, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import clsx from 'clsx';
import useOnClickOutside from '../../hooks/useClickOutside';
import { useSingleState } from '../../hooks/useSingleState';
import { SidebarEndItem, SidebarItem, SidebarMidItem } from './Sidebar';

interface INO {
    isOpen: boolean;
    setIsOpen: any;
    hasHero: boolean
}

const Drawer = ({ isOpen, setIsOpen, hasHero }: INO) => {
    const collapsed = useSingleState(false);
    const hovered = useSingleState(false);
    const throttledHover = useRef(false);
    const isExpanded = hovered.get || !collapsed.get;
    const isCollapsed = !isExpanded;
    const [openDrop, setOpenDrop] = useState(false)
    const sideNavRef = useRef<any>();
    useOnClickOutside(sideNavRef, () => {
        setIsOpen(false);
    });

    return (
        <>
            {isOpen && (
                <section
                    ref={sideNavRef}
                    className={`fixed notification-sidebar ${isOpen ? "active" : ""
                        } rounded-tl rounded-bl overflow-y-hidden hover:overflow-y-auto  custom-scrollbar transition-transform duration-1000 h-screen w-[80%] md:w-[300px] rounded-r-lg   top-0 shadow-md bg-white z-[90] left-0`}
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

                </section >
            )}
        </>
    )
}

export default Drawer