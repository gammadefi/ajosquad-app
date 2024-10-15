import React from "react";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import {
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { useSingleState } from "../../hooks/useSingleState";
export interface ActionOptionProps {
  name: React.ReactNode;
  action: Function;
  disabled?: boolean;
  hide?: boolean;
}
interface Props {
  options?: ActionOptionProps[];
  position?: "right" | "left";
  offset?: number;
  className?: string;
  variant?: "vertical" | "horizontal";
  Component?: (opened: boolean) =>  React.ReactNode | React.ReactNode;
  fillColor?: string;
}
export const Action = ({
  options,
  position = "right",
  offset = 10,
  variant = "vertical",
  Component,
  fillColor,
}: Props) => {
  const show = useSingleState(false);
  return (
    <div className="flex-shrink-0">
      {options && (
        <Popover.Root open={show.get} onOpenChange={show.set}>
          <Popover.Trigger asChild>
            {Component ? (
              typeof Component === "function" ? (
                Component(show.get)
              ) : (
                Component
              )
            ) : variant === "vertical" ? (
              <EllipsisVerticalIcon className="h-7 w-7 text-zp-off-black cursor-pointer" />
            ) : (
              <EllipsisHorizontalIcon className="h-7 w-7 text-zp-off-black cursor-pointer" />
            )}
          </Popover.Trigger>
          <Popover.Content
            className="relative z-40"
            sideOffset={offset}
            align={position === "right" ? "end" : "start"}
          >
            <div className="bg-white rounded-[4px] overflow-hidden border border-zp-line shadow flex flex-col min-w-[14rem]">
              {options
                .filter((option) => !option.hide)
                .map((option, index) => (
                  <button
                    key={"Action-" + index}
                    disabled={option.disabled}
                    className={clsx(
                      "text-left pl-4 pr-10 py-2 text-sm",
                      "min-w-[8rem] inline-block font-medium",
                      "hover:bg-fara-blue hover:text-white",
                      option.disabled &&
                        "opacity-50 cursor-not-allowed text-kGrey",
                      typeof option.name === "string"
                        ? option.name.toLowerCase().includes("delete") ||
                          option.name.toLowerCase().includes("cancel")
                          ? "text-red-500"
                          : option.name.toLowerCase().includes("edit")
                          ? "text-yellow-600"
                          : option.name.toLowerCase().includes("view")
                          ? "text-kBlue"
                          : ""
                        : ""
                    )}
                    onClick={() => {
                      if (option !== undefined && option.action) {
                        option.action();
                      }
                      show.set(false);
                    }}
                  >
                    {option.name}
                  </button>
                ))}
            </div>
          </Popover.Content>
        </Popover.Root>
      )}
    </div>
  );
};

export default Action;
