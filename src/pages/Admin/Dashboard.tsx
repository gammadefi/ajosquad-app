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
import BarGraph from '../../components/Graph/Graphs/BarGraph';
import { SemiDoughnutChart } from '../../components/Graph/Graphs/SemiDoughnutChart';
import HorizontalBarChart from '../../components/Graph/Graphs/HorizontalBarChart';

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

      <div className='px-3 md:px-6'>
        <div className='flex justify-between items-center'>

          <TodayDate />

        </div>

        <div className='grid my-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
          <div className='lg:col-span-4 xl:col-span-4 md:col-span-2 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 '>
            <InfoCard iconName='moneys-credit' value='CA$ 50,500.00' header='Total deposit' />
            <InfoCard iconName='moneys-debit' value='CA$ 50,500.00' header='Total Withdrwal' />
            <InfoCard type='squad' iconName='people' value='2' header='Squad' />
            <div className='my-5 md:col-span-2 xl:col-span-3'>
              <div className='col-span-3'>
                {/* <GraphWrapper graphTitle="Overall Sale">
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
                </GraphWrapper> */}
                <GraphWrapper graphTitle="Revenue Chart">
                  <h3 className='text-lg font-semibold'>Customer Data</h3>
                  <BarGraph
                    data={{
                      colors: ["#005CE6", "#0C7931", "#FCAD14", "#FCAD14", "#FCAD14"], // Custom colors for each bar
                      xAxisLabel: ["All", "", "Ajosquad", "AjoHome", "AjoBusiness"], // X-axis labels
                      seriesData: [500, 400, 200, 20, 15], // Bar values
                    }}
                  />
                  <div className='justify-around flex'>
                    <div className='flex items-center gap-2'>
                      <div className='w-[36px] h-[20px] bg-[#005CE6]' />
                      <h3 className='font-semibold'>Registered User</h3>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-[36px] h-[20px] bg-[#0C7931]' />
                      <h3 className='font-semibold'>Verified User</h3>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-[36px] h-[20px] bg-[#FCAD14]' />
                      <h3 className='font-semibold'>Active User</h3>
                    </div>

                  </div>
                </GraphWrapper>

              </div>

            </div>
          </div>
          <div className='lg:col-span-4 grid grid-cols-1 gap-2 xl:grid-cols-1 md:grid-cols-2 xl:col-span-2 md:col-span-2'>
            <div>
              <GraphWrapper graphTitle='Cash Flow Breakdown'>
                <div>
                  <h3 className='font-medium'>Cash Flow Breakdown</h3>

                  <h2 className='text-2xl my-3 font-bold'>CA$20,000,000.00</h2>

                </div>
                <HorizontalBarChart data={{ // Empty labels
                  datasets: [
                    {
                      label: "Dataset",
                      data: [40, 30, 20], // Values
                      backgroundColor: ["#003D99", "#137AAD", "#FCAD14"], // Colors for the bars
                    },
                  ],
                }} />
                <div className='my-4 flex flex-col gap-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='h-6 w-6 bg-[#003D99]' />
                      <h3>Ajosquad</h3>
                    </div>
                    <h3>CA$10,000,000.00</h3>

                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='h-6 w-6 bg-[#137AAD]' />
                      <h3>AjoHome</h3>

                    </div>
                    <h3>CA$10,000,000.00</h3>

                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='h-6 w-6 bg-[#FCAD14]' />
                      <h3>AjoBusiness</h3>

                    </div>
                    <h3>CA$10,000,000.00</h3>

                  </div>
                </div>
              </GraphWrapper>
            </div>
            <div className=''>
              <GraphWrapper graphTitle="Revenue Chart">
                <div className='flex items-center justify-between '>
                  <h3 className='text-lg font-medium'>Activoty Graph</h3>
                  <select className='px-3 py-2 rounded border border-[#FCAD14] bg-white'>
                    <option>Squad</option>
                    <option>Pod</option>
                    <option>Business</option>
                  </select>
                </div>
                <SemiDoughnutChart datasets={[
                  { label: "", data: [100, 20], backgroundColor: ["#07441B", "#FCAD14"] }
                ]

                } />
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col whitespace-nowrap items-center'>
                    <span>Completed</span>
                    <h3 className='font-semibold'>46</h3>
                    <h5>Squad</h5>
                  </div>
                  <div className='flex flex-col whitespace-nowrap items-center'>
                    <span>In Progress</span>
                    <h3 className='font-semibold'>9</h3>
                    <h5>Squad</h5>
                  </div>

                </div>
              </GraphWrapper>
            </div>



          </div>


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
    </div>
  )
}


export default Dashboard