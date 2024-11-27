import { LayoutOutlet } from '../../../Routes/Layout';
import { useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  return (
    <>
      <div className='flex justify-center py-6'>
        <div className={`w-full lg:w-1/2 lg:py-10 ${location.pathname === "/login" && "lg:mt-20"} px-4 md:px-14`}>
          <LayoutOutlet />
        </div>
        <div className={`hidden lg:block w-1/2 ${location.pathname === "/sign-up" && "h-[960px]"}  px-4 `}>
          <div className="bg-primary-darker rounded-3xl p-16 text-white">
            <div className='space-y-3 px-3'>
              <h3 className="text-5xl font-medium leading-[64px]">The simplest way to <br /> manage your finances.</h3>
              <p className="text-xl">Empowering Financial Freedom Through Cooperative Savings</p>
            </div>
            <div className="relative flex items-center justify-center pt-32">
              <img src="./Dots.svg" alt="" className="absolute top-14 left-4" />
              <img src="./Border.svg" alt="" className="z-20 absolute top-[108px] right-1" />
              <img src="./CreditCards.svg" alt="" className="z-40 absolute -bottom-11 -right-14 w-[200px]" />
              <img src="./Girl.png" alt="" className="z-30 h-full w-[90%]" />
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
