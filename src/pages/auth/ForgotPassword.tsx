import React, { useState } from "react"
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextInput from "../../components/FormInputs/TextInput2";
import { FaArrowRight } from "react-icons/fa6";
import Modal from "../../components/Modal/Modal";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";
import VerifyResetOTP from "./VerifyResetOTP";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("*Email must be a valid address")
    .required("*Email is required")
});

export const ForgotPassword = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const initialValues = {
    email: ""
  };

  return (
    <main className='pt-10  flex flex-col gap-5'>
      <h3 className='text-2xl lg:text-3xl font-semibold text-black mb-2'>
        Password Recovery
      </h3>
      <p className='text-sm mb-6 lg:text-base'>Enter your registered email to proceed</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          localStorage.setItem("userEmail", values.email)
          setIsSubmitting(true);
          try {
            const res = await axiosInstance.post('/auth/forgot-password',
              {
                "email_address": values.email
              }
            );
            if (res) {
              setOpenModal(true)
              setIsSubmitting(false);
              toast.success("Reset password OTP sent");
            }
          } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);
            setIsSubmitting(false);
          }
        }}
      >
        {() => {
          return (
            <Form className='w-full flex flex-col gap-4'>
              <TextInput
                name='email'
                type='email'
                label="Email"
                placeholder='Email address'
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
              >
                {
                  isSubmitting ? "Proceeding" : "Proceed"
                }
                <FaArrowRight />
              </button>
            </Form>
          );
        }}
      </Formik>
      <Modal open={openModal} onClick={() => setOpenModal(false)}>
        <VerifyResetOTP email={localStorage.getItem("userEmail") || ""} />
      </Modal>
    </main>
  )
};