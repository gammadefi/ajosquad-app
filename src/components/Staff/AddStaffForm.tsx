import * as Yup from "yup";
import { Form, Formik } from 'formik';
import TextInput from '../FormInputs/TextInput2';
import { FaArrowRight } from 'react-icons/fa6';
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { StaffService } from "../../services/staff";

const addStaff = async ({ payload }: { payload: any }) => {
  const res = await StaffService.createStaff(payload);
  return res;
}

const AddStaffForm = ({ closeModal }: { closeModal: () => void }) => {
  const [hasAddedStaff, setHasAddedStaff] = useState(false);
  const queryClient = useQueryClient()

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .required("*Full Name is required"),
    lastName: Yup.string()
      .trim()
      .required("*Full Name is required"),
    fullName: Yup.string()
      .trim()
      .required("*Full Name is required"),
    email: Yup.string()
      .trim()
      .email()
      .required("*Email Name is required"),
    role: Yup.string()
      .trim()
      .required("*Role is required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    role: ""
  }

  const mutation = useMutation(addStaff, {
    onSuccess: () => {
      queryClient.invalidateQueries(["query-all-staffs"]);
    },
  });

  return (
    <>
      {
        hasAddedStaff ?
          <div className='md:w-[550px] lg:w-full flex flex-col items-center gap-5'>
            <img src="./Trophy.svg" alt="Delete bank" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Invite Sent Successfully
              </h3>
            </div>
            <p className='text-sm text-center'>
              Success! You have successfully sent an invite to this user
            </p>
            <button
              type='button'
              onClick={closeModal}
              className='bg-primary w-full font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Dismiss
              <FaArrowRight />
            </button>
          </div>
          :
          <div className='flex flex-col gap-2 w-[350px] md:w-[600px]'>
            <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold">
              Invite Staff
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                if (values) {
                  const payload = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    name: values.fullName,
                    email_address: values.email,
                    role: values.role
                  }

                  console.log(payload)
                  try {
                    const res = await mutation.mutateAsync({ payload });
                    if (res) {
                      setHasAddedStaff(true);
                    }
                  } catch (error) {
                    console.log(error)
                    toast.error("Failed to add a staff")
                  }
                }
              }}
            >
              {({ isSubmitting, setValues }) => (
                <Form className='flex flex-col gap-1.5'>
                  <TextInput
                    name='firstName'
                    type='text'
                    label="First Name*"
                    placeholder='Enter user first name'
                  />
                  <TextInput
                    name='lastName'
                    type='text'
                    label="Last Name*"
                    placeholder='Enter user last name'
                  />
                  <TextInput
                    name='fullName'
                    type='text'
                    label="Full Name*"
                    placeholder='Enter user full name'
                  />
                  <TextInput
                    name='email'
                    type='email'
                    label="Emali*"
                    placeholder='Enter user email'
                  />
                  <div className='flex flex-col w-full text-xs md:text-sm lg:text-base'>
                    <label className='font-normal text-sm font-satoshiRegular capitalize mb-1.5'>Select Permission Type*</label>
                    <select name='role' onChange={(e) => setValues((prevValues) => ({ ...prevValues, role: e.target.value }))} className='w-full h-[44px] py-2.5 focus:outline-none px-3 rounded-lg bg-white border'>
                      <option value="">Select Permission Type</option>
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                    </select>
                  </div>
                  <div className="my-3 flex justify-between">
                    <button
                      type="button"
                      className="border border-primary font-medium px-10 rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
                    >
                      {isSubmitting ? "Sending Invite" : "Send Invite"}
                      <FaArrowRight />
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
      }
    </>
  )
}

export default AddStaffForm