import React, { useState } from "react"
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextInput from "../../components/FormInputs/TextInput2";
import { FaArrowRight } from "react-icons/fa6";
import { OtpInput } from "reactjs-otp-input";
import useCountdownTimer from "../../hooks/useCountDownTimer";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("*Email must be a valid address")
    .required("*Email is required")
});

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false)

  const initialValues = {
    email: ""
  };

  return (
    <main className='h-full flex flex-col gap-5'>
      <h3 className='text-2xl lg:text-3xl font-semibold text-black mb-2'>
        Password Recovery
      </h3>
      <p className='text-sm mb-6 lg:text-base'>Enter your registered email to proceed</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          setEmail(values.email)
          localStorage.setItem("email", values.email)
          setOpenModal(true)
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
                disabled={false}
                className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
              >
                Proceed
                <FaArrowRight />
              </button>
            </Form>
          );
        }}
      </Formik>
      <Modal open={openModal} onClick={() => setOpenModal(false)}>
        <OTPFormSection email={email} />
      </Modal>
    </main>
  )
}

function OTPFormSection({ email }: { email: string }) {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const { minutes, seconds, reset, timeLeft } = useCountdownTimer();
  const handleChange = (code: any) => {
    if (error) {
      setError("")
    }
    setCode(code)
  }

  const handleResendCode = () => {
    // api call to resend verification code with the user email provided
    reset()
  }

  const handleVerifyCode = () => {
    if (!code || code.length < 6) {
      setError("Please fill all the inputs boxes")
      return
    }
    // api call to verify code and send reset password link with token to user email
  }
  return (
    <div className='space-y-5 pt-10 pb-6 md:w-[450px] mx-auto flex flex-col items-center'>
      <div>
        <h3 className='font-bold text-2xl text-center'>
          Enter the 6 digit code sent to you at {email}
        </h3>
      </div>
      <div className='w-full'>
        <OtpInput
          value={code}
          onChange={handleChange}
          numInputs={6}
          separator={<span style={{ width: "8px" }}></span>}
          isInputNum={true}
          shouldAutoFocus={true}
          inputStyle={{
            border: "1px solid #C8CCD0",
            borderRadius: "8px",
            width: "54px",
            height: "54px",
            fontSize: "24px",
            fontWeight: "700"
          }}
          focusStyle={{
            outline: "none"
          }}
          containerStyle={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between"
          }}
        />
        <span className='text-xs mt-1 text-red-500'>{error}</span>
      </div>
      <div className='self-start text-xs flex gap-1'>
        Didn't get Code? {
          timeLeft ? <p>
            Resend code in <span className='font-bold'>({minutes}:{seconds})</span>
          </p> : <button onClick={handleResendCode} className='text-primary font-bold'>
            Resend
          </button>

        }
      </div>
      <button
        onClick={handleVerifyCode}
        disabled={false}
        className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
      >
        Proceed
        <FaArrowRight />
      </button>
    </div>
  )
}