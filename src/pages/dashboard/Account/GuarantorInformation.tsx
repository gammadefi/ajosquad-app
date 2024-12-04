import { useState } from 'react';
import { MdOutlineUploadFile } from "react-icons/md";
import Modal from '../../../components/Modal/Modal';
import AddGuarantorForm from '../../../components/Guarantor/AddGuarantorForm';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { userServices } from '../../../services/user';
import { useAuth } from '../../../zustand/auth.store';
import GuarantorCard from '../../../components/Guarantor/GuarantorCard';

const fetchGuarantors = async () => {
  const res: AxiosResponse = await userServices.guarantor.getAllGuarantors(useAuth.getState().profile.id);
  return res.data;
};

const GuarantorInformation = () => {
  const { data: guarantors, isLoading, refetch } = useQuery(['guarantors'], fetchGuarantors);
  console.log(guarantors)
  const [showAddGuarantorForm, setShowAddGuarantorForm] = useState(false);

  return (
    <div>
      <div className='flex flex-col lg:flex-row gap-3 justify-between'>
        <div className='flex gap-3 justify-between items-center lg:w-fit lg:gap-8'>
          <h2 className='font-semibold md:text-xl'>Guarantor Information</h2>
          <p className='text-black/[42%] text-sm md:text-base'>Upload Guarantor Information </p>
        </div>
        <button
          onClick={() => setShowAddGuarantorForm(true)}
          className="w-fit flex items-center gap-2 justify-center border border-primary py-2 px-10 rounded-lg"
        >
          <MdOutlineUploadFile className='h-5 w-5' />
          Upload Guarantor
        </button>
      </div>
      {
        isLoading ?
          <div className='my-5 flex justify-center'>
            <img src="./logo.png" alt="" className='h-20 w-20' />
          </div>
          :
          (
            guarantors.length > 0 ?
              <div className='my-5 place-content-center grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8'>
                {
                  guarantors.map((guarantor: any) => (
                    <GuarantorCard
                      key={guarantor.id}
                      id={guarantor.id}
                      name={guarantor.name}
                      uploadDate={guarantor.createdAt}
                      imgUrl={guarantor.document_url}
                      verificationStatus={guarantor.verificationStatus}
                    />
                  ))
                }
              </div>
              :
              <>No guarantors yet. Please add a guarantor</>
          )
      }
      <Modal open={showAddGuarantorForm} onClick={() => {
          setShowAddGuarantorForm(false)
          refetch()
        }}>
        <AddGuarantorForm closeModal={() => {
          setShowAddGuarantorForm(false)
          refetch()
        }
        } />
      </Modal>
    </div>
  )
}

export default GuarantorInformation