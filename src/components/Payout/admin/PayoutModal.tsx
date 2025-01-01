import { useState } from 'react'
import { PayoutService } from '../../../services/payout';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import PageLoader from '../../spinner/PageLoader';
import { formatDate2 } from '../../../utils/formatTime';
import { IoMdCopy } from 'react-icons/io';
import { FaArrowRight, FaRegCircleCheck } from "react-icons/fa6";
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const updatePayout = async ({ id, payload }: { id: string, payload: any }) => {
  const res: AxiosResponse = await PayoutService.updatePayout(id, payload)
  return res.data
};

export default function PayoutAction({ id, closeModal }: { id: string, closeModal: () => void }) {
  const [step, setStep] = useState(1);
  const [isConfirmingPayout, setIsConfirmingPayout] = useState(false);

  const { copiedIndex, copyToClipboard } = useCopyToClipboard();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(`payout-${id}`, async () => {
    const response = await PayoutService.getPayout(id);
    return response.data;
  })

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleConfirmPayout = async () => {
    const payload = {
      "status": "completed"
    }
    try {
      setIsConfirmingPayout(true);
      const res = await mutation.mutateAsync({ id, payload });
      if (res) {
        setIsConfirmingPayout(false);
        handleNextStep();
      }
    } catch (error) {
      setIsConfirmingPayout(false);
      toast.error("An error occurred. Please try again")
    }
  }

  const mutation = useMutation(updatePayout, {
    onSuccess: () => {
      queryClient.invalidateQueries(["query-all-payouts-admin"]);
      queryClient.invalidateQueries(["query-all-total-payouts-admin"]);
    },
  });

  const handleCopy = (text: string, index: number) => {
    copyToClipboard(text, index);
  };

  if (isLoading) return <PageLoader />
  if (error) return <div className='px-3 md:px-6 text-center text-lg mt-10'>Error fetching payment history</div>

  return (
    <>
      <div className='md:w-[500px]'>
        {
          step === 1 &&
          <>
            <h2 className='text-3xl font-semibold'>Payout Transaction Details</h2>
            <p>Here's your Member payout details:</p>
            <div className='space-y-2 mt-2'>
              <div className='bg-[#F8F8F8] flex flex-col gap-2 p-2.5 rounded-lg mt-4'>
                <div className="flex justify-between">
                  <span>Payout Status</span>
                  <span className={`px-3 py-0.5 rounded-xl font-medium ${data.data.status === 'completed' ? "text-[#036B26] bg-[#E7F6EC]" : data.data.status === 'upcoming' ? "text-[#92610E] bg-[#FDF1DC]" : "text-red-500 bg-red-100"}`}>{data.data.status === 'completed' ? "Successful" : data.data.status === 'upcoming' ? "Upcoming" : "Pending"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Member Name</span>
                  <span className='text-[#464749]'>{data.data.squadMemberName || "John Doe"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Member Email</span>
                  <span className='text-[#464749]'>{data.data.squadMemberEmail || "johndoe@gmail.com"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Member ID</span>
                  <span className='text-[#464749]'>{data.data.squadMemberId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Product</span>
                  <span className='text-[#464749]'>Ajosquad</span>
                </div>
                <div className="flex justify-between">
                  <span>Description</span>
                  <span className='text-[#464749]'>{data.data.description}</span>
                </div>
                <div className="flex justify-between">
                  <span>Position</span>
                  <span className='text-[#464749]'>{data.data.position || "0"}/10</span>
                </div>
                {
                  data.data.status === "completed" &&
                  <>
                    <div className="flex justify-between">
                      <span>Amount</span>
                      <span className='text-[#464749] font-bold'>CA$ {data.data.amount}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment ID</span>
                      <span className='text-[#464749]'>{data.data.bankInformationId}</span>
                    </div>
                  </>
                }
                <div className="flex justify-between">
                  <span>Date</span>
                  <span className='text-[#464749]'>{formatDate2(data.data.createdAt, true)}</span>
                </div>
              </div>
              {
                (data.data.status === "pending" || data.data.status === "upcoming") &&
                <>
                  <hr />
                  <div className='bg-[#F8F8F8] flex flex-col gap-2 p-2.5 rounded-lg mt-4'>
                    <h2>Bank Details</h2>
                    <div className="flex justify-between">
                      <span>Amount</span>
                      <span className='text-[#464749] font-bold'>CA$ {data.data.amount}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bank Name</span>
                      <span className='text-[#464749]'>{data.data.bankDetails.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Account Name</span>
                      <span className='text-[#464749]'>{data.data.bankDetails.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Account Number</span>
                      <span className='text-[#464749] flex gap-1 items-center'>{data.data.bankDetails.accountNumber} {copiedIndex === 1 ? <FaRegCircleCheck /> : <IoMdCopy className='cursor-pointer' onClick={() => handleCopy(data.data.bankDetails.accountNumber, 1)} />}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Institution Number</span>
                      <span className='text-[#464749] flex gap-1 items-center'>{data.data.bankDetails.institutionNumber} {copiedIndex === 2 ? <FaRegCircleCheck /> : <IoMdCopy className='cursor-pointer' onClick={() => handleCopy(data.data.bankDetails.institutionNumber, 2)} />}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transit Number</span>
                      <span className='text-[#464749] flex gap-1 items-center'>{data.data.bankDetails.transitNumber} {copiedIndex === 3 ? <FaRegCircleCheck /> : <IoMdCopy className='cursor-pointer' onClick={() => handleCopy(data.data.bankDetails.transitNumber, 3)} />}</span>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-between">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="border border-primary font-medium px-10 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleNextStep}
                      className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
                    >
                      Mark Paid
                      <FaArrowRight />
                    </button>
                  </div>
                </>
              }
            </div>
          </>
        }
        {
          step === 2 &&
          <div className='flex flex-col gap-2'>
            <img src="./Rectangle.svg" alt="" className='mx-auto' />
            <p className='font-semibold text-center lg:text-2xl'>Please confirm that the payout has been successfully processed.</p>
            <div className="mt-5 flex justify-between">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="border border-primary font-medium px-10 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayout}
                disabled={isConfirmingPayout}
                className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
              >
                {isConfirmingPayout ? "Proceeding" : "Yes, Proceed"}

                <FaArrowRight />
              </button>
            </div>
          </div>
        }
        {
          step === 3 &&
          <div className='flex flex-col items-center gap-5'>
            <img src="./Trophy.svg" alt="Trophy" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Payout Successfully
              </h3>
            </div>
            <p className='text-sm text-center'>
              Success! {data.data.squadMemberId} payout successful.
            </p>
            <button
              onClick={closeModal}
              className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Dismiss
              <FaArrowRight />
            </button>
          </div>
        }
      </div >
    </>
  )
}
