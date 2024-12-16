import { useState } from 'react'
import { FaCamera } from "react-icons/fa6";
import { PiPencilSimpleLine } from "react-icons/pi";
import Modal from '../../../components/Modal/Modal';
import EditPersonalInformationForm from '../../../components/Profile/EditPersonalInformationForm';
import EditEmployerInformationForm from '../../../components/Profile/EditEmployerInformationForm';
import { AxiosResponse } from 'axios';
import { userServices } from '../../../services/user';
import { useQuery } from 'react-query';

const fetchUser = async () => {
  const res: AxiosResponse = await userServices.user.getMe();
  return res.data;
};

const Profile = () => {
  const [showEditPersonalInformation, setShowEditPersonalInformation] = useState(false);
  const [showEditEmployerInformation, setShowEditEmployerInformation] = useState(false);
  const { data: user, isLoading, error } = useQuery(['user'], fetchUser);

  return (
    <div>
      {
        isLoading ?
          <div className='flex justify-center'>
            <img src="./logo.png" alt="" className='h-20 w-20' />
          </div>
          :
          error ?
            <>Error fetching user detalis</>
            :
            <div className='my-5 space-y-4'>
              <div className='relative w-fit'>
                <img src="./Image.svg" alt="" />
                <FaCamera className='absolute h-5 w-5 text-primary-darkHover bottom-3 right-3.5' />
              </div>
              <div>
                <h2 className='text-lg font-semibold'>{user.firstName + " " + user.lastName}</h2>
                <p><span className='text-[#787A7D]'>ID: </span>{user.id}</p>
                <p className='text-[#787A7D]'>Toronto, Canada.</p>
              </div>
              <div className='flex flex-col lg:flex-row gap-3'>
                <div className='border border-[#E2DFDF] rounded-lg py-4 px-4 md:py-5 md:px-6 h-60 w-full lg:w-[420px]'>
                  <div className='text-lg mb-3 flex justify-between items-center'>
                    <h2 className='font-semibold'>Personal Information</h2>
                    <button onClick={() => setShowEditPersonalInformation(!showEditPersonalInformation)}>
                      <PiPencilSimpleLine className='text-[#787A7D] h-5 w-5' />
                    </button>
                  </div>
                  <div className='font-medium space-y-1.5'>
                    <div className='flex justify-between'>
                      <div className='w-3/5'>
                        <p className='text-[#96999C]'>First Name</p>
                        <p className='font-normal'>{user.firstName}</p>
                      </div>
                      <div className='w-2/5'>
                        <p className='text-[#96999C]'>Last Name</p>
                        <p className='font-normal'>{user.lastName}</p>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <div className='w-3/5'>
                        <p className='text-[#96999C]'>Email Address</p>
                        <p className='font-normal'>{user.email_address}</p>
                      </div>
                      <div className='w-2/5'>
                        <p className='text-[#96999C]'>Phone Number</p>
                        <p className='font-normal'>+{user.phoneNumber}</p>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <div>
                        <p className='text-[#96999C]'>Address</p>
                        <p className='font-normal'>{user.homeAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='border border-[#E2DFDF] rounded-lg py-4 px-4 md:py-5 md:px-6 h-60 w-full lg:w-[420px]'>
                  <div className='text-lg mb-3 flex justify-between items-center'>
                    <h2 className='font-semibold'>Employer Information</h2>
                    <button onClick={() => setShowEditEmployerInformation(!showEditEmployerInformation)}>
                      <PiPencilSimpleLine className='text-[#787A7D] h-5 w-5' />
                    </button>
                  </div>
                  <div className='font-medium space-y-1.5'>
                    <div className='flex justify-between'>
                      <div>
                        <p className='text-[#96999C]'>Job Title</p>
                        <p className='font-normal'>{user.jobTitle}</p>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <div className='w-1/2'>
                        <p className='text-[#96999C]'>Employer name</p>
                        <p className='font-normal'>{user.employerName}</p>
                      </div>
                      <div className='w-1/2'>
                        <p className='text-[#96999C]'>Employer Phone Number</p>
                        <p className='font-normal'>+{user.employerPhoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      }
      <Modal open={showEditPersonalInformation} onClick={() => setShowEditPersonalInformation(!showEditPersonalInformation)}>
        <EditPersonalInformationForm onClose={() => setShowEditPersonalInformation(!showEditPersonalInformation)} />
      </Modal>
      <Modal open={showEditEmployerInformation} onClick={() => setShowEditEmployerInformation(!showEditEmployerInformation)}>
        <EditEmployerInformationForm onClose={() => setShowEditEmployerInformation(!showEditEmployerInformation)} />
      </Modal>
    </div>
  )
}

export default Profile

