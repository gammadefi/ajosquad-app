import { useState } from 'react'
import User from '../../icons/reusables/user'
import { LuCalendarDays } from "react-icons/lu";
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { FaArrowRight } from 'react-icons/fa6';
import Modal from '../Modal/Modal';
import JoinSquadRegistrationFlow from './JoinSquadRegistrationFlow';
import { useCADFormatter } from '../../hooks/useCADFormatter';

dayjs.extend(advancedFormat)

type SquadCardType = {
  id: string,
  payoutAmount: number,
  title: string,
  numOfMaxMembers: number,
  date: Date,
  category: string,
  squadDuration: number
}

const SquadCard = ({ id, date, payoutAmount, category, title, numOfMaxMembers, squadDuration }: SquadCardType) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openJoinSquadForm, setOpenJoinSquadForm] = useState<boolean>(false);

  const formattedPayoutAmount = useCADFormatter(payoutAmount);
  const formattedDate = dayjs(date).format('Do MMM, YYYY | h:mm A');

  return (
    <>
      <div className='border border-[#C8CCD0] rounded-lg p-5 space-y-3'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-lg font-bold'>{title}</h1>
          <span className='bg-black text-white text-xs font-semibold rounded-xl px-2 py-0.5'>Start in 2 weeks</span>
        </div>
        <div className='flex justify-between'>
          <h3 className='text-lg font-bold'>CA{formattedPayoutAmount} payout</h3>
          <span className='flex items-center gap-1'><User />{numOfMaxMembers} Max. Member</span>
        </div>
        <div className='text-[#5A5C5E]'>This squad would run for {squadDuration} months</div>
        <div className='flex justify-between'>
          <p className='text-sm'>CA$ 300.00 / Every 2 weeks</p>
          <span className='text-xs flex items-center gap-1'><LuCalendarDays className='w-5 h-5' /> {formattedDate}</span>
        </div>
        <button onClick={() => setOpenModal(!openModal)} className="w-full rounded-lg p-0.5 bg-gradient-to-r from-[#23454F] via-[#0066FF] to-[#1EB7CF]">
          <div className="bg-white flex justify-center font-medium items-center gap-2 py-2 px-10 rounded-[calc(0.5rem-2px)]">
            <span>Join Squad</span>
            <FaArrowRight />
          </div>
        </button>
      </div>
      <Modal open={openModal} onClick={() => {
        setOpenModal(!openModal)
        setOpenJoinSquadForm(false)
      }}>

        <JoinSquadRegistrationFlow squadId={id} />
      </Modal>
    </>
  )
}

export default SquadCard

const ConnectBank = ({ squadType, onClick }: { squadType: string, onClick: () => void }) => {
  const [hasConnectedBank, setHasConnectedBank] = useState(false);
  return (
    <>
      {
        !hasConnectedBank ?
          <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
            <img src="./Bank.svg" alt="Email verified" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Connect your Bank
              </h3>
            </div>
            <p className='text-sm text-center'>
              You made the right choice joining the {squadType} Squad, Proceed to connect your bank information to complete the Squad joining Process.
            </p>
            <button
              type='submit'
              onClick={() => {
                setHasConnectedBank(true);
              }}
              className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Proceed to Connect your Bank
              <FaArrowRight />
            </button>
          </div>
          :
          <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
            <img src="./Bank.svg" alt="Email verified" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Bank Connected
              </h3>
            </div>
            <p className='text-sm text-center'>
              Bank connected to your account successfully, proceed to choose a position and complete the Squad joining process.
            </p>
            <button
              onClick={() => onClick()}
              className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Proceed
              <FaArrowRight />
            </button>
          </div>
      }
    </>
  )
}

