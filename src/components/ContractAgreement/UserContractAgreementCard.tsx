import { useState } from "react";
import { timeAgo } from "../../utils/formatTime";
import { convertToThumbnailUrl } from "../../utils/helpers";
import Modal from "../Modal/Modal";
import { contractAgreementServices } from "../../services/contract-agreement";
import toast from "react-hot-toast";

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
      toast.success(res.message);
      setIsAgreeing(false);
      setShowModal(false);
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
              {isAgreeing? "Agreeing..." : "Agree and Confirm"}
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

  const handleOpenIframe = () => setIframeVisible(true);
  const handleCloseIframe = () => setIframeVisible(false);

  return (
    <div>
      <div className="bg-[#EEEFF0] px-5 pt-5 rounded-t-xl">
        <img onClick={handleOpenIframe} src={previewImageUrl || "/DocumentPrev.svg"} alt="" className="max-h-28 w-full cursor-pointer" />
      </div>
      {isIframeVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <button
            onClick={handleCloseIframe}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '10px 15px',
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              zIndex: 1001,
            }}
          >
            Close
          </button>
          <iframe
            src={url}
            title="Fullscreen Iframe"
            style={{
              width: '90%',
              height: '90%',
              border: 'none',
              borderRadius: '10px',
            }}
          />
        </div>
      )}
    </div>
  );
};

