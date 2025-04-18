import { useState } from 'react';
import { formatDate2 } from '../../../utils/formatTime';
import Modal from '../../../components/Modal/Modal';

const ContractAgreement = () => {
  const [showContractModal, setShowContractModal] = useState(false);
  return (
    <div>
      <div className='flex gap-3 items-center lg:w-fit lg:gap-8'>
        <h2 className='font-semibold md:text-lg lg:text-xl'>Contract Agreement </h2>
        <p className='text-black/[42%] text-sm lg:text-base'>A copy of your contract agreement is provided below</p>
      </div>
      <div className='my-5'>
        <div onClick={() => setShowContractModal(true)} className="cursor-pointer rounded-xl border-[0.5px] border-[#B4B8BB] max-w-[319px]">
          <div className="bg-[#EEEFF0] px-5 pt-5 rounded-t-xl">
            <img src="/DocumentPrev.svg" alt="" />
          </div>
          <div className="px-4 py-3 flex justify-between">
            <div>
              <h2 className="font-bold text-sm">Ajosquad Contract Agreement</h2>
              <span className="text-xs">Signed at {formatDate2(new Date().toString())}</span>
            </div>
          </div>
        </div>
      </div>
      <Modal open={showContractModal} onClick={() => setShowContractModal(false)}>
        <div className='max-w-[600px] px-5 py-2'>
          <h3 className='text-center font-medium text-2xl text-[#2B2C34]'>AjoSquad Contract Agreement.</h3>
          <div className='flex flex-col gap-1 my-5'>
            <p>
              At Ajosquad, we prioritize the safety and confidentiality of your personal information. Rest assured, we do not conduct credit checks. Your data will be handled with the utmost care and will only be used for the purpose of providing our services.
            </p>
            <p>
              Our robust security measures and encryption protocols are in place to safeguard your information from unauthorized access. If you have any questions or concerns about our privacy practices, please don't hesitate to contact us.
            </p>
            <p>
              It is important to note that it is your responsibility to inform us of any changes in your personal information. Whether it's a change in address, contact number, or any other details, please notify us promptly to ensure the accuracy and security of your account.
            </p>
            <p className='mt-5'>
              Thank you for entrusting us with your financial journey.
            </p>
          </div>
          <div className="my-5 w-full flex justify-between">
            <button
              onClick={() => setShowContractModal(false)}
              className="border border-red-500 text-red-500 font-medium px-5 rounded-lg"
            >
              Close
            </button>
            <button
              className='bg-primary font-semibold px-5 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Agree and Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ContractAgreement