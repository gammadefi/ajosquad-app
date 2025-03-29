import { useState } from "react";
import { timeAgo } from "../../utils/formatTime";
import { convertToThumbnailUrl } from "../../utils/helpers";
import Modal from "../Modal/Modal";
import { contractAgreementServices } from "../../services/contract-agreement";
import toast from "react-hot-toast";
import { useAuth } from "../../zustand/auth.store";

export type ContractAgreementCardProps = {
  id: string,
  name: string,
  imgUrl: string,
  uploadDate: string
}

const ContractAgreementCard = ({ id, imgUrl, name, uploadDate }: ContractAgreementCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isAgreeing, setIsAgreeing] = useState(false);
 


  const handleAgreeToContractAgreement = async () => {
    setIsAgreeing(true);
    try {
      const res = await contractAgreementServices.user.agreeOrRejectContractAgreement(id, { option: true });
      if (res) {
        toast.success(res.message);
        setIsAgreeing(false);
        setShowModal(false);
      }
    } catch (error) {
      toast.error("An error occurred while agreeing to contract agreement");
      setIsAgreeing(false);
    }
  }

  return (
    <>
      <div className="rounded-xl border-[0.5px] border-[#B4B8BB]  w-full md:max-w-[319px]">
        <FullscreenIframe url={imgUrl} />
        <div className="cursor-pointer px-4 py-3 flex flex-col justify-between" onClick={() => setShowModal(true)}>
          <h2 className="font-bold text-sm">{name}</h2>
          <span className="text-xs">{timeAgo(new Date(uploadDate))}</span>
        </div>
      </div>
      <Modal open={showModal} onClick={() => setShowModal(false)}>
        <div className='space-y-10 max-w-[600px] p-2'>
          <h3 className='text-center font-medium text-2xl text-[#2B2C34]'>{name}</h3>
          <div className="w-full flex justify-between">
            <button
              onClick={() => setShowModal(false)}
              className="border border-red-500 text-red-500 font-medium px-5 rounded-lg"
            >
              Close
            </button>
            <button
              disabled={isAgreeing}
              onClick={handleAgreeToContractAgreement}
              className='bg-primary font-semibold px-5 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              {isAgreeing ? "Agreeing..." : "Agree and Confirm"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ContractAgreementCard

const FullscreenIframe = ({ url }: { url: string }) => {
  const [isIframeVisible, setIframeVisible] = useState(false);
  const previewImageUrl = convertToThumbnailUrl(url);
  const profile: any = useAuth((s) => s.profile);
  
  const handleOpenIframe = () => setIframeVisible(true);
  const handleCloseIframe = () => setIframeVisible(false);

  return (
    <div>
      <div className="bg-[#EEEFF0] px-5 pt-5 rounded-t-xl">
        <img onClick={handleOpenIframe} src={previewImageUrl || "/DocumentPrev.svg"} alt="" className="max-h-28 w-full cursor-pointer" />
      </div>
      {isIframeVisible && (
        <Modal open={isIframeVisible} onClick={handleCloseIframe} showCloseButton={true}>
          <div className='p-6 overflow-y-auto h-[90vh] lg:max-w-[80vw]'>
            <h2 className='text-xl font-bold mb-4'>Client Agreement Form</h2>
            <p>This agreement ("Agreement") is entered into between <span className="font-semibold">{profile.firstName} {profile.lastName}</span> ("Client") and Ajosquad ("Ajo Squad") with an address at 918 EVERGREEN BLVD SASKATOON, SK, CA S7W0N6, for the purpose of participating in Ajo Squad's savings Squad ("Squad").</p>
            <ul className='list-disc pl-5 mt-4'>
              <li>Membership: The Client must be 18 years or older and legally allowed to enter into a binding agreement to use the Ajosquad platform. By signing this agreement, the Client agrees to the terms and conditions set forth in this Agreement.</li>
              <li>Squad Formation: The Client hereby commits to engaging in the Squad in accordance with its established rules. Each Squad, comprising 10 members, will operate on a 5-month life cycle. The Client acknowledges and accepts bi-weekly debits (a total of 10 debits) from their account during the Squad's duration. The Client retains the privilege to join multiple Squads based on their saving capacity, and in line with their financial goals.</li>
              <li>Payment processing: Client bank account will be debited by our payment processing partners “Gocardless” and according to standard payment processing times, there will be a delay of 3 working days from when the client account will be debited to when payment is received to commence payout.</li>
              <li>NFS charge: Payments are processed through the Client's bank account and several reminders will be sent to fund account as required. In the event that funds are not made available for debit and the debit payment is returned, the normal bank charge of $45 will be applied by your bank. We will not be taking any charges. Clients will be notified well ahead of time about the intended debit dates, ensuring transparency and providing ample opportunity for necessary account arrangements.</li>
              <li>Fees: Ajosquad charges a fee of 2% for the use of the platform, which is deducted from the pooled funds upon receiving the payout. There will also be a subscription fee (which is currently set at $0). Client will be notified when the subscription fee of $0 changes.</li>
              <li>Withdrawal: If the Client opts to withdraw from participation after the cycle has commenced, a termination charge equivalent to 5% of the payout lump sum will apply and client will be refunded all they have paid less the charges. However, clients are eligible for withdrawal only if they have not yet received the payout.</li>
              <li>Late Payment and Missed Payments: Late payment attracts penalties of 10% of the Late amount. Missed payments will be reported to the credit bureau. If left unpaid the debt will be handed over to collectors to facilitate collection.</li>
              <li>Pooled Funds: The pooled funds belong to the Squad as a whole and are distributed according to the predetermined schedule and order. The Client must wait for their turn to receive the funds and cannot withdraw them prematurely.</li>
              <li>Communication: The Client is encouraged to communicate with Ajosquad Support team and keep them informed about any changes or issues that may affect the Squad's savings cycle such as job loss. Ajosquad provides a responsive email, WhatsApp and chat engine that can be used for communication purposes.</li>
              <li>Termination: Ajosquad reserves the right to suspend or terminate a Squad or a Client's membership for violating the rules and regulations of the platform or engaging in fraudulent activities.</li>
              <li>Governing Law and Jurisdiction: This Agreement shall be governed by and construed in accordance with the laws of Canada. Any disputes arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts of Canada.</li>
              <li>Duration of Agreement: This Agreement shall remain in effect for the entire duration of the member's participation in Ajosquad, encompassing all transactions, contributions, and activities conducted with the platform, irrespective of the cycle and shall continue to govern the relationship between the client and Ajosquad unless otherwise terminated in accordance with the terms specified herein or by mutual written consent of both parties.</li>
              <li>Amendments: Ajosquad reserves the right to amend or modify the terms and conditions of this Agreement at any time, and such changes will be communicated to the Client via email, client portal or the Ajosquad website.</li>
            </ul>
            {/* <div className='mt-4'>
                    <input type='checkbox' id='agreement' name='agreement' />
                    <label htmlFor='agreement' className='ml-2'>Click the checkbox to confirm you have read the agreements</label>
                  </div> */}
            <div className='flex justify-end mt-6'>
              <button
                onClick={handleCloseIframe}
                className='py-2 px-4 bg-white rounded-md mr-2'
              >
                Close
              </button>
              {/* <button
                onClick={() => handleAgreeToContractAgreement(contractAgreements.data.find((contract: any) => contract.productType === "Ajosquad").id)}
                disabled={isAgreeing}
                className='py-2 px-4 rounded-md disabled:cursor-not-allowed disabled:bg-primary/50 bg-primary text-white font-medium'
              >
                Agree
              </button> */}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

