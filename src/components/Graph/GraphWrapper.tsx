import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import TabBar from "../Tab/TabBar";

export interface IGraphWrapperProps {
  graphTitle: string;
  children: React.ReactNode;
  extraHeader?: React.ReactNode;
  type?:"yearly" | "weekly"
}
export const GraphWrapper = ({
  graphTitle,
  children,
  extraHeader,
  type,
}: IGraphWrapperProps) => {
  return (
    <div className="w-full h-full bg-white rounded-lg py-6 px-3">
      <div className=" pb-5 border-b">
        <div className="flex flex-wrap justify-between">
          <h4 className="font-bold whitespace-nowrap text-base">{graphTitle}</h4>

          {type === "weekly" ? <TabBar  tabs={["Weekly","Monthly", "Yearly"]} /> :<button className=" flex items-center gap-x-4">
            <p className="block text-sm text-gray-600">This Year</p>
            <ChevronDownIcon className="my-auto text-gray-600 text-xs w-5" />
          </button>}
          
        </div>
        {extraHeader}
      </div>

      <div className="h-auto w-full overflow-x-hidden overflow-y-auto py-2">{children}</div>
    </div>
  );
};
