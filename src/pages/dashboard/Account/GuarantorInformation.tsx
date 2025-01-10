import { useState } from 'react';
import { MdOutlineUploadFile, MdOutlineDownload } from "react-icons/md";
import Modal from '../../../components/Modal/Modal';
import AddGuarantorForm from '../../../components/Guarantor/AddGuarantorForm';
import GuarantorCard from '../../../components/Guarantor/GuarantorCard';
import { guarantorServices } from '../../../services/guarantor';
import { useQuery } from 'react-query';

const GuarantorInformation = () => {
  const [showAddGuarantorForm, setShowAddGuarantorForm] = useState(false);

  const { data: guarantors, isLoading, error, refetch } = useQuery('guarantors', async () => {
    const res = await guarantorServices.getAllGuarantors({});
    return res.data;
  })

  return (
    <div>
      <div className='flex flex-col lg:flex-row gap-3 justify-between'>
        <div className='flex gap-3 justify-between items-center lg:w-fit lg:gap-8'>
          <h2 className='font-semibold md:text-xl'>Guarantor Information</h2>
          <p className='text-black/[42%] text-sm md:text-base'>Upload Guarantor Information </p>
        </div>

        <div className="flex items-center gap-3">
          <a className="flex text-primary font-medium text-sm md:text-base items-center gap-2" href="https://res.cloudinary.com/dwk4rqxhu/image/upload/v1733312652/xjkcqusmbzon4tyjh1fg.pdf " target="_blank" rel="noreferrer" >
            <MdOutlineDownload className='h-5 w-5' />
            Download Guarontor form
          </a>
          <button
            onClick={() => setShowAddGuarantorForm(true)}
            className="w-fit flex items-center gap-2 justify-center border border-primary py-2 px-10 rounded-lg"
          >
            <MdOutlineUploadFile className='h-5 w-5' />
            Upload Guarantor
          </button>
        </div>

      </div>
      {
        isLoading ?
          <div className='my-5 flex justify-center'>
            <img src="./logo.png" alt="" className='h-20 animate-pulse w-20' />
          </div>
          :
          error ?
            <p className='text-center my-5 font-medium'>Error fetching guarantors</p>
            :
            (
              guarantors.data.length > 0 ?
                <div className='my-5 place-content-center grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                  {
                    guarantors.data.map((guarantor: any) => (
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
      <Modal open={showAddGuarantorForm} onClick={async () => {
        await refetch()
        setShowAddGuarantorForm(false)
      }}>
        <AddGuarantorForm closeModal={async () => {
          await refetch()
          setShowAddGuarantorForm(false)
        }
        } />
      </Modal>
    </div>
  )
}

export default GuarantorInformation