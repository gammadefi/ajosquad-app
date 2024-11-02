import React, { useEffect, useState } from "react"
import { FaArrowRight } from "react-icons/fa6"
import * as Yup from "yup";
import useCountdownTimer from "../../hooks/useCountDownTimer"
import { OtpInput } from "reactjs-otp-input"
import TextInput from "../../components/FormInputs/TextInput2"
import { Form, Formik } from "formik"
import Modal from "../../components/Modal/Modal";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";

// regex pattern
const regexPatternsForPassword = {
  number: /\d/,
  lowerCase: /[a-z]/,
  upperCase: /[A-Z]/,
  symbol: /[!@#$%^&*(),.?":{}|<>[\]\\;'`~_\-+=/]/
}

// Validation schema
const validationSchema = Yup.object({
  password: Yup.string().trim()
    .required("*Password is required")
    .min(8, 'Must be at least 8 characters')
    .matches(regexPatternsForPassword.number, "You must enter at least one number.")
    .matches(regexPatternsForPassword.lowerCase, "You must enter at least one lowercase letter.")
    .matches(regexPatternsForPassword.upperCase, "You must enter at least one uppercase letter.")
    .matches(regexPatternsForPassword.symbol, "You must enter at least one special character"),
  confirmPassword: Yup.string()
    .required("*Confirm Password is required")
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export const ResetPassword = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const { showPassword, handleClickShowPassword } = usePasswordToggle();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (!searchParams.get("token")) {
      navigate('/forgot-password')
    }
  }, [])

  const initialValues = {
    password: "",
    confirmPassword: ""
  };

  return (
    <main className='h-full flex flex-col gap-3'>
      <h2 className='text-2xl lg:text-3xl font-semibold text-black mb-2'>
        Create Account
      </h2>
      <p className='text-sm mb-6 lg:text-base'>
        Provide all required information to set up your account
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          setOpenModal(true)
          console.log(values)
        }}
      >
        {({ values }) => {
          return (
            <Form className='flex flex-col gap-3'>
              <div>
                <TextInput
                  name='password'
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder='Password'
                  rightIcon={
                    showPassword ? (
                      <AiOutlineEye size={24} className='cursor-pointer' />
                    ) : (
                      <AiOutlineEyeInvisible size={24} />
                    )
                  }
                  onRightIconClick={handleClickShowPassword}
                />
                <div className="flex flex-wrap gap-1 lg:gap-2 text-[10px] md:text-sm mt-1 md:mt-3">
                  <span className={`p-1 rounded border ${values.password === "" ? "border-[#C8CCD0]" : (values.password.length < 8) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                    8 Character Min
                  </span>
                  <span className={`p-1 rounded border ${values.password === "" ? "border-[#C8CCD0]" : !regexPatternsForPassword.symbol.test(values.password) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                    One Special Character
                  </span>
                  <span className={`p-1 rounded border ${values.password === "" ? "border-[#C8CCD0]" : !regexPatternsForPassword.upperCase.test(values.password) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                    One Uppercase Character
                  </span>
                  <span className={`p-1 rounded border ${values.password === "" ? "border-[#C8CCD0]" : !regexPatternsForPassword.number.test(values.password) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                    One number
                  </span>
                  <span className={`p-1 rounded border ${values.password === "" ? "border-[#C8CCD0]" : !regexPatternsForPassword.lowerCase.test(values.password) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                    One Lowercase Character
                  </span>
                </div>
              </div>
              <TextInput
                name='confirmPassword'
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder='Password'
                rightIcon={
                  showPassword ? (
                    <AiOutlineEye size={24} className='cursor-pointer' />
                  ) : (
                    <AiOutlineEyeInvisible size={24} />
                  )
                }
                onRightIconClick={handleClickShowPassword}
              />
              <button
                type='submit'
                disabled={false}
                className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
              >

                Create Account
                <FaArrowRight />
              </button>
            </Form>
          );
        }}
      </Formik>
      <span>{localStorage.getItem("email")}</span>
      <Modal open={openModal} onClick={() => setOpenModal(false)}>
        <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
          <img src="./Padlock.svg" alt="Email verified" className='w-52 h-52' />
          <div>
            <h3 className='font-bold text-2xl text-center'>
              Password updated
            </h3>
          </div>
          <p className='text-sm'>You have successfully set a new password</p>
          <button
            type='submit'
            disabled={false}
            className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
          >
            Proceed
            <FaArrowRight />
          </button>
        </div>
      </Modal>
    </main>
  )
}



