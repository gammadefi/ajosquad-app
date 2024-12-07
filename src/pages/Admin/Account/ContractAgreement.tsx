import { formatDate2 } from '../../../utils/formatTime';

const ContractAgreement = () => {
  return (
    <div>
      <div className='flex gap-3 justify-between items-center lg:w-fit lg:gap-8'>
        <h2 className='font-semibold md:text-lg lg:text-xl'>Contract Agreement </h2>
        <p className='text-black/[42%] text-sm lg:text-base'>A copy of your contract agreement is provided below</p>
      </div>
      <div className='my-5'>
        <div className="rounded-xl border-[0.5px] border-[#B4B8BB] max-w-[319px]">
          <div className="bg-[#EEEFF0] px-5 pt-5 rounded-t-xl">
            <img src="/DocumentPrev.svg" alt="" />
          </div>
          <div className="px-4 py-3 flex justify-between">
            <div>
              <h2 className="font-bold text-sm">Ajosquad Contract Agreement</h2>
              <span className="text-xs">Signed at {formatDate2(new Date().toString())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractAgreement