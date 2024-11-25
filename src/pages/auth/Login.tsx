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
import { useAuth } from "../../zustand/auth.store";
import VerifyAccount from "./VerifyAccount";
import { authServices } from "../../services/auth";

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();
  const { showPassword, handleClickShowPassword } = usePasswordToggle();
  const { setLoggedIn, setToken, setUserProfile, setVerified, setUserRoleType } = useAuth()

  const initialUserData = {
    email: "",
    password: ""
  };

  const sendOTPRequest = async (email: string) => {
    try {
      const response = await authServices.sendOtp({ "email_address": email });
      return response;
    } catch (error) {
      console.error(error)
      toast.error("Error while making request")
    }
  }

  return (
    <main className='h-full lg:h-fit flex flex-col gap-5 lg:rounded-xl lg:px-6 lg:py-5 lg:shadow-[0_8px_16px_0px_rgba(0,0,0,0.08)]'>
      <h2 className='text-2xl lg:text-3xl font-semibold text-black'>
        Login
      </h2>
      <p className='text-sm lg:text-base'>
        Provide your email and password to continue
      </p>

      <Formik
        initialValues={initialUserData}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (values) {
            setEmail(values.email)
            setSubmitting(true);

            try {
              const res = await authServices.login({
                "email_address": values.email,
                "password": values.password
              })
              if (res) {
                setUserProfile(res.data);
                setToken(res.accessToken);
                setLoggedIn(true);
                setSubmitting(false);
                if (res.data.role === "user") {
                    setUserRoleType("USER")
                } else {
                  setUserRoleType("ADMIN")
                }
                setVerified(res.data.verified)
                toast.success("Login successful");
                navigate('/dashboard');
              }
            } catch (error: any) {
              console.log(error)
              const { status, data } = error.response;
              if (status === 401) {
                if (data.message === 'Incorrect email or password!') {
                  toast.error(error.response.data.message);
                  setSubmitting(false);
                }
                if (data.message === 'Please verify your email address!') {
                  toast.error(error.response.data.message);
                  const res = await sendOTPRequest(values.email);
                  if (res) {
                    setOpenModal(true);
                    setSubmitting(false);
                  }
                }
              } else {
                toast.error(error.response.data.message);
                setSubmitting(false);
              }
            }
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
                  <span className='text-xs text-primary font-satoshiBold'>
                    Forgot password?
                  </span>
                </Link>
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
              >
                {
                  isSubmitting ? "Logging in" : "Login"
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
      <p>Dont have an account yet? <Link to='/sign-up'>
        <span className='text-primary font-bold'>Sign Up</span>
      </Link>
      </p>
      <Modal onClick={() => setOpenModal(!openModal)} open={openModal}>
        <VerifyAccount email={email} handleSendOTPCode={sendOTPRequest} />
      </Modal>
    </main>
  );
}