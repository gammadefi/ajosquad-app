import { useEffect } from "react"
import { LayoutOutlet } from '../../../Routes/Layout'
import { Link } from "react-router-dom";


export default function OnboardingLayout() {



  return (
    <>
      <div className='font-sfpro bg-white w-screen h-screen flex flex-col md:flex-row overflow-hidden '>
        <div style={{backgroundImage: "url('/side2.svg')"}} className="relative w-0 md:w-[41vw] bg-no-repeat bg-cover">
          <div className='absolute top-6 left-10'>
            <Link to='/'>
              <a>
                <img
                  alt='Profitall logo'
                  src='/images/logo.svg'
                  width={90}
                  height={31}
                  
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="flex md:hidden pt-5 items-center justify-between w-10/12 mx-auto">
          <Link to='/'>
            <a>
              <img
                alt='Profitall logo'
                src='/images/logo-purple.svg'
                width={90}
                height={31}
              />
            </a>
          </Link>
        </div>
        <div className='flex-1 pb-10 md:pb-0 overflow-y-auto'><LayoutOutlet /></div>
      </div>
    </>
    /* <Hints /> */
  );
}
