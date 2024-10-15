import { useEffect } from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiUser } from "react-icons/hi";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { useLocation, Link } from "react-router-dom";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import TextInput from "../../components/FormInputs/TextInput2";



// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("*Email must be a valid address")
    .required("*Email is required"),
  password: Yup.string().trim().required("*Password is required"),
});

export default function Login() {
  const { showPassword, handleClickShowPassword } = usePasswordToggle();
  const router = useLocation();

  // const [isLoading, setIsLoading] = useState(false);

  // Login detail
  const userLoginInfo = {
    email: "",
    password: "",
  };



  return (
    <main className='h-full'>
      <div style={{ backgroundImage: "url('/signin-wavy-pattern.svg')" }} className="md:bg-primary bg-no-repeat bg-center h-full flex justify-center items-center">
        <div className='bg-white rounded-2xl lg:w-[560px] py-11 px-9'>
          <h2 className='text-2xl font-extrabold font-satoshi text-black mb-2'>
            Sign In
          </h2>
          <p className='text-sm mb-8 font-normal font-satoshiRegular text-grayish3'>
            Welcome back to Profitall, login to your account below to monitor{" "}
            <br /> your business growth.
          </p>
          <Formik
            initialValues={userLoginInfo}
            validationSchema={validationSchema}
            onSubmit={(values, formikActions) => {
              if (values) {
                // handleSubmit(values);
              }
            }}
          >
            {() => {
              return (
                <Form className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-4'>
                    <TextInput
                      name='email'
                      type='email'
                      placeholder='Email address'
                      leftIcon={<HiUser size={24} className='text-primary' />}
                    />
                    <TextInput
                      name='password'
                      type={showPassword ? "text" : "password"}
                      placeholder='Enter your password'
                      leftIcon={
                        <BsFillShieldLockFill
                          size={24}
                          className='text-primary'
                        />
                      }
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
                  <div className='flex justify-between'>
                    <div className='flex items-center gap-2 rounded'>
                      <input
                        id='remember-me'
                        type='checkbox'
                        className='w-5 h-5'
                      />
                      <label htmlFor='remember-me' className='text-xs'>
                        Remember me
                      </label>
                    </div>
                    <Link to='/forgot-password'>
                      <a className='text-xs text-primary font-satoshiBold'>
                        Forgot password?
                      </a>
                    </Link>
                  </div>
                  <button
                    type='submit'
                    disabled={false}
                    className='bg-primary w-full text-white inline-flex items-center justify-center text-center p-2.5 font-extrabold font-satoshiBold disabled:bg-opacity-50'
                  >

                    Sign In
                  </button>
                  <p className='text-sm text-center'>
                    New on Profitall?{" "}
                    <Link to='/onboarding'>
                      <a className='text-primary font-bold'>Sign up</a>
                    </Link>
                  </p>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </main>
  );
}
