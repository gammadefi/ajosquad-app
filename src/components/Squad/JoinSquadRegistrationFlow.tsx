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
import Tooltip from '../Tooltip/ToolTip';

const JoinSquadRegistrationFlow = ({ squadId, selecetedPosition }: { squadId: string, selecetedPosition: string[] }) => {
  const [formData, setFormData] = useState({
    desiredPosition: [],
    bankInfoId: ""
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
      {step === 1 && <Step1 step={step} selecetedPosition={selecetedPosition} next={handleNextStep} formData={formData} setFormData={handleFormDataChange} />}
      {step === 2 && <Step2 step={step} formData={formData} back={handlePreviousStep} next={handleNextStep} setFormData={setFormData} />}
      {step === 3 && <Step3 step={step} back={handlePreviousStep} next={handleNextStep} formData={formData} squadId={squadId} />}
      {step === 4 && <SuccessModal />}
    </div>
  );
}

export default JoinSquadRegistrationFlow;

const Step1 = ({ step, next, formData, setFormData, selecetedPosition }: { step: number, next: () => void, formData: any, setFormData: any, selecetedPosition: string[] }) => {
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
          const guarantorRequiredPositions = ["1", "2", "3", "4", "5"];
          const selectedPositions = guarantorRequiredPositions.filter(position => checkboxes.includes(position));
          return selectedPositions.length <= 1;
        }
      ),
  });

  const initialValues = {
    selectedOptions: formData.desiredPosition || [],
  };

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
          onSubmit={(values) => {
            setFormData({ ...formData, desiredPosition: values.selectedOptions });
            next();
          }}
        >
          {({ values }) => (
            <Form>
              <div className="grid gap-4 grid-cols-2 items-center">
                {positions.map((position, index) => {
                  const isDisabled = selecetedPosition.includes(`POSITION_${position}`);
                  console.log(isDisabled, selecetedPosition)
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


const Step2 = ({ step, back, next, formData, setFormData }: { step: number, next: () => void, back: () => void, formData: any, setFormData: any }) => {
  const guarantorRequiredPositions = ["1", "2", "3", "4", "5"]
  const hasPosition1To5 = formData.desiredPosition.some((position: string) => guarantorRequiredPositions.includes(position));
  const progress = (step / 3) * 100;

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
                next()
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

const Step3 = ({ step, back, next, formData, squadId }: { step: number, back: () => void, next: () => void, formData: any, squadId: string }) => {
  const [userbanks, setUserBanks] = useState<any[]>([]);
  const [showBanks, setShowBanks] = useState(false);
  const [bankInfoId, setBankInfoId] = useState("");

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
  };

  const progress = (step / 3) * 100;

  useEffect(() => {
    const fetchUserBanks = async () => {
      const res: AxiosResponse = await userServices.bank.getAllBanks();
      console.log(res.data);
      setUserBanks(res.data)
    }

    fetchUserBanks();
  }, [])

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
          onSubmit={async (values) => {
            try {
              if (!bankInfoId) {
                const addBankPayload = {
                  bankName: values.bankName,
                  accountName: values.accountName,
                  institutionNumber: values.institutionNumber,
                  transitNumber: values.transitNumber,
                  accountNumber: values.accountNumber
                }
                const res = await userServices.bank.createBank(addBankPayload)
                if (res) {
                  const joinSquadPayload = {
                    ...formData,
                    bankInfoId: res.data.id
                  }
                  const response = await squadServices.joinSquad(squadId, joinSquadPayload);
                  if (response) {
                    next();
                  }
                }
              } else {
                const joinSquadPayload = {
                  ...formData,
                  bankInfoId
                }
                const response = await squadServices.joinSquad(squadId, joinSquadPayload)
                if (response) {
                  next();
                }
              }
            } catch (error) {
              console.log(error)
              toast.error("Failed to join squad")
            }
          }}
        >
          {({ isSubmitting, getFieldProps, setFieldValue, setValues }) => (
            <Form className='flex flex-col gap-1.5'>
              <div className='flex flex-col w-full text-xs md:text-sm lg:text-base'>
                <label className='font-normal text-sm font-satoshiRegular capitalize mb-1.5'>Select Bank*</label>
                <select onChange={(e) => setValues({ ...formData, bankName: e.target.value, institutionNumber: banks.docs.find((bank: any) => bank.bankName === e.target.value)?.instituitionCode })} name='bankName' className='w-full h-[44px] py-2.5 focus:outline-none px-3 rounded-lg bg-white border'>
                  <option value=''>Select Bank</option>
                  {
                    banks.docs.map((bank: any) => (
                      <option key={bank._id} value={bank.bankName}>{bank.bankName}</option>
                    ))
                  }
                </select>
              </div>
              <TextInput
                name='accountName'
                type='text'
                label="Account Name*"
                placeholder='Account Name'
              />
              <Tooltip text="Institution number is filled automatically based on the bank selected.">
                <TextInput
                  name='institutionNumber'
                  type='text'
                  readonly
                  disabled
                  label="Institution Number*"
                  placeholder='Institution Number'
                />
              </Tooltip>
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
              <div className='my-3 space-y-2'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    <RiBankFill className='text-gray-600 h-5 w-5' />
                    <p className='font-medium'>Select from existing Bank</p>
                  </div>
                  <div onClick={() => setShowBanks(!showBanks)} className='cursor-pointer flex gap-1'>
                    <p className='rounded-3xl py-1 px-3 bg-[#C8CCD0]'>See All</p>
                    <div className='flex items-center justify-center rounded-full p-2 bg-[#C8CCD0]'>
                      <ChevronDownIcon className={`h-4 w-4 ${showBanks && "rotate-90"}`} />
                    </div>
                  </div>
                </div>
                <div>
                  {showBanks && <>
                    {
                      userbanks.length > 0 ? <div className='space-y-3'>
                        {
                          userbanks.map((bank: any) => (
                            <div onClick={() => {
                              setBankInfoId(bank.id);
                              setValues({
                                bankName: bank.bankName,
                                accountName: bank.accountName,
                                institutionNumber: bank.institutionNumber,
                                transitNumber: bank.transitNumber,
                                accountNumber: bank.accountNumber
                              })
                            }}
                              className={`cursor-pointer w-full px-3 py-2 rounded-lg ${bankInfoId === bank.id ? "border-2" : "border"} border-primary bg-[#F8F8F8]`} key={bank.id}>
                              <h2 className='text-[#5A5C5E] font-bold'>{bank.bankName}</h2>
                              <div className='space-y-0.5 my-2'>
                                <div className='text-xs flex justify-between'>
                                  <h3>Account Name: </h3>
                                  <p className='font-bold'>{bank.accountName}</p>
                                </div>
                                <div className='text-xs flex justify-between'>
                                  <h3>Account Number: </h3>
                                  <p className='font-bold'>{bank.accountNumber}</p>
                                </div>
                                <div className='text-xs flex justify-between'>
                                  <h3>Institution Number: </h3>
                                  <p className='font-bold'>{bank.institutionNumber}</p>
                                </div>
                                <div className='text-xs flex justify-between'>
                                  <h3>Transit Number: </h3>
                                  <p className='font-bold'>{bank.transitNumber}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                        : <>No Banks founds. Please add a bank</>
                    }
                  </>}
                </div>
              </div>
              <div className="flex justify-between">
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
                  {isSubmitting ? "Proceeding" : "Proceed"}
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