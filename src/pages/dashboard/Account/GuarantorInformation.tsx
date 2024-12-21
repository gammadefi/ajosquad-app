import { useState } from 'react';
import { MdOutlineUploadFile } from "react-icons/md";
import Modal from '../../../components/Modal/Modal';
import AddGuarantorForm from '../../../components/Guarantor/AddGuarantorForm';
import { useQuery } from 'react-query';
import GuarantorCard from '../../../components/Guarantor/GuarantorCard';
import { guarantorServices } from '../../../services/guarantor';

const fetchGuarantors = async () => {
  const res = await guarantorServices.getAllGuarantors();
  return res.guarantors;
};

const GuarantorInformation = () => {
  const { data: guarantors, isLoading, error } = useQuery(['guarantors'], fetchGuarantors);

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
          error ?
            <p className='text-center my-5 font-medium'>Error fetching guarantors</p>
            :
            (
              guarantors.length > 0 ?
                <div className='my-5 place-content-center grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
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
                <p className='my-5'>No guarantors yet. Please add a guarantor</p>
            )
      }
      <Modal open={showAddGuarantorForm} onClick={() => {
        setShowAddGuarantorForm(false)
      }}>
        <AddGuarantorForm closeModal={() => {
          setShowAddGuarantorForm(false)
        }
        } />
      </Modal>
    </div>
  )
}

export default GuarantorInformation