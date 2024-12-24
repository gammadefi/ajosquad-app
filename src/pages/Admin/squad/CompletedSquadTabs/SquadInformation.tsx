import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { squadServices } from '../../../../services/squad'
import { fDate } from '../../../../utils/formatTime'

const SquadInformation = () => {
    const { id }:any = useParams()

   

    const {data: info} = useQuery(['squad-info', id], () => squadServices.getSquad(id)) 
    console.log(info)
    return (
        <div>
            <div className='border border-[#E2DFDF] rounded-lg py-4 px-4 md:py-5 md:px-6  w-full lg:w-[420px]'>
                <div className='text-lg mb-3 flex justify-between items-center'>
                    <h2 className='font-semibold'>Squad Information</h2>

                </div>
                {
                    (info && info.data) &&
                    <div className='font-medium space-y-1.5'>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Squad Type</p>
                        <p className='font-normal'>{info.data.category}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Squad Name</p>
                        <p className='font-normal'>{info.data.name}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Date Created</p>
                        <p className='font-normal'>{fDate(info.data.createdAt)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Start Date</p>
                        <p className='font-normal'>{fDate(info.data.startDate)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>End Date</p>
                        <p className='font-normal'>{fDate(info.data.endDate)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Proposed Members</p>
                        <p className='font-normal'>{"10"}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Participated Member</p>
                        <p className='font-normal'>{info.data.squadMembers.length}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Contribution Interval</p>
                        <p className='font-normal'>{"Twice Monthly"}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Squad Amount</p>
                        <p className='font-normal'>CAD${info.data.amount.toLocaleString()}</p>
                    </div>

                </div>
                }
               
            </div>
        </div>
    )
}

export default SquadInformation