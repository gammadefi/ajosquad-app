import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react'
import * as Yup from "yup";
import { FaArrowRight } from 'react-icons/fa6';
import FileUpload from '../FormInputs/FIleUpload2';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { contractAgreementServices } from '../../services/contract-agreement';

const AddContractAgreementForm = ({ closeModal }: { closeModal: () => void }) => {
  const [hasAddedContract, setHasAddedContract] = useState(false);
  const [showConfirmUpload, setShowConfirmUpload] = useState(false);

  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    productType: Yup.string()
      .trim()
      .required("*Field is required")
      .oneOf(["Ajosquad", "Ajohome"], "Invalid selection"),
    contractDocumentURL: Yup.string()
      .required("*Document is required"),
  });

  const initialValues = {
    productType: "",
    contractDocumentURL: ""
  };

  const mutation = useMutation(
    async ({ payload }: { payload: any }) => {
      const res: AxiosResponse = await contractAgreementServices.admin.createContractAgreement(payload)
      return res.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["contractAgreements"]);
      },
    });

  return (
    <>
      {
        hasAddedContract ?
          <SuccessModal closeModal={closeModal} />
          :
          <div className='w-[90vw] md:w-[600px]'>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                if (values) {
                  const payload = {
                    "productType": values.productType,
                    "agreement_url": values.contractDocumentURL
                  }
                  try {
                    const res = await mutation.mutateAsync({ payload });
                    console.log(res);
                    if (res) {
                      setHasAddedContract(true);
                    }
                  } catch (error) {
                    toast.error("Failed to add contract agreement");
                  }
                }
              }}
            >
              {({ isSubmitting }) => {
                return (
                  <Form className='max-h-[500px] overflow-scroll flex flex-col gap-4 mb-3'>
                    <>
                      <h2 className='text-3xl font-semibold'>Upload Contract Agreement</h2>
                      <div className='flex flex-col w-full text-xs md:text-sm lg:text-base'>
                        <label className='font-normal text-sm font-satoshiRegular capitalize mb-1.5'>Select Permission Type*</label>
                        <Field as="select" name='productType' className='w-full h-[44px] py-2.5 focus:outline-none px-3 rounded-lg bg-white border'>
                          <option value="">Select Product*</option>
                          <option value="Ajohome">Ajohome</option>
                          <option value="Ajosquad">Ajosquad</option>
                        </Field>
                        <ErrorMessage name="productType" component="div" className='text-red-500' />
                      </div>
                      <div className='space-y-1'>
                        <label htmlFor="contractDocumentURL">Uploaded Contract Agreement</label>
                        <FileUpload allowWordDocument={true} name='contractDocumentURL' fileType='document' />
                      </div>
                    </>
                    <div className='mt-5 flex justify-between'>
                      <button
                        onClick={closeModal}
                        type="button"
                        className="border border-red-500 text-red-500 font-medium px-10 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className='bg-primary font-semibold rounded-lg text-white inline-flex items-center gap-3 justify-center text-center py-3 px-10 disabled:bg-opacity-50'
                      >
                        {
                          isSubmitting ? "Uploading and Publishing" : "Upload and Publish"
                        }
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
      }
    </>
  )
}

export default AddContractAgreementForm;


const SuccessModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
      <img src="./Check.svg" alt="Guarantor added" className='w-52 h-52' />
      <div>
        <h3 className='font-bold text-2xl text-center'>
          Contract Agreement Published!
        </h3>
      </div>
      <p className='text-sm text-center'>
        You've successfully upload and publish the ajosquad product contract agreement.
      </p>
      <button
        onClick={closeModal}
        className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
      >
        Dismiss
        <FaArrowRight />
      </button>
    </div>
  )
}