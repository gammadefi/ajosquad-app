import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { OtpInput } from 'reactjs-otp-input';
import useCountdownTimer from '../../hooks/useCountDownTimer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';

export default function VerifyAccount({ email, handleSendOTPCode }: { email: string, handleSendOTPCode: (email: string) => any }) {
  const [code, setCode] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("")

  const { minutes, seconds, reset, timeLeft } = useCountdownTimer(5);
  const navigate = useNavigate();

  const handleChange = (code: any) => {
    if (error) {
      setError("")
    }
    setCode(code)
  }

  const handleResendOTPCode = async () => {
    try {
      const res = await handleSendOTPCode(email);
      if (res) {
        toast.success("OTP code sent. Please check your email")
        reset()
      }
    } catch (error) {
      toast.error("Error while resending OTP code. Please try again")
    }
  }

  const handleVerifyAccount = async () => {
    if (!code || code.length < 6) {
      setError("Please fill all the inputs boxes")
      return
    }
    setIsSubmitting(true)
    try {
      const res = await axiosInstance.post('/auth/verify-otp',
        {
          "email_address": email,
          "otp": code
        }
      );
      if (res) {
        setIsSubmitting(false);
        setIsVerified(true);
      }
    } catch (error) {
      console.error(error)
      setIsSubmitting(false);
      toast.error("Error while resending verifying code. Please try again")
    }
  }

  return (
    <main>
      {
        isVerified ?
          <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
            <img src="./EmailVerify.svg" alt="Email verified" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Email Verified
              </h3>
            </div>
            <p className='text-sm'>Your account email has been verified, proceed to login into your Account.</p>
            <button
              type='submit'
              onClick={() => navigate("/login")}
              className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Proceed to Login
              <FaArrowRight />
            </button>
          </div>
          :
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
                </p> : <button onClick={handleResendOTPCode} className='text-primary font-bold'>
                  Resend
                </button>

              }
            </div>
            <button
              onClick={handleVerifyAccount}
              disabled={isSubmitting}
              className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              {
                isSubmitting ? "Verifying Account" : "Verify Account"
              }
              <FaArrowRight />
            </button>
          </div>
      }
    </main>
  )
}
