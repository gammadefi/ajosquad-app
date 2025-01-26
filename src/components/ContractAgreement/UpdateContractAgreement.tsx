import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react'
import * as Yup from "yup";
import { FaArrowRight } from 'react-icons/fa6';
import FileUpload from '../FormInputs/FIleUpload2';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { getFileSize, truncateString } from '../../utils/helpers';
import { contractAgreementServices } from '../../services/contract-agreement';
import PageLoader from '../spinner/PageLoader';

const UpdateContractAgreement = ({ closeModal, contractorAgreementId }: { closeModal: () => void, contractorAgreementId: string }) => {
  const [initialValues, setInitialValues] = useState<any>(null);
  const [fileSize, setFileSize] = useState<string>('');
  const [showFileUploadInput, setShowFileUploadInput] = useState(false);
  const [hasUpdatedContract, setHasUpdatedContract] = useState(false);

  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    productType: Yup.string()
      .trim()
      .required("*Field is required")
      .oneOf(["Ajosquad", "Ajohome"], "Invalid selection"),
    contractDocumentURL: Yup.string()
      .required("*Document is required"),
  });

  useEffect(() => {
    const fetchContract = async () => {
      const res: AxiosResponse = await contractAgreementServices.admin.getContractAgreement(contractorAgreementId);
      const contractInformation = res.data;
      setInitialValues({
        productType: contractInformation.productType || "",
        contractDocumentURL: contractInformation.agreement_url || ""
      })

      const res2 = await getFileSize(contractInformation.agreement_url);
      setFileSize(res2);
    }
    fetchContract();
  }, [])

  const mutation = useMutation(
    async ({ contractorAgreementId, payload }: { contractorAgreementId: string, payload: any }) => {
      const res: AxiosResponse = await contractAgreementServices.admin.updateContractAgreement(contractorAgreementId, payload)
      return res.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["contractAgreements"]);
      },
    }
  );

  if (!initialValues) return <PageLoader />

  return (
    <>
      {
        hasUpdatedContract ?
          <SuccessModal closeModal={closeModal} />
          :
          <div className='md:w-[600px]'>
            <h2 className='mb-5 text-3xl font-semibold'>Update Contract Agreement</h2>
            <div>
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
                      const res = await mutation.mutateAsync({ contractorAgreementId, payload });
                      if (res) {
                        setHasUpdatedContract(true);
                      }
                    } catch (error) {
                      toast.error("Failed to update contract")
                    }
                  }
                }}
              >
                {({ isSubmitting }) => {
                  return (
                    <Form className='max-h-[500px] overflow-scroll flex flex-col gap-4 my-3'>
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
                        <div className='flex justify-between items-center py-2 px-3 border border-primary rounded-lg'>
                          <p>{truncateString(initialValues.contractDocumentURL, 30)} {fileSize}Kb</p>
                          <span onClick={() => setShowFileUploadInput(!showFileUploadInput)} className='cursor-pointer px-3 py-0.5 border rounded-lg text-red-500 bg-red-100'>Replace</span>
                        </div>
                        {
                          showFileUploadInput &&
                          <FileUpload name='contractDocumentURL' fileType='document' />
                        }
                      </div>
                      <div className='mt-5 flex justify-between'>
                        <button
                          onClick={closeModal}
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
                            isSubmitting ? "Updating" : "Update"
                          }
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div >
      }
    </>
  )
}

export default UpdateContractAgreement


const SuccessModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
      <img src="./Check.svg" alt="Guarantor added" className='w-52 h-52' />
      <div>
        <h3 className='font-bold text-2xl text-center'>
          Contract Agreement updated
        </h3>
      </div>
      <p className='text-sm text-center'>
        Contract Agreement has been successfully updated
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