import React from "react"
import { Button } from "../../components/Button/Button"


export const ResetPassword = () => {
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
              <label htmlFor="userId" className="form-label"><p>New Password</p></label>
              <input type="password" className="form-control" placeholder="Enter New Password" />
            </div>
            <div className="mt-4 w-80">
              <label htmlFor="password" className="form-label"><p>Confirm Password</p></label>
              <input type="password" className="form-control" placeholder="Confirm New Password" />
            </div>
            <div className="mt-4">
              <Button label="Reset Password" className="justify-center" fullWidth disabled={false} />
            </div>
            <div className="mt-6">
              <a href="#" className="hover:underline"><p className="text-sm text-blue-500 text-center">Didn’t get reset link? Resend</p></a>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}