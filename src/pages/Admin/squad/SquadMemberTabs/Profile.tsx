import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { userServices } from '../../../../services/user'
import PageLoader from '../../../../components/spinner/PageLoader'

const Profile = () => {
  const {id} :any = useParams()
      const { data: userData, isLoading } = useQuery(["fetch-user-details", id], () => userServices.user.getUserById(id))
  
  return (
    <div>
      {
        isLoading ? <PageLoader /> :
        <div className='flex flex-col lg:flex-row gap-3'>
        <div className='border border-[#E2DFDF] rounded-lg py-4 px-4 md:py-5 md:px-6 h-60 w-full lg:w-[420px]'>
          <div className='text-lg mb-3 flex justify-between items-center'>
            <h2 className='font-semibold'>Personal Information</h2>

          </div>
            <div className='font-medium space-y-1.5'>
            <div className='flex justify-between'>
              <div className='w-3/5'>
              <p className='text-[#96999C]'>First Name</p>
              <p className='font-normal'>{userData?.data?.firstName}</p>
              </div>
              <div className='w-2/5'>
              <p className='text-[#96999C]'>Last Name</p>
              <p className='font-normal'>{userData?.data?.lastName}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='w-3/5'>
              <p className='text-[#96999C]'>Email Address</p>
              <p className='font-normal'>{userData?.data?.email_address}</p>
              </div>
              <div className='w-2/5'>
              <p className='text-[#96999C]'>Phone Number</p>
              <p className='font-normal'>{userData?.data?.phoneNumber}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div>
              <p className='text-[#96999C]'>Address</p>
              <p className='font-normal'>{userData?.data?.homeAddress}</p>
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
          <p className='font-normal'>{userData?.data?.jobTitle}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='w-1/2'>
          <p className='text-[#96999C]'>Employer name</p>
          <p className='font-normal'>{userData?.data?.employerName}</p>
              </div>
              <div className='w-1/2'>
          <p className='text-[#96999C]'>Employer Phone Number</p>
          <p className='font-normal'>{userData?.data?.employerPhoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      
    </div>
  )
}

export default Profile