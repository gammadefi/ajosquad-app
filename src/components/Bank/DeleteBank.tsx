import { useState } from "react"
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa6"
import { useMutation, useQueryClient } from "react-query";
import { userServices } from "../../services/user";
import { AxiosResponse } from "axios";

const deleteBankInformation = async ({ bankId }: { bankId: string }) => {
  const res: AxiosResponse = await userServices.bank.deleteBank(bankId)
  return res.data
}

const DeleteBank = ({ bankId, closeModal }: { bankId: string, closeModal: () => void }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasDeleted, setHasDeleted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteBankInformation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userBanks"]);
    },
  });

  const handleDeleteBank = async () => {
    setIsDeleting(true);
    try {
      const res = await mutation.mutateAsync({ bankId });
      if (res) {
        setHasDeleted(true);
      }
    } catch (error) {
      toast.error("Failed to delete bank");
      setIsDeleting(false);
    }
  }

  return (
    <>
      {
        hasDeleted ?
          <div className='md:w-[550px] lg:w-full flex flex-col items-center gap-5'>
            <img src="./Delete.svg" alt="Delete bank" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Bank Details Deleted
              </h3>
            </div>
            <p className='text-sm text-center'>
              You've successfully deleted the bank details
            </p>
            <button
              onClick={closeModal}
              className='bg-primary w-full font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Dismiss
            </button>
          </div>
          :
          <div className='md:w-[550px] lg:w-full flex flex-col items-center gap-5'>
            <img src="./Delete.svg" alt="Delete bank" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Are you sure you want to delete this bank details?
              </h3>
            </div>
            <p className='text-sm text-center'>
              This action cannot be undone. Deleted banks  will be permanently removed from your account. If you're sure, click 'Delete' to confirm
            </p>
            <div className="my-3 w-full flex justify-between">
              <button
                onClick={closeModal}
                className="border border-primary font-medium px-10 rounded-lg"
              >
                Back
              </button>
              <button
                disabled={isDeleting}
                onClick={handleDeleteBank}
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

export default DeleteBank