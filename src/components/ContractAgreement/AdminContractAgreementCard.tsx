import { BsThreeDotsVertical } from "react-icons/bs"
import { timeAgo } from "../../utils/formatTime"
import useOnClickOutside from "../../hooks/useClickOutside"
import { useRef, useState } from "react"
import { convertToThumbnailUrl } from "../../utils/helpers"
import Modal from "../Modal/Modal"
import DeleteContractAgreement from "./DeleteContractAgreement"
import UpdateContractAgreement from "./UpdateContractAgreement"

export type ContractAgreementCardProps = {
  id: string,
  name: string,
  imgUrl: string,
  uploadDate: string
}

const ContractAgreementCard = ({ id, imgUrl, name, uploadDate }: ContractAgreementCardProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showUpdateContractAgreementModal, setShowUpdateContractAgreementModal] = useState(false);
  const [showDeleteContractAgreementModal, setShowDeleteContractAgreementModal] = useState(false)

  const optionsRef = useRef(null);

  useOnClickOutside(optionsRef,
    () => {
      setShowOptions(false);
    }
  );
  return (
    <>
      <div className="rounded-xl border-[0.5px] border-[#B4B8BB]  w-full md:max-w-[319px]">
        <FullscreenIframe url={imgUrl} />
        <div className="px-4 py-3 flex justify-between">
          <div>
            <h2 className="font-bold text-sm">{name}</h2>
            <span className="text-xs">{timeAgo(new Date(uploadDate))}</span>
          </div>
          <div ref={optionsRef} className='relative w-10 h-10 flex items-center justify-center rounded border border-[#E4E7EC]'>
            <BsThreeDotsVertical onClick={() => setShowOptions(!showOptions)} className='w-5 h-5 cursor-pointer' />
            {
              showOptions && <div className='absolute -top-20 -left-20 flex flex-col gap-2 items-start bg-white pl-3 pr-14 py-3 rounded-md'>
                <button onClick={() => setShowUpdateContractAgreementModal(true)}>Edit</button>
                <button onClick={() => setShowDeleteContractAgreementModal(true)}>Delete</button>
              </div>
            }
          </div>
        </div>
      </div>
      <Modal open={showUpdateContractAgreementModal} onClick={() => setShowUpdateContractAgreementModal(false)}>
        <UpdateContractAgreement closeModal={() => setShowUpdateContractAgreementModal(false)} contractorAgreementId={id} />
      </Modal>
      <Modal open={showDeleteContractAgreementModal} onClick={() => setShowDeleteContractAgreementModal(false)}>
        <DeleteContractAgreement contractorAgreementId={id} closeModal={() => setShowDeleteContractAgreementModal(false)} />
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

