import { useState } from "react"
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa6"
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { contractAgreementServices } from "../../services/contract-agreement";

const DeleteContractAgreement = ({ contractorAgreementId, closeModal }: { contractorAgreementId: string, closeModal: () => void }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasDeleted, setHasDeleted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ contractorAgreementId }: { contractorAgreementId: string }) => {
      const res: AxiosResponse = await contractAgreementServices.deleteContractAgreement(contractorAgreementId)
      return res.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["contractAgreements"]);
      },
    });

  const handleDeleteContractorAgreement = async () => {
    setIsDeleting(true);
    try {
      const res = await mutation.mutateAsync({ contractorAgreementId });
      if (res) {
        setHasDeleted(true);
      }
    } catch (error) {
      toast.error("Failed to delete this contract agreement");
      setIsDeleting(false);
    }
  }

  return (
    <>
      {
        hasDeleted ?
          <div className='md:w-[550px] flex flex-col items-center gap-5'>
            <img src="./Delete.svg" alt="Delete bank" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Contract Agreement Deleted
              </h3>
            </div>
            <p className='text-sm text-center'>
              You've successfully deleted the Contract Agreement
            </p>
            <button
              onClick={closeModal}
              className='bg-primary w-full font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Dismiss
            </button>
          </div>
          :
          <div className='md:w-[550px] flex flex-col items-center gap-5'>
            <img src="./Delete.svg" alt="Delete bank" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Are you sure you want to delete this Contract Agreement?
              </h3>
            </div>
            <p className='text-sm text-center'>
              This action cannot be undone. If you're sure, click 'Delete' to confirm
            </p>
            <div className="my-3 w-full flex justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="border border-primary font-medium px-10 rounded-lg"
              >
                Back
              </button>
              <button
                disabled={isDeleting}
                onClick={handleDeleteContractorAgreement}
                className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
              >
                {isDeleting ? "Deleting" : "Delete"}
                <FaArrowRight />
              </button>
            </div>
          </div>
      }
    </>
  )
}

export default DeleteContractAgreement