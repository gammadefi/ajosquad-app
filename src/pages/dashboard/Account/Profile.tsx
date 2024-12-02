import React, { useState } from 'react'
import * as Yup from "yup";
import { FaArrowRight, FaCamera } from "react-icons/fa6";
import { PiPencilSimpleLine } from "react-icons/pi";
import { useAuth } from '../../../zustand/auth.store';
import Modal from '../../../components/Modal/Modal';
import { Form, Formik } from 'formik';
import TextInput from '../../../components/FormInputs/TextInput2';

const Profile = () => {
  const [showEditPersonalInformation, setShowEditPersonalInformation] = useState(false);
  const [showEditEmployerInformation, setShowEditEmployerInformation] = useState(false);
  const profile = useAuth.getState().profile;
  
  return (
    <div>
      <div className='my-5 space-y-4'>
        <div className='relative w-fit'>
          <img src="./Image.svg" alt="" />
          <FaCamera className='absolute h-5 w-5 text-primary-darkHover bottom-3 right-3.5' />
        </div>
        <div>
          <h2 className='text-lg font-semibold'>{profile?.firstName + " " + profile.lastName}</h2>
          <p><span className='text-[#787A7D]'>ID: </span>{profile.id}</p>
          <p className='text-[#787A7D]'>Toronto, Canada.</p>
        </div>
        <div className='flex flex-col lg:flex-row gap-3'>
          <div className='border border-[#E2DFDF] rounded-lg py-4 px-4 md:py-5 md:px-6 h-60 w-full lg:w-[420px]'>
            <div className='text-lg mb-3 flex justify-between items-center'>
              <h2 className='font-semibold'>Personal Information</h2>
              <button onClick={() => setShowEditPersonalInformation(!showEditPersonalInformation)}>
                <PiPencilSimpleLine className='text-[#787A7D] h-5 w-5' />
              </button>
            </div>
            <div className='font-medium space-y-1.5'>
              <div className='flex justify-between'>
                <div className='w-3/5'>
                  <p className='text-[#96999C]'>First Name</p>
                  <p className='font-normal'>{profile?.firstName}</p>
                </div>
                <div className='w-2/5'>
                  <p className='text-[#96999C]'>Last Name</p>
                  <p className='font-normal'>{profile?.lastName}</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='w-3/5'>
                  <p className='text-[#96999C]'>Email Address</p>
                  <p className='font-normal'>{profile?.email_address}</p>
                </div>
                <div className='w-2/5'>
                  <p className='text-[#96999C]'>Phone Number</p>
                  <p className='font-normal'>+234 900 0000 000</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <div>
                  <p className='text-[#96999C]'>Address</p>
                  <p className='font-normal'>Toronto, Canada</p>
                </div>
              </div>
            </div>
          </div>
          <div className='border border-[#E2DFDF] rounded-lg py-4 px-4 md:py-5 md:px-6 h-60 w-full lg:w-[420px]'>
            <div className='text-lg mb-3 flex justify-between items-center'>
              <h2 className='font-semibold'>Employer Information</h2>
              <button onClick={() => setShowEditEmployerInformation(!showEditEmployerInformation)}>
                <PiPencilSimpleLine className='text-[#787A7D] h-5 w-5' />
              </button>
            </div>
            <div className='font-medium space-y-1.5'>
              <div className='flex justify-between'>
                <div>
                  <p className='text-[#96999C]'>Job Title</p>
                  <p className='font-normal'>UI/UX Designer</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='w-1/2'>
                  <p className='text-[#96999C]'>Employer name</p>
                  <p className='font-normal'>faviayomide@gmail.com</p>
                </div>
                <div className='w-1/2'>
                  <p className='text-[#96999C]'>Employer Phone Number</p>
                  <p className='font-normal'>+234 900 0000 000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={showEditPersonalInformation} onClick={() => setShowEditPersonalInformation(!showEditPersonalInformation)}>
        <EditPersonalInformationForm />
      </Modal>
      <Modal open={showEditEmployerInformation} onClick={() => setShowEditEmployerInformation(!showEditEmployerInformation)}>
        <EditEmployerInformationForm />
      </Modal>
    </div>
  )
}

export default Profile

const EditPersonalInformationForm = () => {
  const [hasUpdated, setHasUpdated] = useState(false);

  const phoneValidationRules: any = {
    US: /^\d{10}$/,
    IN: /^\d{10}$/,
    UK: /^\d{11}$/
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .required("*First Name is required"),
    lastName: Yup.string()
      .trim()
      .required("*Last Name is required"),
    email: Yup.string()
      .trim()
      .email("*Email must be a valid address")
      .required("*Email is required"),
    homeAddress: Yup.string()
      .trim()
      .required("*Home Address is required"),
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
      .matches(/^\d{5}$/, 'ZIP code must be exactly 5 digits')
      .required('ZIP code is required'),
  });

  const initialUserInfo = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    homeAddress: "",
    city: "",
    state: "",
    zipCode: ""
  };

  return (
    <>
      {
        hasUpdated ?
          <SuccessModal title='Personal' />
          :
          <div className='md:w-[600px]'>
            <h2 className='text-3xl font-semibold'>Edit Personal Information</h2>
            <div className='space-y-3'>
              <Formik
                initialValues={initialUserInfo}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values)
                }}
              >
                {({ isSubmitting }) => {
                  return (
                    <Form className='flex flex-col gap-4 my-3'>
                      <div className="flex gap-3">
                        <TextInput
                          name='firstName'
                          label="First Name"
                          placeholder='First Name'
                        />
                        <TextInput
                          name='lastName'
                          label="last Name"
                          placeholder='Last Name'
                        />
                      </div>
                      <TextInput
                        name='email'
                        type='email'
                        label="Email"
                        placeholder='Email address'
                      />
                      <TextInput
                        name='homeAddress'
                        label="Home Address"
                        placeholder='Home Address'
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

const SuccessModal = ({ title }: { title: string }) => {
  return (
    <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
      <img src="./Check.svg" alt="Email verified" className='w-52 h-52' />
      <div>
        <h3 className='font-bold text-2xl text-center'>
          {title} information Updated
        </h3>
      </div>
      <p className='text-sm text-center'>
        Your {title.toLowerCase()}  information has been successfully updated
      </p>
      <button
        type='submit'
        className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
      >
        Dismiss
        <FaArrowRight />
      </button>
    </div>
  )
}