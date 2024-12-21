import { Form, Formik } from 'formik';
import { useState } from 'react'
import * as Yup from "yup";
import TextInput from '../FormInputs/TextInput2';
import { FaArrowRight } from 'react-icons/fa6';
import FileUpload from '../FormInputs/FIleUpload2';
import { useAuth } from '../../zustand/auth.store';
import toast from 'react-hot-toast';
import { guarantorServices } from '../../services/guarantor';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const addGuarantor = async ({ payload }: { payload: any }) => {
  const res: AxiosResponse = await guarantorServices.addGuarantor(payload)
  return res.data
};

const AddGuarantorForm = ({ closeModal }: { closeModal: () => void }) => {
  const [hasAddedGuarantor, setHasAddedGuarantor] = useState(false);
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
      .matches(/^\d{6}$/, 'ZIP code must be exactly 6 digits')
      .required('ZIP code is required'),
    guarantorDocument: Yup.string()
      .required("*Guarantor Document is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zipCode: "",
    guarantorDocument: ""
  };

  const mutation = useMutation(addGuarantor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["guarantors"]);
    },
  });

  return (
    <>
      {
        hasAddedGuarantor ?
          <SuccessModal closeModal={closeModal} />
          :
          <div className='w-[90vw] md:w-[600px]'>
            <h2 className='mb-5 text-3xl font-semibold'>Add Guarantor</h2>
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
                      "document_url": values.guarantorDocument,
                      "user_id": useAuth.getState().profile.id
                    }
                    try {
                      const res = await mutation.mutateAsync({ payload });
                      if (res) {
                        setHasAddedGuarantor(true);
                      }
                    } catch (error) {
                      toast.error("Failed to add guarantor")
                      // closeModal();
                    }
                  }
                }}
              >
                {({ isSubmitting }) => {
                  return (
                    <Form className='max-h-[500px] overflow-scroll flex flex-col gap-4 my-3'>
                      <TextInput
                        name='name'
                        label="Name"
                        placeholder='John Doe'
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
                        <FileUpload name='guarantorDocument' fileType='document' />
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
                            isSubmitting ? "Adding Guarantor" : "Add Guarantor"
                          }
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
      }
    </>
  )
}

export default AddGuarantorForm


const SuccessModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
      <img src="./Check.svg" alt="Guarantor added" className='w-52 h-52' />
      <div>
        <h3 className='font-bold text-2xl text-center'>
          Guarantor information added
        </h3>
      </div>
      <p className='text-sm text-center'>
        Guarantor information has been successfully added
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