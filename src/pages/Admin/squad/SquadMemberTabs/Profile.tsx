import React from 'react'

const Profile = () => {
  return (
    <div>
      <div className='flex flex-col lg:flex-row gap-3'>
        <div className='border border-[#E2DFDF] rounded-lg py-4 px-4 md:py-5 md:px-6 h-60 w-full lg:w-[420px]'>
          <div className='text-lg mb-3 flex justify-between items-center'>
            <h2 className='font-semibold'>Personal Information</h2>

          </div>
          <div className='font-medium space-y-1.5'>
            <div className='flex justify-between'>
              <div className='w-3/5'>
                <p className='text-[#96999C]'>First Name</p>
                <p className='font-normal'>{"profile?.firstName"}</p>
              </div>
              <div className='w-2/5'>
                <p className='text-[#96999C]'>Last Name</p>
                <p className='font-normal'>{"profile?.lastName"}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='w-3/5'>
                <p className='text-[#96999C]'>Email Address</p>
                <p className='font-normal'>{"rofile?.email_address"}</p>
              </div>
              <div className='w-2/5'>
                <p className='text-[#96999C]'>Phone Number</p>
                <p className='font-normal'>+234 900 0000 000</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div>
                <p className='text-[#96999C]'>Address</p>
                <p className='font-normal'>Toronto, Canada</p>
              </div>
            </div>
          </div>
        </div>
        <div className='border border-[#E2DFDF] rounded-lg py-4 px-4 md:py-5 md:px-6 h-60 w-full lg:w-[420px]'>
          <div className='text-lg mb-3 flex justify-between items-center'>
            <h2 className='font-semibold'>Employer Information</h2>
          </div>
          <div className='font-medium space-y-1.5'>
            <div className='flex justify-between'>
              <div>
                <p className='text-[#96999C]'>Job Title</p>
                <p className='font-normal'>UI/UX Designer</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='w-1/2'>
                <p className='text-[#96999C]'>Employer name</p>
                <p className='font-normal'>faviayomide@gmail.com</p>
              </div>
              <div className='w-1/2'>
                <p className='text-[#96999C]'>Employer Phone Number</p>
                <p className='font-normal'>+234 900 0000 000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile