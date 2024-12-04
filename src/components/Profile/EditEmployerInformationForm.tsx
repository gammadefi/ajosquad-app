import { useState } from 'react'
import * as Yup from "yup";
import { Form, Formik } from 'formik';
import { FaArrowRight } from 'react-icons/fa6';
import TextInput from '../FormInputs/TextInput2';
import SuccessModal from './SuccessModal';

const EditEmployerInformationForm = () => {
  const [hasUpdated, setHasUpdated] = useState(false);

  const validationSchema = Yup.object({
    employerName: Yup.string()
      .trim()
      .required("*Employer Name is required"),
    jobTitle: Yup.string()
      .trim()
      .required("*Job Title is required"),
    phone: Yup.string()
      .trim()
      .required("*Employer PhoneNumber is required")
  });

  const initialEmployerInfo = {
    jobTitle: "",
    employerName: "",
    phone: ""
  }

  return (
    <>
      {
        hasUpdated ?
          <SuccessModal title='Employer' />
          :
          <div className='md:w-[600px]'>
            <h2 className='text-3xl font-semibold'>Edit Employer Information</h2>
            <div className='space-y-3'>
              <Formik
                initialValues={initialEmployerInfo}
                validationSchema={validationSchema}
                onSubmit={(values) => {
console.log(values)
                }}
              >
                {({ isSubmitting }) => {
                  return (
                    <Form className='flex flex-col gap-4 my-3'>
                      <TextInput
                        name='jobTitle'
                        label="Job Title"
                        placeholder='Job Title'
                      />
                      <TextInput
                        name='employerName'
                        label="Employer Name"
                        placeholder='Employer Name'
                      />
                      <TextInput
                        name='phone'
                        label="Phone Number"
                      />
                      <div className='mt-5 flex justify-between'>
                        <button
                          type="button"
                          className="border border-primary font-medium px-10 rounded-lg"
                        >
                          Back
                        </button>
                        <button
                          type='submit'
                          disabled={isSubmitting}
                          className='bg-primary font-semibold rounded-lg text-white inline-flex items-center gap-3 justify-center text-center py-3 px-10 disabled:bg-opacity-50'
                        >
                          {
                            isSubmitting ? "Updating" : "Update"
                          }
                          <FaArrowRight />
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

export default EditEmployerInformationForm
