import { useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useClickOutside';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiBankFill } from 'react-icons/ri';
import Modal from '../Modal/Modal';
import EditPayoutBankForm from './EditPayoutBankForm';
import DeleteBank from './DeleteBank';

export type BankCardType = {
  id: string,
  accountName: string,
  bankName: string,
  accountNumber: string,
  institutionNumber: string,
  transitNumber: string
}


const BankCard = ({ id, accountName, bankName, accountNumber, institutionNumber, transitNumber }: BankCardType) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showEditBankInformationModal, setShowEditBankInformationModal] = useState(false);
  const [showDeleteBankModal, setShowDeleteBankModal] = useState(false);

  const optionsRef = useRef(null);

  useOnClickOutside(optionsRef,
    () => {
      setShowOptions(false);
    }
  );
  return (
    <div>
      <div className='relative border border-[#dbd6d6] p-5 rounded-lg w-full lg:max-w-[400px]'>
        <div className='flex justify-between mb-4'>
          <h2 className='font-semibold text-xl'>Payout Bank Account</h2>
          <div ref={optionsRef} className='relative w-10 h-10 flex items-center justify-center rounded border border-[#E4E7EC]'>
            <BsThreeDotsVertical onClick={() => setShowOptions(!showOptions)} className='w-5 h-5 cursor-pointer' />
            {
              showOptions && <div className='absolute -bottom-20 -left-20 flex flex-col gap-2 items-start bg-white pl-3 pr-14 py-3 rounded-md'>
                <button onClick={() => setShowEditBankInformationModal(true)}>Edit</button>
                <button onClick={() => setShowDeleteBankModal(true)}>Delete</button>
              </div>
            }
          </div>
        </div>
        <div className='text-[#5A5C5E] px-3 py-2 rounded-lg bg-[#0066FF0A]/[4%]'>
          <div className='flex justify-between items-center'>
            <h2 className='text-[#5A5C5E] font-medium'>{bankName}</h2>
            <RiBankFill className='text-[#A0A3A6] h-5 w-5' />
          </div>
          <div className='space-y-0.5 my-2'>
            <div className='text-sm flex gap-3'>
              <h3>Account Name: </h3>
              <p className='font-bold'>{accountName}</p>
            </div>
            <div className='text-sm flex gap-3'>
              <h3>Account Number: </h3>
              <p className='font-bold'>{accountNumber}</p>
            </div>
            <div className='text-sm flex gap-3'>
              <h3>Institution Number: </h3>
              <p className='font-bold'>{institutionNumber}</p>
            </div>
            <div className='text-sm flex gap-3'>
              <h3>Transit Number: </h3>
              <p className='font-bold'>{transitNumber}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal open={showEditBankInformationModal} onClick={() => setShowEditBankInformationModal(false)}>
        <EditPayoutBankForm bankId={id} closeModal={() => setShowEditBankInformationModal(false)} />
      </Modal>
      <Modal open={showDeleteBankModal} onClick={() => setShowDeleteBankModal(false)}>
        <DeleteBank bankId={id} closeModal={() => setShowDeleteBankModal(false)} />
      </Modal>
    </div>
  )
}

export default BankCard