import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CircularProgressBar from '../Progress/CircularProgressBar';
import TextInput from '../FormInputs/TextInput2';
import { FaArrowRight } from 'react-icons/fa6';
import { RiBankFill } from "react-icons/ri";
import { userServices } from '../../services/user';
import { useAuth } from '../../zustand/auth.store';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { AxiosResponse } from 'axios';
import { banks } from '../../utils/banks';
import FileUpload from '../FormInputs/FIleUpload2';
import toast from 'react-hot-toast';
import { guarantorServices } from '../../services/guarantor';
import { squadServices } from '../../services/squad';
import { useMutation } from 'react-query';


const guarantorRequiredPositions = ["1", "2", "3", "4", "5"];

const UpdateSquadPositionFlow = ({ squadId, selecetedPosition, myPositions, information }: { squadId: string, selecetedPosition: string[], myPositions: any, information: any }) => {
  // console.log(myPositions)
  const updatedPrefixPositions = myPositions.map((pos: any) => pos.replace("POSITION_", ""))
  const [formData, setFormData] = useState({
    newPosition: [],
    bankInfoId: information.bankInfoId
  });

  const [step, setStep] = useState(1);
  const hasPosition1To5 = formData.newPosition.some((position: string) => guarantorRequiredPositions.includes(position));


  const handleNextStep = async () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFormDataChange = (data: { [key: string]: string | string[] } | any) => {
    console.log("data", data)
    setFormData(data);
  };
  console.log(formData)
  return (
    <div className="relative">
      {step === 1 && <Step1 step={step} squadId={squadId} selecetedPosition={selecetedPosition} next={handleNextStep} formData={formData} initialPosition={updatedPrefixPositions} setFormData={handleFormDataChange} />}
      {step === 2 && <Step2 step={step} squadId={squadId} formData={formData} back={handlePreviousStep} next={handleNextStep} setFormData={setFormData} />}
      {step === 3 && <SuccessModal />}
    </div>
  );
}

export default UpdateSquadPositionFlow;

const Step1 = ({ step, next, formData, setFormData, selecetedPosition, initialPosition, squadId }: { step: number, next: () => void, squadId: string, formData: any, setFormData: any, selecetedPosition: string[], initialPosition: string[] }) => {
  const positions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const progress = (step / 2) * 100;

  const validationSchema = Yup.object().shape({
    selectedOptions: Yup.array()
      .min(1, "You must select at least one option.")
      .max(3, "You can select a maximum of three options.")
      .test(
        'single-position',
        'You can select only one checkbox from positions 1 to 5.',
        (checkboxes: any) => {
          const guarantorRequiredPositions = ["1", "2", "3", "4", "5"];
          const selectedPositions = guarantorRequiredPositions.filter(position => checkboxes.includes(position));
          return selectedPositions.length <= 1;
        }
      ),
  });

  const initialValues = {
    selectedOptions: initialPosition || [],
  };

  const handleUpdate = useMutation(
    async (values: any) => {
      return squadServices.addNewSquadPosition(squadId, values);
    },
    {
      onSuccess: () => {
        next();
      }
    }
  )


  return (
    <div className='max-w-[630px] flex flex-col gap-2'>
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
          onSubmit={async (values) => {
            await setFormData({ ...formData, newPosition: values.selectedOptions });
            // console.log({ ...formData, newPosition: values.selectedOptions })
            const hasPosition1To5 = values.selectedOptions.some((position: string) => guarantorRequiredPositions.includes(position));
            if (hasPosition1To5) {
              next()
            } else {
              handleUpdate.mutate({ ...formData, newPosition: values.selectedOptions })
            }


          }}

        >
          {({ values }) => (
            <Form>
              <div className="grid gap-4 grid-cols-2 items-center">
                {positions.map((position, index) => {
                  const isDisabled =
                    selecetedPosition.some(pos => pos === `POSITION_${position}`) &&
                    !initialPosition.includes(String(position));
                  // console.log(isDisabled, selecetedPosition)
                  return (
                    <div key={index} className="py-2 h-[48px] px-4 flex items-center border gap-2">
                      {
                        isDisabled ? <input type="checkbox" checked disabled className="w-5 h-5" /> : <Field
                          type="checkbox"
                          name="selectedOptions"
                          value={position}

                          className="w-5 h-5"
                        />
                      }

                      <div className='flex flex-col'>
                        <label className='text-sm font-medium'>Position {position}</label>
                        {index < 5 && (
                          <span className='text-[#D42620] text-xs'>Guarantor Needed</span>
                        )}
                      </div>
                    </div>
                  );
                })}
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
  );
};


const Step2 = ({ step, back, next, formData, setFormData, squadId }: { step: number, next: () => void, back: () => void, formData: any, setFormData: any, squadId: string }) => {
  const guarantorRequiredPositions = ["1", "2", "3", "4", "5"]
  const hasPosition1To5 = formData.newPosition.some((position: string) => guarantorRequiredPositions.includes(position));
  const progress = (step / 2) * 100;

  console.log(formData)

  if (!hasPosition1To5) {
    next();
  }

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
      .length(11, "Phone must be 11 digits")
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

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zipCode: "",
    guarantorDocument: ""
  };

  const handleUpdate = useMutation(
    async (values: any) => {
      return squadServices.addNewSquadPosition(squadId, values);
    },
    {
      onSuccess: () => {
        next();
      }
    }
  )

  return (
    <div className='max-w-[630px] max-h-[550px] overflow-scroll'>
      <div className='flex justify-between'>
        <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-4">
          Provide Guarantor
        </h1>
        <CircularProgressBar progress={progress} currentStep={step} />
      </div>
      <p>
        For position within 1-5, you need to provide and upload a guarantor information and document which would need to be verify before you can proceed and you can select from existing or previous verified guarantor.
      </p>
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
              const res = await guarantorServices.addGuarantor(payload)
              if (res) {
                setFormData({ ...formData, "guarantorId": res.data.id });
                handleUpdate.mutate({ ...formData, "guarantorId": res.data.id })

              }
            } catch (error) {
              console.log(formData)
              toast.error("Failed to upload guarantor")
            }
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className='flex flex-col gap-4 my-3'>
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
              <FileUpload name='guarantorDocument' fileType='document' />
              <div className="mt-5 flex justify-between">
                <button
                  type="button"
                  onClick={back}
                  className="border border-primary font-medium px-10 rounded-lg"
                >
                  Back
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
                >
                  {
                    isSubmitting ? "Proceeding" : "Proceed"
                  }
                  <FaArrowRight />
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  )
};


const SuccessModal = () => {
  return (
    <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
      <img src="/Trophy.svg" alt="Email verified" className='w-52 h-52' />
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