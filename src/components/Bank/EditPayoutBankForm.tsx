import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import * as Yup from "yup";
import { userServices } from '../../services/user';
import { Form, Formik } from 'formik';
import TextInput from '../FormInputs/TextInput2';
import { FaArrowRight } from 'react-icons/fa6';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { banks } from '../../utils/banks';

const updateBankInformation = async ({ bankId, payload }: { bankId: string, payload: any }) => {
  const res: AxiosResponse = await userServices.bank.updateBank(bankId, payload)
  return res.data
};

const EditPayoutBankForm = ({ bankId, closeModal }: { bankId: string, closeModal: () => void }) => {
  const [initialValues, setInitialValues] = useState<any>(null);
  const [hasUpdated, setHasUpdated] = useState(false);
  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    bankName: Yup.string()
      .trim()
      .required("*Bank Name is required"),
    accountName: Yup.string()
      .trim()
      .required("*Account Name is required"),
    institutionNumber: Yup.string()
      .trim()
      .required("*Institution Number is required"),
    transitNumber: Yup.string()
      .trim()
      .required("*Transit Number is required"),
    accountNumber: Yup.string()
      .trim()
      .required("*Account Number is required")
  });

  useEffect(() => {
    const fetchUserBank = async () => {
      const res: AxiosResponse = await userServices.bank.getBank(bankId);
      const userBankInformation = res.data;
      setInitialValues({
        bankName: userBankInformation.bankName || "",
        accountName: userBankInformation.accountName || "",
        institutionNumber: userBankInformation.institutionNumber || "",
        transitNumber: userBankInformation.transitNumber || "",
        accountNumber: userBankInformation.accountNumber || ""
      })
    }
    fetchUserBank();
  }, [])

  const mutation = useMutation(updateBankInformation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userBanks"]);
    },
  });

  if (!initialValues) {
    return (
      <div className='w-[350px] h-[400px] md:w-[600px] flex items-center justify-center'>
        <img src="./logo.png" alt="" className='h-20 w-20' />
      </div>
    )
  }

  return (
    <>
      {
        hasUpdated ?
          <div className='md:w-[550px] lg:w-full flex flex-col items-center gap-5'>
            <img src="/Bank.svg" alt="Delete bank" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Bank Information Updated
              </h3>
            </div>
            <p className='text-sm text-center'>
              You have successfully updated your bank information.
            </p>
            <button
              type='button'
              onClick={closeModal}
              className='bg-primary w-full font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Dismiss
              <FaArrowRight />
            </button>
          </div>
          :
          <div className='flex flex-col gap-2 w-[350px] md:w-[600px]'>
            <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold">
              Edit Payout Bank Information
            </h1>
            <p>
              Edit Bank Information
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                console.log(values)
                if (values) {
                  const payload = {
                    bankName: values.bankName,
                    accountName: values.accountName,
                    institutionNumber: values.institutionNumber,
                    transitNumber: values.transitNumber,
                    accountNumber: values.accountNumber
                  }
                  try {
                    const res = await mutation.mutateAsync({ bankId, payload });
                    if (res) {
                      setHasUpdated(true);
                    }
                  } catch (error) {
                    toast.error("Failed to update user bank details")
                  }
                }
              }}
            >
              {({ isSubmitting, setValues }) => (
                <Form className='flex flex-col gap-1.5'>
                  <div className='flex flex-col w-full text-xs md:text-sm lg:text-base'>
                    <label className='font-normal text-sm font-satoshiRegular capitalize mb-1.5'>Select Bank*</label>
                    <select defaultValue={initialValues.bankName} name='bankName' onChange={(e) => setValues((prevValues: any) => ({ ...prevValues, bankName: e.target.value, institutionNumber: banks.docs.find((bank: any) => bank.bankName === e.target.value)?.instituitionCode || '' }))} className='w-full h-[44px] py-2.5 focus:outline-none px-3 rounded-lg bg-white border'>
                      <option disabled value="">Select Bank</option>
                      {
                        banks.docs.map((bank: any) => (
                          <option key={bank._id} value={bank.bankName}>{bank.bankName}</option>
                        ))
                      }
                    </select>
                  </div>
                  <TextInput
                    name='accountName'
                    type='text'
                    label="Account Name*"
                    placeholder='Account Name'
                  />
                  <TextInput
                    name='institutionNumber'
                    type='text'
                    readonly
                    disabled
                    label="Institution Number*"
                    placeholder='Institution Number'
                  />
                  <TextInput
                    name='transitNumber'
                    type='text'
                    label="Transit Number*"
                    placeholder='Transit Number'
                  />
                  <TextInput
                    name='accountNumber'
                    type='text'
                    label="Account Number"
                    placeholder='Account Number'
                  />
                  <div className="my-3 flex justify-between">
                    <button
                      type="button"
                      className="border border-primary font-medium px-10 rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
                    >
                      {isSubmitting ? "Proceeding" : "Proceed"}
                      <FaArrowRight />
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
      }
    </>
  )
}

export default EditPayoutBankForm