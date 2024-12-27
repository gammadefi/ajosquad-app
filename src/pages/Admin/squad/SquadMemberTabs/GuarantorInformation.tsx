import { useState } from 'react';
import { MdOutlineUploadFile } from "react-icons/md";
import Modal from '../../../../components/Modal/Modal';
import AddGuarantorForm from '../../../../components/Guarantor/AddGuarantorForm';
import { useQuery } from 'react-query';
import GuarantorCard from '../../../../components/Guarantor/GuarantorCard';
import { guarantorServices } from '../../../../services/guarantor';
import useFetchWithParams from '../../../../hooks/useFetchWithParams';
import { useParams } from 'react-router-dom';
import PageLoader from '../../../../components/spinner/PageLoader';



const GuarantorInformation = () => {
  const {id} = useParams();
  const { data: guarantors, isLoading, error } = useFetchWithParams(['guarantors-admin', {
    page: 1,
    limit: 100,
    user_id: id
  }], 
    guarantorServices.getAllGuarantors, 
    {
      onSuccess: (data: any) => {
        console.log(data)
      }
    }
  );


  return (
    <div>
      {
        isLoading ?
         <PageLoader />
          :
          error ?
            <p className='text-center my-5 font-medium'>Error fetching guarantors</p>
            :
            (
              guarantors.guarantors.length > 0 ?
                <div className='my-5 place-content-center grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                  {
                    guarantors.guarantors.map((guarantor: any) => (
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
                <p className='my-5'>No guarantors yet. User is yet to add a guarantor</p>
            )
      }
    
    </div>
  )
}

export default GuarantorInformation