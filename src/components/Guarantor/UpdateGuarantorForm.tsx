import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react'
import * as Yup from "yup";
import TextInput from '../FormInputs/TextInput2';
import { FaArrowRight } from 'react-icons/fa6';
import FileUpload from '../FormInputs/FIleUpload2';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { guarantorServices } from '../../services/guarantor';
import { getFileSize, truncateString } from '../../utils/helpers';

const updateGuarantor = async ({ guarantorId, payload }: { guarantorId: string, payload: any }) => {
  const res: AxiosResponse = await guarantorServices.updateGuarantor(guarantorId, payload)
  return res.data
};

const UpdateGuarantorForm = ({ closeModal, guarantorId }: { closeModal: () => void, guarantorId: string }) => {
  const [initialValues, setInitialValues] = useState<any>(null);
  const [fileSize, setFileSize] = useState<string>('');
  const [showFileUploadInput, setShowFileUploadInput] = useState(false);
  const [hasUpdatedGuarantor, setHasUpdatedGuarantor] = useState(false);
  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("*Full Name is required"),
    email: Yup.string()
      .trim()
      .email("*Email must be a valid address")
      .required("*Email is required"),
    squad: Yup.string()
      .trim()
      .required("*Squad is required"),
    guarantorDocument: Yup.string().url("Must be a valid url")
      .required("*Guarantor Document is required"),
    identityDocument: Yup.string().url("Must be a valid url")
      .required("*Identity Document is required"),
    workIdentityDocument: Yup.string().url("Must be a valid url")
      .required("*Work Identity Document is required")
  });

  useEffect(() => {
    const fetchUserBank = async () => {
      const res: AxiosResponse = await guarantorServices.getGuarantor(guarantorId);
      const guarantorInformation = res.data;
      setInitialValues({
        name: guarantorInformation.name || "",
        email: guarantorInformation.email || "",
        guarantorDocument: guarantorInformation.document_url || "",
        identityDocument: guarantorInformation.id_url || "",
        workIdentityDocument: guarantorInformation.employmentDocument_url || ""
      })

      const res2 = await getFileSize(guarantorInformation.document_url);
      setFileSize(res2);
    }
    fetchUserBank();
  }, [])

  const mutation = useMutation(updateGuarantor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["guarantors"]);
    },
  });

  if (!initialValues) {
    return (
      <div className='w-[350px] h-[400px] md:w-[600px] flex items-center justify-center'>
        <img src="/logo.png" alt="" className='h-20 w-20' />
      </div>
    )
  }

  return (
    <>
      {
        hasUpdatedGuarantor ?
          <SuccessModal closeModal={closeModal} />
          :
          <div className='md:w-[600px]'>
            <h2 className='mb-5 text-3xl font-semibold'>Update Guarantor</h2>
            <div>
              <h4 className='font-medium text-lg mb-2'>Guarantor Information</h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  if (values) {
                    const payload = {
                      "name": values.name,
                      "email": values.email,
                      "id_url": values.identityDocument,
                      "employmentDocument_url": values.workIdentityDocument,
                      "document_url": values.guarantorDocument
                    }
                    try {
                      const res = await mutation.mutateAsync({ guarantorId, payload });
                      if (res) {
                        setHasUpdatedGuarantor(true);
                      }
                    } catch (error) {
                      toast.error("Failed to update guarantor")
                    }
                  }
                }}
              >
                {({ values, isSubmitting }) => {
                  return (
                    <Form className='max-h-[500px] overflow-scroll flex flex-col gap-4 my-3'>
                      <TextInput
                        name='name'
                        label="Name"
                        placeholder='John Doe'
                        disable={true}
                      />
                      <TextInput
                        name='email'
                        type='email'
                        label="Email"
                        placeholder='linda@framcreative.com'
                      />
                      <div className='space-y-1'>
                        <label htmlFor="guarantorDocument">Uploaded Guarantor letter or approval document</label>
                        <div className='flex justify-between items-center py-2 px-3 border border-primary rounded-lg'>
                          <p>{truncateString(initialValues.guarantorDocument, 30)} {fileSize}Kb</p>
                          <span onClick={() => setShowFileUploadInput(!showFileUploadInput)} className='cursor-pointer px-3 py-0.5 border rounded-lg text-red-500 bg-red-100'>Replace</span>
                        </div>
                        {
                          showFileUploadInput &&
                          <FileUpload name='guarantorDocument' fileType='document' />
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

export default UpdateGuarantorForm


const SuccessModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
      <img src="./Check.svg" alt="Guarantor added" className='w-52 h-52' />
      <div>
        <h3 className='font-bold text-2xl text-center'>
          Guarantor information updated
        </h3>
      </div>
      <p className='text-sm text-center'>
        Guarantor information has been successfully updated
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