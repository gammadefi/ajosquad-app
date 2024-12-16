import { FaArrowRight } from "react-icons/fa6"

const SuccessModal = ({ title, onClose }: { title: string, onClose: () => void }) => {
  return (
    <div className='md:w-[450px] mx-auto flex flex-col items-center gap-5'>
      <img src="./Check.svg" alt="Email verified" className='w-52 h-52' />
      <div>
        <h3 className='font-bold text-2xl text-center'>
          {title} information Updated
        </h3>
      </div>
      <p className='text-sm text-center'>
        Your {title.toLowerCase()}  information has been successfully updated
      </p>
      <button
        type='submit'
        onClick={onClose}
        className='bg-primary font-semibold w-full rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
      >
        Dismiss
        <FaArrowRight />
      </button>
    </div>
  )
}

export default SuccessModal