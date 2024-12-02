import { AxiosResponse } from 'axios';
import { userServices } from '../../../services/user';
import { useQuery } from 'react-query';
import { useAuth } from '../../../zustand/auth.store';
import BankCard, { BankCardType } from '../../../components/Bank/BankCard';
import { FiPlusCircle } from "react-icons/fi";
import { useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import AddPayoutBankForm from '../../../components/Bank/AddPayoutBankForm';

const fetchBanks = async () => {
  const res: AxiosResponse = await userServices.bank.getAllBanks(useAuth.getState().profile.id);
  return res.data;
};

const Bank = () => {
  const { data: banks, isLoading } = useQuery(['banks'], fetchBanks);
  const [showAddPayoutBankForm, setShowAddPayoutBankForm] = useState(false);

  return (
    <div>
      <div className='flex gap-3 justify-between items-center lg:w-fit lg:gap-8'>
        <h2 className='font-semibold text-xl'>Bank Information</h2>
        <p className='text-black/[42%]'>Add and Edit Bank Information</p>
      </div>
      <div className='space-y-5 my-5 p-5 md:w-[400px] rounded-lg border-[0.4px] border-[#A29999]'>
        <div className='flex items-center justify-between'>
          <h2 className='font-semibold text-lg'>Bank Information</h2>
          <button className='border border-primary rounded-lg py-1 px-3 flex items-center gap-1.5' onClick={() => setShowAddPayoutBankForm(true)}>
            <FiPlusCircle size={20} />
            Add
          </button>
        </div>
        <div className='text-[#5A5C5E] px-3 py-2 rounded-lg bg-[#0066FF0A]/[4%] text-sm'>
          <h3 className='text-primary font-bold'>Note</h3>
          <p>Ensure your name on your Ajosquad account is the same as your bank account details.</p>
        </div>
      </div>

      {
        isLoading ?
          <div className='flex justify-center'>
            <img src="./logo.png" alt="" className='h-20 w-20' />
          </div>
          :
          (
            banks?.length > 0 ?
              <div className='grid lg:grid-cols-3 gap-4 lg:gap-8'>
                {
                  banks.map((bank: BankCardType) => (
                    <BankCard
                      key={bank.id}
                      id={bank.id}
                      accountName={bank.accountName}
                      accountNumber={bank.accountNumber}
                      bankName={bank.bankName}
                      institutionNumber={bank.institutionNumber}
                      transitNumber={bank.transitNumber}
                    />
                  ))
                }
              </div>
              :
              <>No banks. Please add a bank</>
          )
      }
      <Modal open={showAddPayoutBankForm} onClick={() => setShowAddPayoutBankForm(false)}>
        <AddPayoutBankForm />
      </Modal>
    </div >
  )
}

export default Bank
