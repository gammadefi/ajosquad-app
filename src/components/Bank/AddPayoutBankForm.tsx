import * as Yup from "yup";
import { userServices } from '../../services/user';
import { useAuth } from '../../zustand/auth.store';
import { Form, Formik } from 'formik';
import TextInput from '../FormInputs/TextInput2';
import { FaArrowRight } from 'react-icons/fa6';
import { useState } from "react";
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

const updateBankInformation = async ({ payload }: { payload: any }) => {
  const res: AxiosResponse = await userServices.bank.createBank(useAuth.getState().profile.id, payload)
  return res.data
};

const AddPayoutBankForm = () => {
  const [hasAddedBank, setHasAddedBank] = useState(false);
  const queryClient = useQueryClient()

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

  const initialValues = {
    bankName: "",
    accountName: "",
    institutionNumber: "",
    transitNumber: "",
    accountNumber: ""
  }

  const mutation = useMutation(updateBankInformation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["banks"]);
    },
  });

  return (
    <>
      {
        hasAddedBank ?
          <div className='md:w-[550px] lg:w-full flex flex-col items-center gap-5'>
            <img src="./Bank.svg" alt="Delete bank" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Bank Added
              </h3>
            </div>
            <p className='text-sm text-center'>
              You have successfully added your bank to your account.
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
              Add Payout Bank Information
            </h1>
            <p className="md:text-xl font-bold">
              Provide Bank Information
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
                    const res = await mutation.mutateAsync({ payload });
                    if (res) {
                      setHasAddedBank(true);
                    }
                  } catch (error) {
                    console.log(error)
                    toast.error("Failed to add a bank")
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

export default AddPayoutBankForm