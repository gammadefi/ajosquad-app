import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import * as Yup from "yup";
import { userServices } from '../../services/user';
import { useAuth } from '../../zustand/auth.store';
import { Form, Formik } from 'formik';
import TextInput from '../FormInputs/TextInput2';
import { FaArrowRight } from 'react-icons/fa6';

const EditPayoutBankForm = ({ bankId }: { bankId: string }) => {
  const [initialValues, setInitialValues] = useState<any>(null);
  const [hasUpdated, setHasUpdated] = useState(false);

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
      const res: AxiosResponse = await userServices.bank.getBank(useAuth.getState().profile.id, bankId);
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
            <img src="./Bank.svg" alt="Delete bank" className='w-52 h-52' />
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
                if (values) {
                  const payload = {
                    bankName: values.bankName,
                    accountName: values.accountName,
                    institutionNumber: values.institutionNumber,
                    transitNumber: values.transitNumber,
                    accountNumber: values.accountNumber
                  }
                  try {

                  } catch (error) {

                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className='flex flex-col gap-1.5'>
                  <TextInput
                    name='bankName'
                    type='text'
                    label="Select Bank*"
                    placeholder='Select Bank'
                  />
                  <TextInput
                    name='accountName'
                    type='text'
                    label="Account Name*"
                    placeholder='Account Name'
                  />
                  <TextInput
                    name='institutionNumber'
                    type='text'
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