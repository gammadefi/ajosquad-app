import { useEffect } from "react";
import { LayoutOutlet } from '../../../Routes/Layout';
import { useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  return (
    <>
      <div className='py-20 lg:py-28 flex justify-center'>
        <div className="w-full lg:w-1/2 lg:py-10 px-4 md:px-14">
          <LayoutOutlet />
        </div>
        <div className={`hidden lg:block w-1/2 ${location.pathname === "/sign-up" && "h-[960px]"}  px-4 md:px-20`}>
          <div className="bg-primary-darker rounded-3xl h-full p-16 text-white">
            <h3 className="text-3xl font-medium">The simplest way to manage your finances.</h3>
            <p className="text-xl">Provide your credential to access your account</p>
            <img src="./AuthLayoutImage.svg" alt="" className="h-full" />
          </div>
        </div>
      </div >
    </>
  );
}
