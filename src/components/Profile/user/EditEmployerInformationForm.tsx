import { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Form, Formik } from 'formik';
import { FaArrowRight } from 'react-icons/fa6';
import TextInput from '../../FormInputs/TextInput2';
import SuccessModal from '../SuccessModal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosResponse } from 'axios';
import { userServices } from '../../../services/user';
import { useAuth } from '../../../zustand/auth.store';
import toast from 'react-hot-toast';

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

const fetchUserData = async () => {
  const res: AxiosResponse = await userServices.user.getMe();
  return res.data;
};

const EditEmployerInformationForm = ({ onClose }: { onClose: () => void }) => {
  const [initialValues, setInitialValues] = useState<any>(null);
  const [hasUpdated, setHasUpdated] = useState(false);

  const profile = useAuth((s) => s.profile);
  const { setUserProfile } = useAuth()
  const queryClient = useQueryClient();
  const { data: userData, isLoading, error } = useQuery(['user'], fetchUserData);

  useEffect(() => {
    const fetchUserData = async () => {

      setInitialValues({
        jobTitle: userData.jobTitle || "",
        employerName: userData.employerName || "",
        phone: userData.employerPhoneNumber || "",
      })
    }
    fetchUserData();
  }, [])

  const mutation = useMutation(
    async (values: any) => {
      return userServices.user.updateUserEmployerInfo(profile.id, values)
    }
    , {
      onSuccess: (res: any) => {
        queryClient.invalidateQueries(["user"]);
        setUserProfile(res.data);
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
          <SuccessModal onClose={onClose} title='Employer' />
          :
          <div className='md:w-[600px]'>
            <h2 className='text-3xl font-semibold'>Edit Employer Information</h2>
            <div className='space-y-3'>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  const payload = {
                    jobTitle: values.jobTitle,
                    employerName: values.employerName,
                    employerPhoneNumber: values.phone
                  }
                  try {
                    const res = await mutation.mutateAsync(payload);
                    if (res) {
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
