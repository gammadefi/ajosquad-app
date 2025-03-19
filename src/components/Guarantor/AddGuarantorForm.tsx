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
import PageLoader from '../spinner/PageLoader';
import { squadServices } from '../../services/squad';
import Select from '../FormInputs/Select';
import useFetchWithParams from '../../hooks/useFetchWithParams';

const addGuarantor = async ({ payload }: { payload: any }) => {
  const res: AxiosResponse = await guarantorServices.addGuarantor(payload)
  return res.data
};

const AddGuarantorForm = ({ closeModal }: { closeModal: () => void }) => {
  const [hasAddedGuarantor, setHasAddedGuarantor] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useFetchWithParams(
    ["query-all-squads", {
      limit: 20,
      status: "upcoming"
    }],
    squadServices.getAllSquads,
    {
      onSuccess: (data: any) => {

      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )

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
    phone: Yup.string()
      .trim()
      .required('Phone number is required'),
    city: Yup.string()
      .trim()
      .required("*City is required"),
    state: Yup.string()
      .trim()
      .required("*Province is required"),
    zipCode: Yup.string()
      .matches(
        /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/,
        "Invalid Canadian zip code format"
      )
      .required("ZIP code is required"),
    guarantorDocument: Yup.string().url("Must be a valid url")
      .required("*Guarantor Document is required"),
    identityDocument: Yup.string().url("Must be a valid url")
      .required("*Identity Document is required"),
    workIdentityDocument: Yup.string().url("Must be a valid url")
      .required("*Work Identity Document is required")
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    city: "",
    squad: "",
    state: "",
    zipCode: "",
    guarantorDocument: "",
    identityDocument: "",
    workIdentityDocument: ""
  };

  const mutation = useMutation(addGuarantor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["guarantors"]);
    },
  });

  const userSquads = data?.data?.reduce((acc: any[], squad: any) => {
    if (squad.squadMembers.find((member: any) => member.userId === useAuth.getState().profile.id)) {
      acc.push({
        value: squad.id,
        name: squad.name
      });
    }
    return acc;
  }, []) || [];

  if (isLoading) return <PageLoader />
  if (error) return <>Error</>

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
                      "id_url": values.identityDocument,
                      "employmentDocument_url": values.workIdentityDocument,
                      "user_id": useAuth.getState().profile.id
                    }
                    try {
                      const res = await mutation.mutateAsync({ payload });
                      if (res) {
                        const result = await squadServices.updateSquadMemberGuarantor(values.squad, { guarantorId: res.id });
                        if (result) {
                          setHasAddedGuarantor(true);
                        }
                      }
                    } catch (error) {
                      toast.error("Failed to add guarantor")
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
                      <Select
                        name='squad'
                        label='Select Squad'
                        options={userSquads}
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
                          label="Province"
                          placeholder='Province'
                        />
                        <TextInput
                          name='zipCode'
                          label="Zip Code"
                          placeholder='Zip Code'
                        />
                      </div>
                      <div className='space-y-1'>
                        <label htmlFor="guarantorDocument">Upload signed Guarantor form</label>
                        <FileUpload name='guarantorDocument' fileType='document' />
                      </div>
                      <div className='space-y-1'>
                        <label htmlFor="identityDocument">Upload an approved identity document (Driver License, Internation Passport, etc)</label>
                        <FileUpload name='identityDocument' fileType='document' />
                      </div>
                      <div className='space-y-1'>
                        <label htmlFor="workIdentityDocument">Upload a Work ID or document</label>
                        <FileUpload name='workIdentityDocument' fileType='document' />
                      </div>
                      <div className='mt-5 flex justify-between'>
                        <button
                          onClick={closeModal}
                          type="button"
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