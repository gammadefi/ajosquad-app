import React from "react";

import {
  IsPosOrNeg,
} from "../../utils/percentageUtil";

export interface InfoProps {
  header: string;
  value?: string;
  percentage?: string;
  className?: string;
  iconName?: string;
  iconBg?: "#470E81" | "#FCB706" | "#169D1B" | "#9B8442" | "#A077E6" | "#F03738",
  onfilterChange?: (e: any) => void
}

export const InfoCard = ({
  header,
  value,
  percentage = "",
  className,
  iconName,
  iconBg

}: InfoProps) => {

  return (
    <div
      className={`max-w-[220px] min-w-[218px] flex flex-col justify-between border-[0.4px] border-[#C8CCD0] w-full py-3 px-3 h-[128px] bg-white rounded-lg shadow-lg ${className}`}
    >
      <div style={{ backgroundColor: iconBg }} className={`w-full  flex items-center justify-between `}>
        <h4 className='my-3 text-sm text-[#A0A3A6] '>{header}</h4>
        <img src={`/icons/info/${iconName}.svg`} alt="Icon" />
      </div>

      <div className='flex items-center justify-between'>
        {value && <h3 className='text-xl text-black font-semibold'>{value}</h3>}

        {percentage &&
          (IsPosOrNeg(percentage) === "pos" ? (
            <span className="font-normal text-green-500 p-1 bg-green-100 text-xs flex-row flex items-center gap-1">
              <img src="/icons/trending-up.svg" alt="u" /> {percentage}
            </span>
          ) : (
            <span className="font-normal text-red-500 p-1 bg-red-100 text-xs flex-row flex items-center gap-1">
              <img src="icons/trending-down.svg" alt="d" /> {percentage}
            </span>
          ))}

      </div>

     





    </div>
  );
};
