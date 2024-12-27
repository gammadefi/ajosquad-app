import { useState } from 'react'
import { FaCamera } from "react-icons/fa6";
import { PiPencilSimpleLine } from "react-icons/pi";
import Modal from '../../../components/Modal/Modal';
import EditAdminInformationForm from '../../../components/Profile/admin/EditAdminInformationForm';
import { userServices } from '../../../services/user';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import PageLoader from '../../../components/spinner/PageLoader';

const fetchAdminUser = async () => {
  const res: AxiosResponse = await userServices.user.getMe();
  return res.data;
};

const Profile = () => {
  const [showEditAdminInformationModal, setShowEditAdminInformationModal] = useState(false);
  const { data: adminData, isLoading, error } = useQuery(['adminUser'], fetchAdminUser);

  if (isLoading) return <PageLoader />
  if (error) return <div className='px-3 md:px-6 text-center text-lg mt-10'>Error fetching payment history</div>
  
  return (
    <div>
      <div className='my-5 space-y-4'>
        <div className='relative w-fit'>
          <img src="./Image.svg" alt="" />
          <FaCamera className='absolute h-5 w-5 text-primary-darkHover bottom-3 right-3.5' />
        </div>
       
        <div className='flex flex-col lg:flex-row gap-3'>
          <div className='border border-[#E2DFDF] rounded-lg py-4 px-4 md:py-5 md:px-6 h-60 w-full lg:w-[420px]'>
            <div className='text-lg mb-3 flex justify-between items-center'>
              <h2 className='font-semibold'>Personal Information</h2>
              <button onClick={() => setShowEditAdminInformationModal(!showEditAdminInformationModal)}>
                <PiPencilSimpleLine className='text-[#787A7D] h-5 w-5' />
              </button>
            </div>
            <div className='font-medium space-y-1.5'>
              <div className='flex justify-between'>
                <div className='w-3/5'>
                  <p className='text-[#96999C]'>First Name</p>
                  <p className='font-normal'>{adminData?.firstName}</p>
                </div>
                <div className='w-2/5'>
                  <p className='text-[#96999C]'>Last Name</p>
                  <p className='font-normal'>{adminData?.lastName}</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='w-3/5'>
                  <p className='text-[#96999C]'>Email Address</p>
                  <p className='font-normal'>{adminData?.email_address}</p>
                </div>
                <div className='w-2/5'>
                  <p className='text-[#96999C]'>Phone Number</p>
                  <p className='font-normal'>+234 900 0000 000</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <div>
                  <p className='text-[#96999C]'>Role</p>
                  <p className='font-normal'>{adminData?.role === "superadmin" && "Administrator"}</p>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
      <Modal open={showEditAdminInformationModal} onClick={() => setShowEditAdminInformationModal(!showEditAdminInformationModal)}>
        <EditAdminInformationForm onClose={() => setShowEditAdminInformationModal(!showEditAdminInformationModal)} />
      </Modal>
    </div>
  )
}

export default Profile
