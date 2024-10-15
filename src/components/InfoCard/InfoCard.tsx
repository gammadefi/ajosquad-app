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
  iconBg?: "#470E81" | "#FCB706" | "#169D1B" | "#9B8442" | "#A077E6" | "#F03738"
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
      className={`max-w-[406px] mx-auto w-full py-3 px-3 h-[144px] bg-white rounded shadow ${className}`}
    >
      <div style={{ backgroundColor: iconBg }} className={`w-[40px]  flex items-center justify-center h-[40px] rounded-full`}>
        <img src={`/icons/info/${iconName}.svg`} alt="Icon" />
      </div>
      <h4 className='my-3 font-[500]'>{header}</h4>
      <div className='flex items-center justify-between'>
        {value && <h3 className='text-lg font-semibold'>{value}</h3>}

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
