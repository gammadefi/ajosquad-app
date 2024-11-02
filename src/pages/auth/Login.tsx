import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineFacebook } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { FaArrowRight } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { useLocation, Link } from "react-router-dom";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import TextInput from "../../components/FormInputs/TextInput2";
import Modal from "../../components/Modal/Modal";
import { ResetPassword } from "./ResetPassword";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("*Email must be a valid address")
    .required("*Email is required"),
  password: Yup.string().trim()
    .required("*Password is required")
    .min(8, 'Must be at least 8 characters')
});

export default function Login() {
  const [activeTab, setActiveTab] = useState('ajosquad');
  const { showPassword, handleClickShowPassword } = usePasswordToggle();
  const router = useLocation();

  // const [isLoading, setIsLoading] = useState(false);

  // Login detail
  const userSignUpInfo = {
    email: "",
    password: ""
  };

  return (
    <main className='h-full lg:h-fit flex flex-col gap-5 lg:rounded-xl lg:px-6 lg:py-5 lg:shadow-[0_8px_16px_0px_rgba(0,0,0,0.08)]'>
      <h2 className='text-2xl lg:text-3xl font-semibold text-black'>
        Login
      </h2>
      <p className='text-sm lg:text-base'>
        Provide your email and password to continue
      </p>
      <div className="text-sm md:text-base flex justify-between items-center mb-4 gap-5">
        <button onClick={() => setActiveTab('ajosquad')} className={`${activeTab === "ajosquad" ? "font-semibold bg-primary text-white" : "border border-primary"} rounded-3xl p-3 w-full`}>
          <span>Login to Ajosquad</span>
        </button>
        <button onClick={() => setActiveTab('ajohome')} className={`${activeTab === "ajohome" ? "font-semibold bg-primary text-white" : "border border-primary"} rounded-3xl p-3 w-full`}>
          <span>Login to Ajohome</span>
        </button>
      </div>
      <Formik
        initialValues={userSignUpInfo}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          if (values) {
            // handleSubmit(values);
            console.log(values)
          }
        }}
      >
        {({ errors }) => {
          return (
            <Form className='w-full flex flex-col gap-4'>
              <TextInput
                name='email'
                type='email'
                label="Email"
                placeholder='Email address'
              />
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
              <div className='flex justify-end'>
                <Link to='/forgot-password'>
                  <a className='text-xs text-primary font-satoshiBold'>
                    Forgot password?
                  </a>
                </Link>
              </div>
              <button
                type='submit'
                disabled={false}
                className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
              >

                Login
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
      <p>Dont have an account yet? <Link to='/sign-up'>
        <a className='text-primary font-bold'>Sign Up</a>
      </Link>
      </p>
    </main>
  );
}