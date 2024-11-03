import React from 'react'
import { InfoCard } from '../../components/InfoCard/InfoCard'
import LineChart from '../../components/Graph/Graphs/LineChart'
import { GraphWrapper } from '../../components/Graph/GraphWrapper'
import { GraphDataInfo } from '../../components/Graph/GraphDataInfo'
import { currencyFormat } from '../../utils/helpers'
import BarGraph from '../../components/Graph/Graphs/BarGraph'
import People from '../../icons/reusables/people'
import Truck from '../../icons/reusables/Truck'

const Dashboard = () => {
  return (
    <div>
      <div className='md:px-6 py-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 px-2 items-center gap-3 justify-center'>
        <InfoCard header='Total Sales' value='500,000.00' iconBg='#470E81' iconName='naira' percentage='12%' />
        <InfoCard header='Product Sales' value='500,000.00' iconBg='#470E81' iconName='store' percentage='12%' />
        <InfoCard header='Service Sales' value='500,000.00' iconBg='#470E81' iconName='business' percentage='12%' />
        <InfoCard header='Total Profit' value='500,000.00' iconBg='#470E81' iconName='naira' percentage='12%' />
        <InfoCard header='Profitall Wallet' value='500,000.00' iconBg='#470E81' iconName='naira' percentage='12%' />
        <InfoCard header='Marketsq Wallet' value='500,000.00' iconBg='#FCB706' iconName='naira' percentage='12%' />
        <InfoCard header='Escrow Held' value='500,000.00' iconBg='#169D1B' iconName='security-safe' percentage='12%' />
        <InfoCard header='Monthly Profit' value='500,000.00' iconBg='#470E81' iconName='naira' percentage='12%' />

      </div>

      <div className="grid lg:grid-cols-5 h-auto grid-cols-1 px-2 md:px-6 gap-3 mt-6">
        <div className="lg:col-span-3 flex flex-col w-full ">
          <GraphWrapper graphTitle="Overall Sale">
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 rounded-full bg-[#470E81]' />Products
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 rounded-full bg-[#FCB706]' />Services
              </div>

            </div>
            <LineChart
              type='line'
              colors={["#470E81", "#FCB706",]}
              xAxisLabel={["J", "F", "M", "A", "M", "J", "JY", "AG", "S", "O", "N", "D"]}
              seriesData={[
                {
                  name: "Products",
                  data: [30, 40, 45, 50, 49, 60, 70, 30, 20, 50, 70, 100],
                },
                {
                  name: "Services",
                  data: [13, 50, 42, 60, 34, 63, 43, 45, 50, 49, 60, 90],
                }
              ]}
            />
          </GraphWrapper>
        </div>
        <div className="lg:col-span-2  flex flex-col w-full ">
          <div className='w-full mb-3 px-3 py-4 rounded-md bg-white'>
            <h3 className='font-bold'>No. of Users</h3>

            <div className='my-3 grid grid-cols-3 gap-2'>
              <div className='w-full h-[92px] p-2 bg-[#FFFBEF] rounded'>
               <People color='#FCB706' />
                <h4 className='font-medium whitespace-nowrap text-xs md:text-sm mt-2'>Total Customers</h4>
                <h3 className='font-bold text-lg'>1.8k</h3>

              </div>
              <div className='w-full h-[92px] p-2 bg-[#FAF4FF] rounded'>
                <img src='/icons/profile-2user.svg' />
                <h4 className='font-medium text-xs md:text-sm mt-2'>Total Vendors</h4>
                <h3 className='font-bold text-lg'>846</h3>

              </div>
              <div className='w-full h-[92px] p-2 bg-[#F4EDFF] rounded'>
                <Truck color='#A077E6' />
                <h4 className='font-medium text-xs md:text-sm mt-2'>Total Logistics</h4>
                <h3 className='font-bold text-lg'>20</h3>

              </div>

            </div>

          </div>
          <GraphWrapper type='weekly' graphTitle="Visit Overview">
            <BarGraph
              data={{
                stacked: false,
                colors: ["#470E81"],
                xAxisLabel: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
                seriesData: [
                  {
                    name: "Services",
                    data: [13, 50, 42, 60, 34, 63, 43],
                  }
                ]
              }}
            />

          </GraphWrapper>
        </div>
      </div>
    </div>
  )
}

export default Dashboard