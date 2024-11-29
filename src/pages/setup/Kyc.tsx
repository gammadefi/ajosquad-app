import { FormikProvider, useFormik } from 'formik'
import React, { useEffect } from 'react'
import TextInput from '../../components/FormInputs/TextInput2'
import { Button } from '../../components/Button/Button'
import { useMutation, useQuery } from 'react-query'
import { KycServices } from '../../services/kyc'
import { useAuth } from '../../zustand/auth.store'
import Modal from '../../components/Modal/Modal'

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
        .min(2, 'Name should be at least 2 characters long'),

    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),

    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^\d+$/, 'Phone number should only contain digits')
        .min(10, 'Phone number should be at least 10 digits')
        .max(15, 'Phone number should not exceed 15 digits'),

    homeAddress: Yup.string()
        .required('Home address is required')
        .min(5, 'Home address should be at least 5 characters long'),

    city: Yup.string()
        .required('City is required')
        .matches(/^[a-zA-Z\s]+$/, 'City should only contain letters and spaces'),

    state: Yup.string()
        .required('State is required')
        .matches(/^[a-zA-Z\s]+$/, 'State should only contain letters and spaces'),

    zipCode: Yup.string()
        .required('Zip code is required')
        .matches(/^\d+$/, 'Zip code should only contain digits')
        .length(6, 'Zip code should be exactly 6 digits'),

    jobTitle: Yup.string()
        .required('Job title is required')
        .min(2, 'Job title should be at least 2 characters long'),

    employerName: Yup.string()
        .required('Employer name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Employer name should only contain letters and spaces')
        .min(2, 'Employer name should be at least 2 characters long'),

    employerPhoneNumber: Yup.string()
        .required('Employer phone number is required')
        .matches(/^\d+$/, 'Employer phone number should only contain digits')
        .min(10, 'Employer phone number should be at least 10 digits')
        .max(15, 'Employer phone number should not exceed 15 digits'),

    others: Yup.string()
        .nullable() // Optional field, can be null
        .max(500, 'Others field should not exceed 500 characters'),
});



const Kyc = () => {
    const [isKycLoading, setIsKycLoading] = React.useState(false)
    const [pageLoadeing, setPageLoading] = React.useState(true)
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [verificationUrl, setVerificationUrl] = React.useState(null);
    const [verificationRef, setVerificationRef] = React.useState(null);
    const profile = useAuth((s) => s.profile)
    const form = useFormik({
        initialValues: {
            "name": "Sample User",
            "email": "sampleuser@mail.com",
            "phoneNumber": "35587891047",
            "homeAddress": "Sample Address",
            "city": "Sample City",
            "state": "Sample State",
            "zipCode": "123456",
            "jobTitle": "Sample Job",
            "employerName": "Sample Employer",
            "employerPhoneNumber": "34378208154",
            "others": ""
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            // console.log(values)
            handleSubmit.mutate(values)

        }
    })

    useEffect(() => {
        initialStart()

    }, [])

    const initialStart = async () => {

        try {
            const callBackBody = {
                "reference": profile.kycVerificationReference
            }

            const res = await callbackFunc(callBackBody)
        } catch (error) {

        } finally {
            setPageLoading(false)
        }

    }


    const handleSubmit = useMutation(
        async (values: any) => {
            return await KycServices.addKyc(values, profile.id)
        },
        {
            onSuccess: (data) => {
                setIsModalOpen(true)
                console.log(data)
            }, onError: (err: any) => {
                console.log(err)
                if (err.response.status === 400) {
                    setIsModalOpen(true)
                }
            }
        }
    )


    const initiateKyc = async () => {
        setIsKycLoading(true)
        try {
            const body = {
                "email": profile.email_address,
                "face": {},
                "document": {}
            }
            const initiateRes = await KycServices.initializeKyc(body)
            setVerificationUrl(initiateRes.data.verification_url);
            setVerificationRef(initiateRes.data.reference)
            setIsModalOpen(false)
            const callBackBody = {
                "reference": initiateRes.data.reference
            }

            const callBackRes = await callbackFunc(callBackBody)


        } catch (err) {

        } finally {
            setIsKycLoading(false)
        }
    }


    const callbackFunc = async (data: any) => {
        return await KycServices.kycCallbac(data)
    }

    const closeIframe = async () => {
        try {
            const callBackBody = {
                "reference": verificationRef
            }

            await callbackFunc(callBackBody)
            setVerificationUrl(null);
        } catch (error) {
            setVerificationUrl(null);
        }
        // Clear the iframe URL to close it
    };

    return (
        <div className='w-full h-full flex items-center py-12 justify-center'>

            <Modal showCloseButton={false} open={isModalOpen} >
                <div className='w-[90vw] flex flex-col items-center gap-6 md:!w-[600px]  h-[450px]'>
                    <img src='/success.svg' alt='' />
                    <h3 className='font-semibold text-center text-2xl'>Personal Information Updated</h3>
                    <h5 className='text-sm text-center  max-w-[318px] text-[#464749]'>You have completely provided your personal information, kindly proceed to your KYC.</h5>
                    <Button label='Proceed to KYC' disabled={isKycLoading} onClick={() => initiateKyc()} isLoading={isKycLoading} className='mt-6 w-full text-center flex font-semibold justify-center' />
                </div>
            </Modal>
            {
                verificationUrl ? (
                    // Render the iframe if the verification URL is available
                    <div className='relative w-full h-[100vh]'>
                        <button
                            onClick={closeIframe}
                            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded z-10"
                        >
                            Close
                        </button>
                        <iframe
                            src={verificationUrl}
                            title="KYC Verification"
                            className="w-full h-full border-0"
                            allow="fullscreen"
                        ></iframe>
                    </div>

                ) : <div className='max-w-[513px] rounded-[10px] w-full bg-white mt-9 border border-[#19124A] py-6 px-5 '>
                    <h3 className='md:text-3xl text-xl font-medium'>KYC</h3>


                    <FormikProvider value={form}>
                        <form className='mt-6' onSubmit={form.handleSubmit}>
                            <div className='rounded-[10px] border p-4'>
                                <h3 className='text-base md:text-lg font-semibold'>Personal Information</h3>
                                <div className='mt-3'>
                                    <TextInput name='name' label='Name *' placeholder='Enter your name' />
                                    <TextInput name='email' label='Email *' wrapperClass='mt-3' placeholder='Enter your email' />
                                    <TextInput name='phoneNumber' label='Phone Number *' wrapperClass='mt-3' placeholder='Enter your phone number' />
                                    <TextInput name='homeAddress' label='Home Address *' wrapperClass='mt-3' placeholder='Enter your Home address' />

                                    <div className='grid grid-cols-3 gap-2'>
                                        <TextInput name='city' label='City *' wrapperClass='mt-3' placeholder="city" />
                                        <TextInput name='state' label='State *' wrapperClass='mt-3' placeholder="state" />
                                        <TextInput name='zipCode' label='Zip Code *' wrapperClass='mt-3' placeholder="Zip Code" />


                                    </div>
                                </div>

                            </div>
                            <div className='rounded-[10px] mt-4 border p-4'>
                                <h3 className='text-base md:text-lg font-semibold'>Employer Information</h3>
                                <div className='mt-3'>
                                    <TextInput name='jobTitle' label='Job Title *' placeholder='Enter your Job Title' />
                                    <TextInput name='employerName' label='Employer Name *' wrapperClass='mt-3' placeholder='Enter your Employer Name' />
                                    <TextInput name='employerPhoneNumber' label='Phone Number *' wrapperClass='mt-3' placeholder='Enter your phone number' />

                                </div>
                            </div>

                            <div className='rounded-[10px] mt-4 border p-4'>
                                <h3 className='text-base md:text-lg font-semibold'>Others</h3>
                                <div className='mt-3'>
                                    <div>
                                        <label>How did you hear of us?*</label>
                                        <select {...form.getFieldProps('others')} name='others' className='w-full p-2 border h-[44px] bg-white rounded-lg mt-2'>
                                            <option value="" disabled selected>
                                                Select an option
                                            </option>
                                            <option value="socialMedia">Social Media</option>
                                            <option value="searchEngine">Search Engine (Google, Bing, etc.)</option>
                                            <option value="friendOrFamily">Friend or Family</option>
                                            <option value="advertisement">Advertisement</option>
                                            <option value="other">Other</option>

                                        </select>
                                        {form.touched.others && form.errors.others ? (
                                            // @ts-ignore
                                            <small className='text-red-600 mt-1 text-xs md:text-sm'>{form.errors.others && form.errors?.others}</small>
                                        ) : null}
                                    </div>


                                </div>
                            </div>

                            <div className='flex justify-between mt-6'>
                                <button type='button' className='px-5 py-2 border border-[#D42620] text-[#D42620] rounded-md'>Cancel</button>

                                <Button label='Proceed' isLoading={handleSubmit.isLoading} disabled={handleSubmit.isLoading} className='px-5' />

                            </div>

                        </form>

                    </FormikProvider>

                    <div>

                    </div>

                </div>
            }


        </div>
    )
}

export default Kyc