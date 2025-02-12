import { FormikProvider, useFormik } from 'formik'
import React, { useEffect } from 'react'
import TextInput from '../../components/FormInputs/TextInput2'
import { Button } from '../../components/Button/Button'
import { useMutation } from 'react-query'
import { KycServices } from '../../services/kyc'
import { AuthActions, useAuth } from '../../zustand/auth.store'
import Modal from '../../components/Modal/Modal'

import * as Yup from 'yup';
import PageLoader from '../../components/spinner/PageLoader'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Name is required')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Name should only contain letters, numbers, and spaces')
        .min(2, 'Name should be at least 2 characters long'),
    lastName: Yup.string()
        .required('Name is required')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Name should only contain letters, numbers, and spaces')
        .min(2, 'Name should be at least 2 characters long'),

    email_address: Yup.string()
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
        .matches(/^[a-zA-Z0-9\s]+$/, 'City should only contain letters, numbers, and spaces'),

    state: Yup.string()
        .required('Province is required')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Province should only contain letters, numbers, and spaces'),

    zipCode: Yup.string()
        .required('Posstal code is required')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Postal code should only contain letters, numbers')
        .length(6, 'Postal code should be exactly 6 digits'),

    jobTitle: Yup.string()
        .required('Job title is required')
        .min(2, 'Job title should be at least 2 characters long'),

    employerName: Yup.string()
        .required('Employer name is required')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Employer name should only contain letters, numbers, and spaces')
        .min(2, 'Employer name should be at least 2 characters long'),

    employerPhoneNumber: Yup.string()
        .required('Employer phone number is required')
        .matches(/^\d+$/, 'Employer phone number should only contain digits')
        .min(10, 'Employer phone number should be at least 10 digits')
        .max(15, 'Employer phone number should not exceed 15 digits'),

    others: Yup.string()
        .required('field is required')
        .nullable() // Optional field, can be null
        .max(500, 'Others field should not exceed 500 characters'),
});



const Kyc = () => {
    const [isKycLoading, setIsKycLoading] = React.useState(false)
    const [pageLoading, setPageLoading] = React.useState(true)
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [verificationUrl, setVerificationUrl] = React.useState(null);
    const [verificationRef, setVerificationRef] = React.useState(null);
    const [verificationStatus, setVerificationStatus] = React.useState<any>(null);
    const profile = useAuth((s) => s.profile)

    // console.log(profile.email_address)
    const form = useFormik({
        initialValues: {
            "firstName": profile.firstName ?? "",
            "lastName": profile.lastName ?? "",
            "email_address": profile.email_address ?? "",
            "phoneNumber": profile.phoneNumber ?? "",
            "homeAddress": profile.homeAddress ?? "",
            "city": profile.city ?? "",
            "state": profile.state ?? "",
            "zipCode": profile.zipCode ?? "",
            "jobTitle": profile.jobTitle ?? "",
            "employerName": profile.employerName ?? "",
            "employerPhoneNumber": profile.employerPhoneNumber ?? "",
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

            if (profile.kycVerificationReference) {
                const callBackBody = {
                    "reference": profile.kycVerificationReference
                }

                const res = await callbackFunc(callBackBody)
            }
            const kycres = await KycServices.getKyc(profile.id)

            if (kycres.data) {
                form.setValues(kycres.data)
                setIsModalOpen(true)
            }
            // console.log(kycres)

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

            await callbackFunc(callBackBody)


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

            const res = await callbackFunc(callBackBody)
            console.log(res)
            if (res.message === "Verification request successful") {
                setVerificationStatus("successful")
                setIsModalOpen(true)
            }
            setVerificationUrl(null);
        } catch (error) {
            setVerificationUrl(null);
        }
        // Clear the iframe URL to close it
    };

    return (

        <Modal showCloseButton={false} open={isModalOpen} >
            {
                verificationStatus ? (verificationStatus === "successful" ? <div className='w-[90vw] flex flex-col items-center gap-6 md:!w-[600px]  h-[450px]'>
                    <img src='/face-id.png' alt='' />
                    <h3 className='font-semibold text-center text-2xl'>KYC Completed</h3>
                    <h5 className='text-sm text-center  max-w-[318px] text-[#464749]'>Verification complete! You're one step closer to financial freedom.</h5>
                    <Button label='Proceed' disabled={isKycLoading} onClick={() => AuthActions.setVerified(true)} isLoading={isKycLoading} className='mt-6 w-full text-center flex font-semibold justify-center' />
                </div> : null) : <div className='w-[90vw] flex flex-col items-center gap-6 md:!w-[600px]  h-[450px]'>
                    <img src='/success.svg' alt='' />
                    <h3 className='font-semibold text-center text-2xl'>Personal Information Updated</h3>
                    <h5 className='text-sm text-center  max-w-[318px] text-[#464749]'>You have completely provided your personal information, kindly proceed to your KYC.</h5>
                    <Button label='Proceed to KYC' disabled={isKycLoading} onClick={() => initiateKyc()} isLoading={isKycLoading} className='mt-6 w-full text-center flex font-semibold justify-center' />
                </div>
            }


            {
                pageLoading ? (
                    <PageLoader />
                ) : (
                    <>

                        {
                            verificationUrl ? (
                                // Render the iframe if the verification URL is available
                                <div className='relative pt-2 md:pt-20 w-full h-[100vh]'>
                                    <button
                                        onClick={closeIframe}
                                        className="absolute top-6 right-4 md:right-20 bg-red-500 text-white px-4 py-2 rounded z-10"
                                    >
                                        close & continue
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
                                                <div className='grid grid-cols-2 gap-2'>
                                                    <TextInput name='firstName' label='First Name *' placeholder='Enter your first name' />
                                                    <TextInput name='lastName' label='Last Name *' placeholder='Enter your last name' />
                                                </div>
                                                <TextInput name='email_address' label='Email *' wrapperClass='mt-3' placeholder='Enter your email' />
                                                <TextInput name='phoneNumber' label='Phone Number *' wrapperClass='mt-3' placeholder='Enter your phone number' />
                                                <GooglePlacesAutocomplete
                                                    apiKey="YOUR_GOOGLE_MAPS_API_KEY"
                                                    selectProps={{
                                                        placeholder: 'Enter your Home address',
                                                        onChange: (address :any) => {
                                                            if (!address) return;
                                                            const addressComponents = address.value.address_components;
                                                            const city = addressComponents.find((component: { types: string[], long_name: string }) => 
                                                                component.types.includes('locality'))?.long_name || '';
                                                            const state = addressComponents.find((component: { types: string[], long_name: string }) => 
                                                                component.types.includes('administrative_area_level_1'))?.long_name || '';
                                                            const zipCode = addressComponents.find((component: { types: string[], long_name: string }) => 
                                                                component.types.includes('postal_code'))?.long_name || '';

                                                            form.setFieldValue('homeAddress', address.label);
                                                            form.setFieldValue('city', city);
                                                            form.setFieldValue('state', state);
                                                            form.setFieldValue('zipCode', zipCode);
                                                        }
                                                    }}
                                                    autocompletionRequest={{
                                                        types: ['address'],
                                                        componentRestrictions: { country: 'ca' }
                                                    }}
                                                />

                                                <div className='grid grid-cols-3 gap-2'>
                                                    <TextInput name='city' label='City *' wrapperClass='mt-3' placeholder="city" />
                                                    <TextInput name='state' label='Province *' wrapperClass='mt-3' placeholder="province" />
                                                    <TextInput name='zipCode' label='Postal Code *' wrapperClass='mt-3' placeholder="Postal Code" />
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
                                                        <option value="Instagram">Instagram</option>
                                                        <option value="Referrals">Referrals</option>
                                                        <option value="LinkedIn">LinkedIn</option>
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
                    </>
                )
            }




        </Modal>
    )
}

export default Kyc