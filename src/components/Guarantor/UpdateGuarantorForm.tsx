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
    phone: Yup.string()
      .trim()
      .required('Phone number is required'),
    city: Yup.string()
      .trim()
      .required("*City is required"),
    state: Yup.string()
      .trim()
      .required("*State is required"),
    zipCode: Yup.string()
      .matches(/^\d{6}$/, 'ZIP code must be exactly 5 digits')
      .required('ZIP code is required'),
    guarantorDocument: Yup.string()
      .required("*Guarantor Document is required"),
  });

  useEffect(() => {
    const fetchUserBank = async () => {
      const res: AxiosResponse = await guarantorServices.getGuarantor(guarantorId);
      const guarantorInformation = res.data;
      setInitialValues({
        name: guarantorInformation.name || "",
        email: guarantorInformation.email || "",
        phone: guarantorInformation.phoneNumber || "",
        city: guarantorInformation.city || "",
        state: guarantorInformation.state || "",
        zipCode: guarantorInformation.zipCode || "",
        guarantorDocument: guarantorInformation.document_url || ""
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
                      "phoneNumber": values.phone,
                      "city": values.city,
                      "state": values.state,
                      "zipCode": values.zipCode,
                      "document_url": values.guarantorDocument
                    }
                    try {
                      const res = await mutation.mutateAsync({ guarantorId, payload });
                      if (res) {
                        setHasUpdatedGuarantor(true);
                      }
                    } catch (error) {
                      toast.error("Failed to update guarantor")
                      // closeModal();
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
                      <TextInput
                        name='phone'
                        label="Phone Number"
                      />
                      <div className='grid md:grid-cols-3 gap-3'>
                        <TextInput
                          name='city'
                          label="City"
                          placeholder='City'
                        />
                        <TextInput
                          name='state'
                          label="State"
                          placeholder='State'
                        />
                        <TextInput
                          name='zipCode'
                          label="Zip Code"
                          placeholder='Zip Code'
                        />
                      </div>
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