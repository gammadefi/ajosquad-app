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
                            " py-8 relativetransition-[padding] ",
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
                        <button
                            onClick={() => setIsOpen(false)}
                            type="button"
                            className="focus:outline-none px-1 py-1 border-black right-4 rounded-full border top-10 absolute ml-auto focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
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