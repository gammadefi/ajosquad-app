export interface SwitchProps {
  on: boolean;
  onToggle: () => void;
}

export const Switch = ({ on, onToggle }: SwitchProps) => {
  return (
    <div
      className={`rounded-[22px] w-[32px] p-[3px] flex  my-auto  ${
        on ? 'bg-[#1C1C1C] justify-end' : 'bg-[#00000020] justify-start'
      }`}
    >
      <div className="switcher bg-white rounded-full w-[14px] my-auto h-[14px]"></div>
    </div>
  );
};
