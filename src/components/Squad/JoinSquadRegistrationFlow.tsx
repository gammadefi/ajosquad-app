import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CircularProgressBar from '../Progress/CircularProgressBar';
import TextInput from '../FormInputs/TextInput2';
import { FaArrowRight } from 'react-icons/fa6';
import FileUploadForm from './FileUploadForm';

const JoinSquadRegistrationFlow = () => {
  const [formData, setFormData] = useState({
    positions: [],
    bank: "",
    accountName: "",
    institutionNumber: "",
    transitNumber: "",
    accountNumber: ""
  });

  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFormDataChange = (data: { [key: string]: string | string[] }) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <div className="relative">
      {step === 1 && <Step1 step={step} next={handleNextStep} formData={formData} setFormData={handleFormDataChange} />}
      {step === 2 && <Step2 step={step} back={handlePreviousStep} next={handleNextStep} formData={formData} setFormData={handleFormDataChange} />}
      {step === 3 && <Step3 step={step} formData={formData} next={handleNextStep} />}
      {step === 4 && <SuccessModal />}
    </div>
  );
}

export default JoinSquadRegistrationFlow

const Step1 = ({ step, next, formData, setFormData }: { step: number, next: () => void, formData: any, setFormData: any }) => {
  const positions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const progress = (step / 3) * 100;

  const validationSchema = Yup.object().shape({
    selectedOptions: Yup.array()
      .min(1, "You must select at least one option.")
      .max(3, "You can select a maximum of three options.")
      .test(
        'single-position',
        'You can select only one checkbox from positions 1 to 5.',
        (checkboxes: any) => {
          const guarantorRequiredPositions = ["1", "2", "3", "4", "5"]
          const selectedPositions = guarantorRequiredPositions.filter(position => checkboxes.includes(position))
          return selectedPositions.length <= 1;
        }),
  });

  const initialValues = {
    selectedOptions: formData.positions,
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between'>
        <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-4">
          Choose a position within the Squad
        </h1>
        <CircularProgressBar progress={progress} currentStep={step} />
      </div>
      <p>
        You're free to choose up to three positions within the squad! Just remember, positions 1-5 require a guarantor for verification purposes.
      </p>
      <div>
        <h4 className='font-bold text-lg lg:text-xl mb-2'>Choose Position</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setFormData({ ...formData, positions: values.selectedOptions });
            next();
          }}
        >
          {() => (
            <Form>
              <div className="grid gap-4 grid-cols-2 items-center">
                {positions.map((position, index) => (
                  <div key={index} className="py-2 px-4 flex items-center border gap-2">
                    <Field
                      type="checkbox"
                      name="selectedOptions"
                      value={position}
                      className="w-5 h-5"
                    />
                    <div className='flex flex-col'>
                      <label className='text-sm font-medium'>Position {position}</label>
                      {
                        index < 5 &&
                        <span className='text-[#D42620] text-xs'>Guarantor Needed</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <ErrorMessage
                name="selectedOptions"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
              <div className="mt-5 flex justify-between">
                <button
                  type="button"
                  className="border border-primary font-medium px-10 rounded-lg"
                >
                  Back
                </button>
                <button
                  type='submit'
                  className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
                >
                  Proceed
                  <FaArrowRight />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}


const Step2 = ({ step, back, next, formData, setFormData }: { step: number, back: () => void, next: () => void, formData: any, setFormData: any }) => {
  const validationSchema = Yup.object({
    bank: Yup.string()
      .trim()
      .required("*Bank is required"),
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
  })

  const initialValues = {
    bank: formData.bank,
    accountName: formData.accountName,
    institutionNumber: formData.institutionNumber,
    transitNumber: formData.transitNumber,
    accountNumber: formData.accountNumber
  };

  const progress = (step / 3) * 100;

  return (
    <div className='flex flex-col gap-2 h-[550px] overflow-scroll'>
      <div className='flex justify-between'>
        <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-4">
          Add Payout Bank Information
        </h1>
        <CircularProgressBar progress={progress} currentStep={step} />
      </div>
      <p>
        You can choose as many position as possible within the squad. Kindly note, Position 1-5 need a guarantor.
      </p>
      <div>
        <h4 className='font-bold text-lg lg:text-xl mb-2'>Provide Bank Information</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setFormData({
              ...formData,
              bank: values.bank,
              accountName: values.accountName,
              institutionNumber: values.institutionNumber,
              transitNumber: values.transitNumber,
              accountNumber: values.accountNumber
            });
            next()
          }}
        >
          {() => (
            <Form className='flex flex-col gap-1.5'>
              <TextInput
                name='bank'
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
              <div className="mt-3 flex justify-between">
                <button
                  type="button"
                  onClick={back}
                  className="border border-primary font-medium px-10 rounded-lg"
                >
                  Back
                </button>
                <button
                  type='submit'
                  className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
                >
                  Proceed
                  <FaArrowRight />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

const Step3 = ({ step, next, formData }: { step: number, next: () => void, formData: any }) => {
  const guarantorRequiredPositions = ["1", "2", "3", "4", "5"]
  const hasPosition1To5 = formData.positions.some((position: string) => guarantorRequiredPositions.includes(position));
  const progress = (step / 3) * 100;

  if (!hasPosition1To5) {
    next();
  }

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-4">
          Provide Guarantor
        </h1>
        <CircularProgressBar progress={progress} currentStep={step} />
      </div>
      <p>
        For position within 1-5, you need to provide and upload a guarantor information and document which would need to be verify before you can proceed and you can select from existing or previous verified guarantor.
      </p>
      <FileUploadForm next={next} />
    </div>
  )
};

const SuccessModal = () => {
  return (
    <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
      <img src="./Trophy.svg" alt="Email verified" className='w-52 h-52' />
      <div>
        <h3 className='font-bold text-2xl text-center'>
          Squad Joined Successfully
        </h3>
      </div>
      <p className='text-sm text-center'>
        You have successfully join the Bronze squad, track your payment day from the payment page.
      </p>
      <button
        type='submit'
        className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
      >
        Dismiss
      </button>
    </div>
  )
}