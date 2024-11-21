import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { LiaFileContractSolid } from "react-icons/lia";
import { useAuth } from '../../zustand/auth.store'
import clsx from 'clsx'
import People from '../../icons/reusables/people';
import TodayDate from '../../components/common/TodayDate';
import { InfoCard } from '../../components/InfoCard/InfoCard';
import { GraphWrapper } from '../../components/Graph/GraphWrapper';
import LineChart from '../../components/Graph/Graphs/LineChart';

const Dashboard = () => {
  const [kycVerified, setKycVerified] = React.useState(true)
  const [activeSquad, setActiveSquad] = React.useState(true)

  const allData: any = {
    "24h": {
      xAxisLabel: ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM", "12AM"],
      seriesData: [
        { name: "Products", data: [10, 15, 8, 20, 14, 18, 22] },
        { name: "Services", data: [12, 10, 18, 14, 16, 10, 20] },
      ],
    },
    "7d": {
      xAxisLabel: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      seriesData: [
        { name: "Products", data: [30, 40, 45, 50, 49, 60, 70] },
        { name: "Services", data: [13, 50, 42, 60, 34, 63, 43] },
      ],
    },
    "6M": {
      xAxisLabel: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      seriesData: [
        { name: "Products", data: [100, 90, 80, 85, 95, 110] },
        { name: "Services", data: [70, 75, 60, 65, 55, 60] },
      ],
    },
    "1Y": {
      xAxisLabel: ["J", "F", "M", "A", "M", "J", "JY", "AG", "S", "O", "N", "D"],
      seriesData: [
        { name: "Products", data: [30, 40, 45, 50, 49, 60, 70, 30, 20, 50, 70, 100] },
        { name: "Services", data: [13, 50, 42, 60, 34, 63, 43, 45, 50, 49, 60, 90] },
      ],
    },
    Max: {
      xAxisLabel: ["2019", "2020", "2021", "2022", "2023", "2024"],
      seriesData: [
        { name: "Products", data: [200, 250, 300, 350, 400, 450] },
        { name: "Services", data: [150, 180, 210, 190, 220, 240] },
      ],
    },
  };

  const [selectedRange, setSelectedRange] = useState("1Y"); // Default range

  // Get data for the selected range
  const { xAxisLabel, seriesData } = allData[selectedRange];

  return (


    <div>
      {
        (kycVerified === false || activeSquad === false) ? (
          <div>
            <Verification kycVerified={kycVerified} activeSquad={activeSquad} />
          </div>
        ) :

          <div className='px-3 md:px-6'>
            <div className='flex justify-between items-center'>
              <div>

              </div>
              <TodayDate />

            </div>

            <div className='grid my-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <InfoCard iconName='moneys-credit' value='CA$ 50,500.00' header='Total deposit' />
              <InfoCard iconName='moneys-debit' value='CA$ 50,500.00' header='Total Withdrwal' />
              <InfoCard type='squad' iconName='people' value='2' header='Squad' />

            </div>

            <div className='grid my-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              <div className='col-span-3'>
                <GraphWrapper graphTitle="Overall Sale">
                  <div className='flex items-center gap-3'>
                    <div className="flex bg-[#F7F7F8] py-2 px-2 space-x-4 mb-4">
                      {["24h", "7d", "6M", "1Y", "Max"].map((range) => (
                        <button
                          key={range}
                          className={`px-4 py-2 bg-white rounded-lg ${selectedRange === range
                              ? "border-blue-600 border text-gray-800"
                              : " text-gray-800"
                            }`}
                          onClick={() => setSelectedRange(range)}
                        >
                          {range}
                        </button>
                      ))}
                    </div>

                  </div>
                  <LineChart
                    type='line'
                    colors={["#0E8837", "#D42620",]}
                    xAxisLabel={xAxisLabel}
                    seriesData={seriesData}
                  />
                </GraphWrapper>
              </div>

            </div>


          </div>
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
            <div className='flex gap-2'>
              <div className="mt-2">
                <LiaFileContractSolid size={24} />
              </div>

              <h3 className=" text-lg font-bold md:text-2xl">Read and sign the  Ajosquad Agreement</h3>
            </div>

            <h5 className='text-xs md:text-sm mt-3'>Almost done! Read and sign our User Agreement to unlock all Ajosquad features and start exploring.</h5>

            <button className={clsx('px-5 max-w-[205px] py-2 border border-white rounded-md mt-auto',


            )}>Read & Sign Agreement</button>

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