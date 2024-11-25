import React, { useState } from "react";

import {
  IsPosOrNeg,
} from "../../utils/percentageUtil";
import clsx from "clsx";

export interface InfoProps {
  header: string;
  value?: string;
  percentage?: string;
  className?: string;
  iconName?: string;
  type? : string;
  iconBg?: "#470E81" | "#FCB706" | "#169D1B" | "#9B8442" | "#A077E6" | "#F03738",
  onfilterChange?: (e: any) => void
}

export const InfoCard = ({
  header,
  value,
  percentage = "",
  className,
  iconName,
  iconBg,
  type = "default",
  onfilterChange = (e: any) => { }

}: InfoProps) => {
  const filterParams = ["2Months ago", "Last Month", "All Time"]
  const filterParams2 = ["Completed", "Active Squad"]

  const [activeFilter, setActiveFilter] = useState(filterParams[2])
  const [activeFilter2, setActiveFilter2] = useState(filterParams2[1])


  const handleFilterChange = (param: string) => {
    setActiveFilter(param)
    onfilterChange(param)

  }

  const handleFilterChange2 = (param: string) => {
    setActiveFilter2(param)
    onfilterChange(param)

  }

  return (
    <div
      className={`lg:max-w-[364px] flex flex-col justify-between border-[0.4px] border-[#C8CCD0] w-full py-3 px-3 h-[168px] bg-white rounded-lg shadow-md ${className}`}
    >
      <div style={{ backgroundColor: iconBg }} className={`w-full  flex items-center justify-between `}>
        <h4 className='my-3 text-sm text-[#A0A3A6] '>{header}</h4>
        <img src={`/icons/info/${iconName}.svg`} alt="Icon" />
      </div>

      <div className='flex items-center justify-between'>
        {value && <h3 className='text-2xl text-[#464749] font-semibold'>{value}</h3>}

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


      {
        type === "default" ? (
          <div className="flex justify-between items-center">
          {
            filterParams.map((params, i) => {
              return (
                <button onClick={() => handleFilterChange(params)} className={clsx("px-[6px] text-xs border-[0.4px] rounded-md h-[28px] py-[2px]", activeFilter === params && "bg-[#1898D81A] !border border-[#08354C]")} key={i} >{params}</button>
  
              )
            })
          }
  
  
  
        </div>
        ): (
          <div className="flex gap-3 justify-end items-center">
          {
            filterParams2.map((params, i) => {
              return (
                <button onClick={() => handleFilterChange2(params)} className={clsx("px-[6px] text-xs border-[0.4px] rounded-md h-[28px] py-[2px]", activeFilter2 === params && "bg-[#1898D81A] !border border-[#08354C]")} key={i} >{params}</button>
  
              )
            })
          }
  
  
  
        </div>
        )
      }

     





    </div>
  );
};
