import { MdOutlineUploadFile } from 'react-icons/md';
import { formatDate2 } from '../../../utils/formatTime';
import { useState } from 'react';
import { useQuery } from 'react-query';
import PageLoader from '../../../components/spinner/PageLoader';
import { contractAgreementServices } from '../../../services/contract-agreement';
import Modal from '../../../components/Modal/Modal';
import AddContractAgreementForm from '../../../components/ContractAgreement/AddContractAgreementForm';
import ContractAgreementCard from '../../../components/ContractAgreement/ContractAgreementCard';

const ContractAgreement = () => {
  const [showAddContractAgreementForm, setShowAddContractAgreementForm] = useState(false);

  const { data: contractAgreements, error, isLoading } = useQuery('contractAgreements', async () => {
    const response = await contractAgreementServices.getAllContractAgreements();
    return response.data;
  })

  if (isLoading) return <PageLoader />
  if (error) return <div>An error occurred while fecthing available contracts</div>
  console.log(contractAgreements);
  return (
    <>
      {
        contractAgreements && contractAgreements.data.length > 0 ?
          <div>
            <div className='flex flex-col md:flex-row gap-3 justify-between md:items-center mb-5'>
              <div className='flex flex-col md:flex-row md:gap-3 justify-between md:items-center lg:w-fit lg:gap-8'>
                <h2 className='font-semibold md:text-lg lg:text-xl'>Contract Agreement </h2>
                <p className='text-black/[42%] text-sm lg:text-base'>A copy of your contract agreement is provided below</p>
              </div>
              <button
                onClick={() => setShowAddContractAgreementForm(true)}
                className="w-fit flex items-center gap-2 justify-center border border-primary py-2 px-10 rounded-lg"
              >
                <MdOutlineUploadFile className='h-5 w-5' />
                Upload Contract
              </button>
            </div>
            <div className='my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {
                contractAgreements.data.map((contract: any) => (
                  <ContractAgreementCard
                    key={contract.id}
                    id={contract.id}
                    name={contract.name || contract.id}
                    imgUrl={contract.agreement_url}
                    uploadDate={contract.createdAt}
                  />
                ))
              }
            </div>
          </div>
          :
          <div className='mt-20 flex flex-col items-center justify-center gap-2'>
            <img src="./SigningContract.svg" alt="Signing COntract" />
            <h2 className='font-semibold md:text-lg lg:text-xl'>Upload and Publish Contract Agreement</h2>
            <p className='text-black/[42%] text-sm lg:text-base text-center'>Kindly proceed to upload and publish each product user contract agreement.</p>
            <button
              onClick={() => setShowAddContractAgreementForm(true)}
              className="w-fit flex items-center gap-2 justify-center border border-primary py-2 px-10 rounded-lg"
            >
              Upload Contract Agreement
            </button>
          </div>
      }
      <Modal open={showAddContractAgreementForm} onClick={() => setShowAddContractAgreementForm(false)}>
        <AddContractAgreementForm closeModal={() => setShowAddContractAgreementForm(false)} />
      </Modal>
    </>
  )
}

export default ContractAgreement