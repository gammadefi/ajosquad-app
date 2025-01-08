import GuarantorCard from '../../../../components/Guarantor/GuarantorCard';
import { guarantorServices } from '../../../../services/guarantor';
import { useParams } from 'react-router-dom';
import PageLoader from '../../../../components/spinner/PageLoader';
import { useQuery } from 'react-query';

const Guarantor = () => {
  const { id } = useParams();
  const { data: guarantors, isLoading, error } = useQuery([`members-management-${id}-guarantors`], async () => {
    const data = await guarantorServices.getAllGuarantors({
      page: 1,
      limit: 100,
      user_id: id
    });
    return data.data;
  });

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
                <p className='my-5'>No guarantors yet. User is yet to add a guarantor</p>
            )
      }

    </div>
  )
}

export default Guarantor