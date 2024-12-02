import React from 'react'

const SquadInformation = () => {
    return (
        <div>
            <div className='border border-[#E2DFDF] rounded-lg py-4 px-4 md:py-5 md:px-6  w-full lg:w-[420px]'>
                <div className='text-lg mb-3 flex justify-between items-center'>
                    <h2 className='font-semibold'>Squad Information</h2>

                </div>
                <div className='font-medium space-y-1.5'>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Squad Type</p>
                        <p className='font-normal'>{"Bronze"}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Squad Name</p>
                        <p className='font-normal'>{"Bronze 2.0"}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Date Created</p>
                        <p className='font-normal'>{"Nov 24th 2024"}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Start Date</p>
                        <p className='font-normal'>{"December 15th 2024"}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>End Date</p>
                        <p className='font-normal'>{"April 15th 2024"}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Proposed Members</p>
                        <p className='font-normal'>{"10"}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Participated Member</p>
                        <p className='font-normal'>{"10"}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Contribution Interval</p>
                        <p className='font-normal'>{"Twice Monthly"}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#96999C]'>Squad Amount</p>
                        <p className='font-normal'>{"CAD$ 5,000"}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SquadInformation