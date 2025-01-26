import { useQuery } from 'react-query';
import { contractAgreementServices } from '../../../services/contract-agreement';
import ContractAgreementCard from '../../../components/ContractAgreement/UserContractAgreementCard';
import PageLoader from '../../../components/spinner/PageLoader';

const ContractAgreement = () => {
  const { data: contractAgreements, error, isLoading } = useQuery('user-contractAgreements', async () => {
    const response = await contractAgreementServices.user.getAllContractAgreements();
    return response.data;
  });

  if (isLoading) return <PageLoader />
  if (error) return <div>An error occurred while fetching contracts</div>
  
  return (
    <div>
      <div className='flex gap-3 items-center lg:w-fit lg:gap-8'>
        <h2 className='font-semibold md:text-lg lg:text-xl'>Contract Agreement </h2>
        <p className='text-black/[42%] text-sm lg:text-base'>A copy of your contract agreement is provided below</p>
      </div>
      <div className='my-5'>
        <div className='my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {
            contractAgreements.data.map((contract: any) => (
              <ContractAgreementCard
                key={contract.id}
                id={contract.id}
                name={contract.productType + " Contract Agreement"}
                imgUrl={contract.agreement_url}
                uploadDate={contract.createdAt}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ContractAgreement