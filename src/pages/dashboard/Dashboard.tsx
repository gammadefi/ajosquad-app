import React from 'react'
import { CgProfile } from "react-icons/cg";
import { useAuth } from '../../zustand/auth.store'
import clsx from 'clsx'
import People from '../../icons/reusables/people';

const Dashboard = () => {
  const [kycVerified, setKycVerified] = React.useState(false)
  const [activeSquad, setActiveSquad] = React.useState(false)
  return (


    <div>
      {
        (kycVerified === false || activeSquad === false) && (
          <div>
            <Verification kycVerified={kycVerified} activeSquad={activeSquad} />
          </div>
        )
      }
    </div>
  )
}


const Verification = ({ kycVerified, activeSquad } = { kycVerified: false, activeSquad: false }) => {
  const profile: any = useAuth((s) => s.profile);
  return (
    <div className='px-3 py-20 md:px-12'>

      <h3 className=' text-3xl md:text-5xl font-semibold '>Hi, <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#23454F] via-[#0066FF] to-[#1EB7CF]'>{profile.firstName} {profile.lastName}</span></h3>
      <h5 className='text-base md:text-xl mt-2 text-[#656565]'>You still have a few more step to complete your profile</h5>


      <div className='mt-8'>
        <h3 className='text-2xl font-semibold'>Account set up Checklist</h3>
        <div className='flex mt-2 gap-3'>
          <VerificationCards>
            <div className='flex gap-2 items-center'>
              <div>
                <CgProfile size={24} />
              </div>

              <h3 className=" text-lg font-bold md:text-2xl">Complete Account  KYC & Agreement</h3>
            </div>

            <h5 className='text-xs md:text-sm mt-3'>Get access to all features when you<br />
              complete your account KYC and User agreement.</h5>

            <button className={clsx('px-5 max-w-[165px] py-2 border border-white rounded-md mt-auto',


            )}>Proceed to KYC</button>

          </VerificationCards>
          <VerificationCards disabled={kycVerified === false}>
            <div className='flex gap-2 items-center'>
              <div>
                <People color={kycVerified === false ? "#1e232c44" : "white"} />
              </div>

              <h3 className=" text-lg font-bold md:text-2xl">Join a Squad</h3>
            </div>

            <h5 className='text-xs md:text-sm mt-3'>Check through our various squad groups and option to choose the on that best serves you.</h5>

            <button disabled={kycVerified === false} className={clsx('px-5 max-w-[165px] py-2 border mt-auto border-white rounded-md ',


            )}>Join a squad</button>

          </VerificationCards>

        </div>
      </div>



    </div>
  )
}

const VerificationCards = ({ disabled = false, children }: { disabled?: boolean, children: React.ReactNode }) => {
  return (
    <div className={clsx('w-[350px] h-[214px] flex flex-col rounded-xl p-[16px] ',
      disabled ? "bg-[#0000002E] text-[#1e232c44] " : "bg-[#08354C] text-white"
    )}>
      {children}
    </div>
  )
}

export default Dashboard