import { BsThreeDotsVertical } from "react-icons/bs"
import { timeAgo } from "../../utils/formatTime"
import useOnClickOutside from "../../hooks/useClickOutside"
import { useRef, useState } from "react"
import Modal from "../Modal/Modal"
import UpdateGuarantorForm from "./UpdateGuarantorForm"
import { convertToThumbnailUrl } from "../../utils/helpers"
import DeleteGuarantor from "./DeleteGuarantor"

export type GuarantorCardProps = {
  id: string,
  name: string,
  imgUrl: string,
  verificationStatus: string,
  uploadDate: string,
  refetch?: () => void
}

const GuarantorCard = ({ id, imgUrl, name, verificationStatus, uploadDate, refetch }: GuarantorCardProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showUpdateGuarantorInformationModal, setShowUpdateGuarantorInformationModal] = useState(false);
  const [showDeleteGuarantorModal, setShowDeleteGuarantorModal] = useState(false);
  const previewImageUrl = convertToThumbnailUrl(imgUrl);

  const optionsRef = useRef(null);

  useOnClickOutside(optionsRef,
    () => {
      setShowOptions(false);
    }
  );
  return (
    <>
      <div className="rounded-xl border-[0.5px] border-[#B4B8BB]  w-full md:max-w-[319px]">
        <div className="bg-[#EEEFF0] px-5 pt-5 rounded-t-xl">
          <a href={imgUrl} target="_blank" rel="noopener noreferrer" download="Guarantor form">
            <img src={previewImageUrl || "/DocumentPrev.svg"} alt="" className="max-h-28 w-full" />
          </a>
        </div>
        <div className="px-4 py-3 flex justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-sm">{name}</h2>
              <span className={`px-3 mr-1 border py-1 rounded-lg text-xs ${verificationStatus === "verified" ? "text-[#036B26] bg-[#E7F6EC]" : verificationStatus === "failed" ? "bg-[#fde4dc] text-red-700" : "bg-[#FDF1DC] text-[#AD3307]"}`}>{verificationStatus}</span>
            </div>
            <span className="text-xs">{timeAgo(new Date(uploadDate))}</span>
          </div>
          <div ref={optionsRef} className='relative w-10 h-10 flex items-center justify-center rounded border border-[#E4E7EC]'>
            <BsThreeDotsVertical onClick={() => setShowOptions(!showOptions)} className='w-5 h-5 cursor-pointer' />
            {
              showOptions && <div className='absolute -top-20 -left-20 flex flex-col gap-2 items-start bg-white pl-3 pr-14 py-3 rounded-md'>
                <button onClick={() => setShowUpdateGuarantorInformationModal(true)}>Edit</button>
                <button onClick={() => setShowDeleteGuarantorModal(true)}>Delete</button>
              </div>
            }
          </div>
        </div>
      </div>
      <Modal open={showUpdateGuarantorInformationModal} onClick={() => setShowUpdateGuarantorInformationModal(false)}>
        <UpdateGuarantorForm
          closeModal={() => {
            setShowUpdateGuarantorInformationModal(false);
            if (refetch) {
              refetch();
            }
          }}
          guarantorId={id}
        />
      </Modal>
      <Modal open={showDeleteGuarantorModal} onClick={() => setShowDeleteGuarantorModal(false)}>
        <DeleteGuarantor guarantorId={id} />
      </Modal>
    </>
  )
}

export default GuarantorCard