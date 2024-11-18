import React from 'react'
import User from '../../icons/reusables/user'
import { LuCalendarDays } from "react-icons/lu";
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { FaArrowRight } from 'react-icons/fa6';

// Load the plugin
dayjs.extend(advancedFormat)

type SquadCardType = {
  payoutAmount: string,
  title: string,
  numOfMaxMembers: number,
  date: Date,
  squadDuration: number
}

const SquadCard = ({ date, payoutAmount, title, numOfMaxMembers, squadDuration }: SquadCardType) => {
  const formattedDate = dayjs(date).format('Do MMM, YYYY | h:mm A');
  return (
    <div className='border border-[#C8CCD0] rounded-lg p-5 space-y-3'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-lg font-bold'>{title}</h1>
        <span className='bg-black text-white text-xs font-semibold rounded-xl px-2 py-0.5'>Start in 2 weeks</span>
      </div>
      <div className='flex justify-between'>
        <h3 className='text-lg font-bold'>CA${payoutAmount} payout</h3>
        <span className='flex items-center gap-1'><User />{numOfMaxMembers} Max. Member</span>
      </div>
      <div className='text-[#5A5C5E]'>This squad would run for {squadDuration} months,</div>
      <div className='flex justify-between'>
        <p className='text-sm'>CA$ 300.00 / Every 2 weeks</p>
        <span className='text-xs flex items-center gap-1'><LuCalendarDays className='w-5 h-5' /> {formattedDate}</span>
      </div>
      <button className="w-full rounded-lg p-0.5 bg-gradient-to-r from-[#23454F] via-[#0066FF] to-[#1EB7CF]">
        <div className="bg-white flex justify-center font-medium items-center gap-2 py-2 px-10 rounded-[calc(0.5rem-2px)]">
          <span>Join Squad</span>
          <FaArrowRight />
        </div>
      </button>
    </div>
  )
}

export default SquadCard