import React from "react";

import {
  IsPosOrNeg,
} from "../../utils/percentageUtil";
import Spinner from "../spinner/Spinner";

export interface InfoProps {
  header: string;
  value?: string;
  percentage?: string;
  className?: string;
  iconName?: string;
  isLoading?: boolean;
  iconBg?: "#470E81" | "#FCB706" | "#169D1B" | "#9B8442" | "#A077E6" | "#F03738",
  onfilterChange?: (e: any) => void,
  action?: {
    label: string;
    buttonAction: () => void
  }
}

export const InfoCard = ({
  header,
  value,
  percentage = "",
  className,
  iconName,
  iconBg,
  action,
  isLoading=true


}: InfoProps) => {

  return (
    <div
      className={`max-w-[420px] min-w-[218px] flex flex-col justify-between border-[0.4px] border-[#C8CCD0] w-full py-3 px-3 h-[128px] bg-white rounded-lg shadow-lg ${className}`}
    >
      <div style={{ backgroundColor: iconBg }} className={`w-full  flex items-center justify-between `}>
        <h4 className='my-3 text-sm text-[#A0A3A6] '>{header}</h4>
        <img src={`/icons/info/${iconName}.svg`} alt="Icon" />
      </div>

      <div className='flex items-center justify-between'>
        {isLoading ? <Spinner color="black" width={10} height={10} />  : <h3 className='text-xl text-black font-semibold'>{value && value.toString()}</h3>}

        {
          action && (
            <button className="border-[0.4px] py-1 px-[6px] rounded text-xs text-[#5A5C5E] border-[#C8CCD0]" onClick={action.buttonAction}>{action.label}</button>
          )
        }

      </div>

     





    </div>
  );
};
