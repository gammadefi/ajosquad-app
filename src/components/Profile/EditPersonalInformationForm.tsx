import { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Form, Formik } from 'formik';
import { FaArrowRight } from 'react-icons/fa6';
import TextInput from '../FormInputs/TextInput2';
import SuccessModal from './SuccessModal';
import { userServices } from '../../services/user';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { useAuth } from '../../zustand/auth.store';


const fetchUser = async () => {
  const res: AxiosResponse = await userServices.user.getMe();
  return res.data;
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("*First Name is required"),
  lastName: Yup.string()
    .trim()
    .required("*Last Name is required"),
  email_address: Yup.string()
    .trim()
    .email("*Email must be a valid address")
    .required("*Email is required"),
  homeAddress: Yup.string()
    .trim()
    .required("*Home Address is required"),
  phoneNumber: Yup.string()
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
});

const EditPersonalInformationForm = ({ onClose }: { onClose: () => void }) => {
  const [initialValues, setInitialValues] = useState<any>(null);
  const profile = useAuth((s) => s.profile)
  const queryClient = useQueryClient();
  const [hasUpdated, setHasUpdated] = useState(false);
  const { setUserProfile } = useAuth()
  const { data: userData, isLoading, error } = useQuery(['user'], fetchUser);


  useEffect(() => {
    const fetchUserData = async () => {

      setInitialValues({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email_address: userData.email_address || "",
        phoneNumber: userData.phoneNumber || "",
        homeAddress: userData.homeAddress || "",
        city: userData.city || "",
        state: userData.state || "",
        zipCode: userData.zipCode || ""
      })
    }
    fetchUserData();
  }, [])

  const mutation = useMutation(
    async (values: any) => {
      return userServices.user.updateUserPersonalInfo(profile.id, values)
    }
    , {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    });

  if (!initialValues) {
    return (
      <div className='w-[350px] h-[400px] md:w-[600px] flex items-center justify-center'>
        <img src="./logo.png" alt="" className='h-20 w-20' />
      </div>
    )
  }

  return (
    <>
      {
        hasUpdated ?
          <SuccessModal onClose={() => onClose()} title='Personal' />
          :
          <div className='md:w-[600px]'>
            <h2 className='text-3xl font-semibold'>Edit Personal Information</h2>
            <div className='space-y-3'>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  try {
                    const res = await mutation.mutateAsync(values);
                    if (res) {
                      setUserProfile(res.data);
                      setHasUpdated(true);
                    }
                  } catch (error) {
                    toast.error("An error occurred")
                  }
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
                        name='email_address'
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
                        name='phoneNumber'
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

export default EditPersonalInformationForm
