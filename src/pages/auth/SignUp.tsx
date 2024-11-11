import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineFacebook } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { FaArrowRight } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import TextInput from "../../components/FormInputs/TextInput2";
import Modal from "../../components/Modal/Modal";
import VerifyAccount from "./VerifyAccount";
import { authServices } from "../../services/auth";

// regex pattern
const regexPatterns = {
  number: /\d/,
  lowerCase: /[a-z]/,
  upperCase: /[A-Z]/,
  symbol: /[!@#$%^&*(),.?":{}|<>[\]\\;'`~_\-+=/]/
}

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("*First Name is required"),
  lastName: Yup.string()
    .trim()
    .required("*Last Name is required"),
  email: Yup.string()
    .trim()
    .email("*Email must be a valid address")
    .required("*Email is required"),
  password: Yup.string().trim()
    .required("*Password is required")
    .min(8, 'Must be at least 8 characters')
    .matches(regexPatterns.number, "You must enter at least one number.")
    .matches(regexPatterns.lowerCase, "You must enter at least one lowercase letter.")
    .matches(regexPatterns.upperCase, "You must enter at least one uppercase letter.")
    .matches(regexPatterns.symbol, "You must enter at least one special character"),
  confirmPassword: Yup.string()
    .required("*Confirm Password is required")
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default function SignUp() {
  const [activeTab, setActiveTab] = useState<string>('ajosquad');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")

  const { showPassword, handleClickShowPassword } = usePasswordToggle();
  const navigate = useNavigate();

  const initialUserSignUpInfo = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const sendOTPRequest = async (email: string) => {
    try {
      const response = await authServices.sendOtp({ "email_address": email });
      return response;
    } catch (error) {
      console.error(error)
      toast.error("Error making response")
    }
  }


  return (
    <main className='h-full lg:h-fit flex flex-col gap-5 lg:rounded-xl lg:px-6 lg:py-5 lg:shadow-[0_8px_16px_0px_rgba(0,0,0,0.08)]'>
      <h2 className='text-2xl lg:text-3xl font-semibold text-black mb-2'>
        Create Account
      </h2>
      <p className='text-sm mb-6 lg:text-base'>
        Provide all required information to set up your account
      </p>
      <div className="text-sm md:text-base flex justify-between items-center mb-4 gap-5">
        <button onClick={() => setActiveTab('ajosquad')} className={`${activeTab === "ajosquad" ? "font-semibold bg-primary text-white" : "border border-primary"} rounded-3xl p-3 w-full`}>
          <span>Register to Ajosquad</span>
        </button>
        <button onClick={() => setActiveTab('ajohome')} className={`${activeTab === "ajohome" ? "font-semibold bg-primary text-white" : "border border-primary"} rounded-3xl p-3 w-full`}>
          <span>Register to Ajohome</span>
        </button>
      </div>
      <Formik
        initialValues={initialUserSignUpInfo}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (values) {
            setSubmitting(true);

            const payload = {
              "firstName": values.firstName,
              "lastName": values.lastName,
              "email_address": values.email,
              "password": values.password
            }

            try {
              const response = await authServices.signUp(payload);
              if (response) {
                toast.success("Sign up successful")
                setEmail(values.email);
                setOpenModal(!openModal);
                setSubmitting(false);
              }
            } catch (error: any) {
              console.log(error);
              setSubmitting(false);
              toast.error(error.response.data.message);
            }
          }
        }}
      >
        {({ values, isSubmitting }) => {
          return (
            <Form className='flex flex-col gap-3'>
              <div className='flex flex-col gap-3'>
                <div className="flex gap-3">
                  <TextInput
                    name='firstName'
                    label="First Name"
                    placeholder='First Name'
                  />
                  <TextInput
                    name='lastName'
                    label="Last Name"
                    placeholder='Last Name'
                  />
                </div>
                <TextInput
                  name='email'
                  type='email'
                  label="Email"
                  placeholder='Email address'
                />
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
                    <span className={`p-1 rounded border ${values.password === "" ? "border-[#C8CCD0]" : !regexPatterns.symbol.test(values.password) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                      One Special Character
                    </span>
                    <span className={`p-1 rounded border ${values.password === "" ? "border-[#C8CCD0]" : !regexPatterns.upperCase.test(values.password) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                      One Uppercase Character
                    </span>
                    <span className={`p-1 rounded border ${values.password === "" ? "border-[#C8CCD0]" : !regexPatterns.number.test(values.password) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                      One number
                    </span>
                    <span className={`p-1 rounded border ${values.password === "" ? "border-[#C8CCD0]" : !regexPatterns.lowerCase.test(values.password) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
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
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
              >
                {
                  isSubmitting ? "Creating Account" : "Create Account"
                }
                <FaArrowRight />
              </button>
            </Form>
          );
        }}
      </Formik>
      <div className="text-center">
        <span>Or Continue with</span>
      </div>
      <div className="w-full flex gap-3 text-[#3E3E3E]">
        <button className="w-full flex justify-center items-center gap-1 p-3 border border-black rounded-xl">
          <FcGoogle size={20} />
          Google
        </button>
        <button className="w-full flex justify-center items-center gap-1 p-3 border border-black rounded-xl">
          <MdOutlineFacebook size={20} className="text-primary" />
          Facebook
        </button>
      </div>
      <p>Already have an account? <Link to='/login'>
        <span className='text-primary font-bold'>Sign in</span>
      </Link>
      </p>
      <Modal
        onClick={() => {
          setOpenModal(!openModal)
          navigate('/login')
        }}
        open={openModal}
      >
        <VerifyAccount email={email} handleSendOTPCode={sendOTPRequest} />
      </Modal>
    </main >
  );
}
