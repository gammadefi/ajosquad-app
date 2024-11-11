import { useState } from "react"
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextInput from "../../components/FormInputs/TextInput2";
import { FaArrowRight } from "react-icons/fa6";
import Modal from "../../components/Modal/Modal";
import toast from "react-hot-toast";
import VerifyResetOTP from "./VerifyResetOTP";
import { authServices } from "../../services/auth";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("*Email must be a valid address")
    .required("*Email is required")
});

export const ForgotPassword = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

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
        onSubmit={async (values, { setSubmitting }) => {
          localStorage.setItem("userEmail", values.email)
          setSubmitting(true);
          try {
            const response = await authServices.forgotPassword({ "email_address": values.email });
            if (response) {
              setOpenModal(true)
              setSubmitting(false);
              toast.success("Reset password OTP sent");
            }
          } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => {
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