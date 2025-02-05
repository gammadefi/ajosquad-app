import { useEffect, useState } from 'react'
import User from '../../icons/reusables/user'
import { LuCalendarDays } from "react-icons/lu";
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { FaArrowRight } from 'react-icons/fa6';
import Modal from '../Modal/Modal';
import JoinSquadRegistrationFlow from './JoinSquadRegistrationFlow';
import { useCADFormatter } from '../../hooks/useCADFormatter';
import { formatStartDate } from '../../utils/formatTime';
import UpdateSquadPositionFlow from './UpdateSquadPositionFlow';
import CustomModal from '../Modal/CustomModal';
import { useMutation } from 'react-query';
import { squadServices } from '../../services/squad';

dayjs.extend(advancedFormat)

type SquadCardType = {
  id: string,
  payoutAmount: number,
  title: string,
  numOfMaxMembers: number,
  date: Date,
  startDate: any,
  category: string,
  squadDuration: number,
  selectedPositions: string[],
  hasJoinedSquad: boolean,
  myPosition?: any,
  information?: any,
  refetch: () => void
}

const SquadCard = ({ id, date, payoutAmount, category, title, numOfMaxMembers, squadDuration, selectedPositions, startDate, hasJoinedSquad, myPosition, information, refetch }: SquadCardType) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openJoinSquadForm, setOpenJoinSquadForm] = useState<boolean>(false);
  const amount:any = {
    "Silver": 500,
    "Gold": 1000,
    "Bronze": 300,
    "Brass": 200
  }

  const formattedPayoutAmount = useCADFormatter(payoutAmount);
  const formattedDate = dayjs(date).format('Do MMM, YYYY | h:mm A');
  console.log(selectedPositions)

  return (
    <>
      <div className='border border-[#C8CCD0] rounded-lg p-5 space-y-3'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-lg font-bold'>{title}</h1>
          <span className='bg-black text-white text-xs font-semibold rounded-xl px-2 py-0.5'>{formatStartDate(startDate)}</span>
        </div>
        <div className='flex justify-between'>
          <h3 className='text-lg font-bold'>CA{formattedPayoutAmount} payout</h3>
          <span className='flex items-center gap-1'><User />{numOfMaxMembers} Max. Member</span>
        </div>
        <div className='flex items-center justify-between '>
        <div className='text-[#5A5C5E]'>This squad would run for {squadDuration} months</div>

        <h3 className='text-xs'>{selectedPositions.length} /10 members</h3>

        </div>
        <div className='flex justify-between'>
          <p className='text-sm'>CA$ {amount[category]}.00 / Every 2 weeks</p>
          <span className='text-xs flex items-center gap-1'><LuCalendarDays className='w-5 h-5' /> {formattedDate}</span>
        </div>
        {
          hasJoinedSquad ? <button disabled={selectedPositions.length === 10} onClick={() => setOpenUpdateModal(!openUpdateModal)} className="w-full rounded-lg p-0.5 bg-gradient-to-r from-[#23454F] via-[#0066FF] to-[#1EB7CF]">
            <div className="bg-white flex justify-center font-medium items-center gap-2 py-2 px-10 rounded-[calc(0.5rem-2px)]">
              <span>Update Squad Positions</span>
              <FaArrowRight />
            </div>
          </button> : <button disabled={selectedPositions.length === 10} onClick={() => setOpenModal(!openModal)} className="w-full rounded-lg p-0.5 bg-gradient-to-r from-[#23454F] via-[#0066FF] to-[#1EB7CF]">
            <div className="bg-white flex justify-center font-medium items-center gap-2 py-2 px-10 rounded-[calc(0.5rem-2px)]">
              <span>Join Squad</span>
              <FaArrowRight />
            </div>
          </button>
        }

      </div>
      <CustomModal open={openModal} onClick={() => {
        setOpenModal(!openModal)
        setOpenJoinSquadForm(false)
        refetch()

      }}>
        {
          openJoinSquadForm ? <JoinSquadRegistrationFlow selecetedPosition={selectedPositions} squadId={id} /> : <ConnectBank squadType={category} onClick={() => setOpenJoinSquadForm(!openJoinSquadForm)} />
        }


      </CustomModal>
      <Modal open={openUpdateModal} onClick={() => {
        setOpenUpdateModal(!openUpdateModal)
        // setOpenJoinSquadForm(false)'
        refetch()
      }}>

        <UpdateSquadPositionFlow information={information} myPositions={myPosition} selecetedPosition={selectedPositions} squadId={id} />

      </Modal>
    </>
  )
}

export default SquadCard

const ConnectBank = ({ squadType, onClick }: { squadType: string, onClick: () => void }) => {
  const [hasConnectedBank, setHasConnectedBank] = useState(false);
  const [authorisationUrl, setAuthorisationUrl] = useState<any>(null); // [authorisationUrl]

  const [connected, setConnected] = useState(localStorage.getItem('connectedGocardless'));

  useEffect(() => {
    const handleStorageChange = (event:any) => {
      if (event.key === 'connectedGocardless') {
        setConnected(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (connected === 'true') {
      console.log('GoCardless connected successfully. Perform action here.');
      // Add your success logic here
      if(authorisationUrl !== "" ) {
        setHasConnectedBank(true)
        localStorage.removeItem("connectedGocardless")
      }
    } else if (connected === 'false') {
      console.log('GoCardless connection failed. Perform action here.');
      // Add your failure logic here
    }
  }, [connected]);

  const handleConnectBank = useMutation(async () => {
    const currentHost = window.location.origin; // Gets the current hostname (e.g., "https://ajosquad-app.vercel.app")
    const basePath = "/squad/connect-gocardless"; // Common path for both URLs
  
    const payload = {
      client_url: `${currentHost}${basePath}?status=success`,
      exit_url: `${currentHost}${basePath}?status=failed`,
    };
  
    return await squadServices.connectBank(payload);
  },
  {
    onSuccess: (data) => {
      console.log(data);
      if(data.data.message === "User is already connected to GoCardless") {
        setHasConnectedBank(true)
      }
      setAuthorisationUrl(data.data.authorizationUrl)
    }
  }

);

  return (
    <>
      {
        !hasConnectedBank && !authorisationUrl ?
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
                handleConnectBank.mutate()
              }}
              className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Proceed to Connect your Bank
              <FaArrowRight />
            </button>
          </div>
          :

          !hasConnectedBank && authorisationUrl ? <div className='relative md:min-w-[600px] min-w-[300px] w-full h-[100vh]'>
            <iframe
              src={authorisationUrl}
              title="Connect to GoCardless"
              className="w-full h-full border-0"
              allow="fullscreen"
            ></iframe>
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

