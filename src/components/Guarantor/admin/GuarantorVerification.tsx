import { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6';
import { guarantorServices } from '../../../services/guarantor';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import PageLoader from '../../spinner/PageLoader';
import { timeAgo } from '../../../utils/formatTime';
import { convertToThumbnailUrl } from '../../../utils/helpers';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';

const updateGuarantor = async ({ id, payload }: { id: string, payload: any }) => {
  const res: AxiosResponse = await guarantorServices.updateGuarantor(id, payload)
  return res.data
};

export default function GuarantorVerificationModal({ id, closeModal }: { id: string, closeModal: () => void }) {
  const [step, setStep] = useState(1);
  const [showFinalModal, setshowFinalModal] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [finalModalContent, setFinalModalContent] = useState({
    title: "",
    description: ""
  });
  const [reason, setReason] = useState("");

  const queryClient = useQueryClient();


  const { data, isLoading, error } = useQuery(`guarantor-${id}`, async () => {
    const response = await guarantorServices.getGuarantor(id);
    return response;
  })

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleApproveGuarantor = async () => {
    const payload = {
      verificationStatus: "verified"
    }
    try {
      setIsApproving(true);
      const res = await approveGuarantormutation.mutateAsync({ id, payload });
      if (res) {
        setIsApproving(false);
        setFinalModalContent({
          title: "Approved",
          description: "Your have successfully approved this guarantor"
        })
        setshowFinalModal(true);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again")
    }
  };

  const handleDeclineGuarantor = async () => {
    if (!reason) {
      toast.error("Please provide a reason for declining this guarantor")
      return;
    }

    const payload = {
      reasonDeclined: reason,
      verificationStatus: "declined"
    }

    try {
      setIsDeclining(true);
      const res = await declineGuarantormutation.mutateAsync({ id, payload });
      if (res) {
        setIsDeclining(false);
        setFinalModalContent({
          title: "Declined",
          description: "You declined this guarantor, this user has the notified  the reason for the decline."
        })
        setshowFinalModal(true);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again")
    }
  };

  const approveGuarantormutation = useMutation(updateGuarantor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["adminGuarantor"]);
      queryClient.invalidateQueries([`guarantor-${id}`]);
      queryClient.invalidateQueries(["guarantor-stats"]);
    },
  });

  const declineGuarantormutation = useMutation(updateGuarantor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["adminGuarantor"]);
      queryClient.invalidateQueries([`guarantor-${id}`]);
      queryClient.invalidateQueries(["guarantor-stats"]);
    },
  });

  if (isLoading) return <PageLoader />
  if (error) return <div className='px-3 md:px-6 text-center text-lg mt-10'>Error fetching payment history</div>

  return (
    <>
      {
        showFinalModal ? <SuccessModal content={finalModalContent} closeModal={closeModal} /> :
          <div className='w-[500px]'>
            {
              step === 1 &&
              <>
                <h2 className='mb-5 text-3xl font-semibold'>Guarantor verification</h2>
                <div className="w-full rounded-xl border-[0.5px] border-[#B4B8BB]">
                  <div className="bg-[#EEEFF0] px-5 pt-5 rounded-t-xl w-full">
                    <a href={data.data.document_url} className='w-.datafull' target="_blank" rel="noopener noreferrer" download="Guarantor form">
                      <img src={convertToThumbnailUrl(data.data.document_url) || "/DocumentPrev.svg"} alt="" className="max-h-28 w-full" />
                    </a>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="font-bold text-sm">{data.data.name}</h2>
                        <span className={`px-3 mr-1 border py-1 rounded-lg text-xs ${data.data.verificationStatus === "verified" ? "text-[#036B26] bg-[#E7F6EC]" : data.data.verificationStatus === "failed" ? "bg-[#fde4dc] text-red-700" : "bg-[#FDF1DC] text-[#AD3307]"}`}>{data.data.verificationStatus}</span>
                      </div>
                      <span className="text-xs">{timeAgo(new Date(data.data.createdAt))}</span>
                    </div>
                  </div>
                </div>
              </>
            }
            {
              step === 2 &&
              <div className='space-y-1'>
                <h2 className='text-3xl font-semibold'>Decline Guarantor</h2>
                <p className='text-[#5A5C5E] text-base'>Provide the reason for declining this guarantor</p>
                <textarea placeholder='Enter a reason' className='text-[#5A5C5E] w-full focus:outline-none p-2 rounded-lg resize-none h-40 border border-[#D0D5DD]' value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
              </div>
            }
            <>
            </>
            <></>
            <div className="mt-5 flex justify-between">
              {
                data.data.verificationStatus === "verified" ?
                  <button
                    type='submit'
                    onClick={closeModal}
                    className='w-full bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
                  >
                    Dismiss
                  </button>
                  :
                  <>
                    {
                      step === 1 &&
                      <>
                        <button
                          type="button"
                          className="border border-primary font-medium px-10 rounded-lg"
                          onClick={handleNextStep}
                        >
                          Decline
                        </button>
                        <button
                          type='submit'
                          onClick={handleApproveGuarantor}
                          disabled={isApproving}
                          className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
                        >
                          {isApproving ? "Approving" : "Approve"}
                          <FaArrowRight />
                        </button>
                      </>
                    }
                    {
                      step === 2 &&
                      <>
                        <button
                          type="button"
                          className="border border-primary font-medium px-10 rounded-lg"
                          onClick={handlePreviousStep}
                        >
                          Back
                        </button>
                        <button
                          type='submit'
                          onClick={handleDeclineGuarantor}
                          disabled={isDeclining}
                          className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
                        >
                          {isDeclining ? "Proceeding" : "Proceed"}
                          <FaArrowRight />
                        </button>
                      </>
                    }
                  </>
              }
            </div>
          </div>
      }
    </>
  )
}


const SuccessModal = ({ content, closeModal }: { content: { title: string, description: string }, closeModal: () => void }) => {
  return (
    <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
      <img src="./Check.svg" alt="Guarantor added" className='w-52 h-52' />
      <div>
        <h3 className='font-bold text-2xl text-center'>
          Guarantor {content.title}
        </h3>
      </div>
      <p className='text-sm text-center'>
        {content.description}
      </p>
      <button
        onClick={closeModal}
        className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
      >
        Dismiss
        <FaArrowRight />
      </button>
    </div>
  )
}
