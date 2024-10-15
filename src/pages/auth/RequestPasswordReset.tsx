import React from "react"
import { Button } from "../../components/Button/Button"


export const RequestPasswordReset = () => {
  return (
    <div>
      <div className="card bg-white rounded-md p-9">
        <div className="flex justify-around">
          <img
            src={"/images/logo.svg"}
            className=""
            alt="Yep_logo"
          />
        </div>
        <div className="mt-6">
          <h5 className="text-center font-bold">Reset Password</h5>
        </div>
        <div>
          <form>
            <div className="mt-4 w-80">
              <p className="pc-text-gray text-sm">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
            </div>
            <div className="mt-4 w-80">
              <label htmlFor="text" className="form-label"><p>Email</p></label>
              <input type="text" className="form-control" placeholder="Enter your E-mail" />
            </div>
            <div className="mt-4">
              <Button label="Reset Password" className="justify-center" fullWidth disabled={false} />
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}