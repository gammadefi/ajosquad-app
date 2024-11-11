import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCountdownTimer from "../../hooks/useCountDownTimer";
import { OtpInput } from "reactjs-otp-input";
import { FaArrowRight } from "react-icons/fa6";
import toast from "react-hot-toast";
import { authServices } from "../../services/auth";

export default function VerifyResetOTP({ email }: { email: string }) {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const navigate = useNavigate();

  const { minutes, seconds, reset, timeLeft } = useCountdownTimer(5);
  const handleChange = (code: any) => {
    if (error) {
      setError("")
    }
    setCode(code)
  }

  const handleResendOTPCode = async () => {
    try {
      const response = await authServices.sendOtp(
        {
          "email_address": email
        }
      );
      if (response) {
        toast.success("OTP code sent. Please check your email");
        reset();
      }
    } catch (error) {
      toast.error("Error while resending OTP code. Please try again");
    }
  }

  const handleVerifyOTPCode = async () => {
    if (!code || code.length < 6) {
      setError("Please fill all the inputs boxes")
      return
    }
    setIsVerifying(true)
    toast.success("OTP verification successful");
    localStorage.setItem("resetOTPCode", code);
    setIsVerifying(false);
    navigate('/reset-password')
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
          </p> : <button onClick={handleResendOTPCode} className='text-primary font-bold'>
            Resend
          </button>

        }
      </div>
      <button
        onClick={handleVerifyOTPCode}
        disabled={isVerifying}
        className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
      >
        {
          isVerifying ? "Verifying" : "Verify"
        }
        <FaArrowRight />
      </button>
    </div>
  )
}
