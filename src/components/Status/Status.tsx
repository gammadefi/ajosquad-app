import clsx from "clsx";

export interface StatusProps {
  label: string;
  backgroundColor?: string;
  disabled: boolean;
  type: "success" | "warning" | "error" | "default";
  fullWidth?: boolean;
}

export const Status = ({ label }: StatusProps) => {
  return <div className={clsx("")}>{label}</div>;
};
