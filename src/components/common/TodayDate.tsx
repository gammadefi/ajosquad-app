import React from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";

const TodayDate = () => {
    const today = new Date();

    const formatDate = (date: any) => {
        const day = date.getDate();
        const month = date.toLocaleDateString("en-US", { month: "short" });
        const year = date.getFullYear();

        // Add ordinal suffix to the day
        const ordinalSuffix = (n: any) => {
            if (n > 3 && n < 21) return "th"; // Covers 11th, 12th, 13th
            switch (n % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        };

        return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
    };

    const formattedDate = formatDate(today);

    return (
        <div className="flex items-center justify-center gap-3 p-4 border-[#C8CCD0] border-[0.8px] bg-white rounded-lg ">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#EEEFF0]">
                <MdOutlineCalendarMonth color="#344054" />
            </div>
            <div>
                <p className="text-sm font-normal text-[#475467]">
                    Today's Date
                </p>
                <h3 className="text-[#344054] font-semibold">{formattedDate}</h3>
            </div>

        </div>
    );
};

export default TodayDate;
