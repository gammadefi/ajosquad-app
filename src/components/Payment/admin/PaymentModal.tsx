import { useQuery } from 'react-query';
import PageLoader from '../../spinner/PageLoader';
import { formatDate2 } from '../../../utils/formatTime';
import { PaymentService } from '../../../services/payment';

export default function PaymentModal({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery(`payment-${id}`, async () => {
    const response = await PaymentService.getPayment(id);
    return response.data;
  })

  if (isLoading) return <PageLoader />
  if (error) return <div className='px-3 md:px-6 text-center text-lg mt-10'>Error fetching payment history</div>

  return (
    <div className='md:w-[500px]'>
      <h2 className='text-3xl font-semibold'>Payment Transaction Details</h2>
      <p>You can view your Member  bi-weekly contribution payment details below.</p>
      <div className='space-y-2 mt-2'>
        <div className='bg-[#F8F8F8] flex flex-col gap-2 p-2.5 rounded-lg mt-4'>
          <div className="flex justify-between">
            <span>Payment Status</span>
            <span className={`px-3 py-0.5 rounded-xl font-medium ${data.data.status === 'completed' ? "text-[#036B26] bg-[#E7F6EC]" : data.data.status === 'upcoming' ? "text-[#92610E] bg-[#FDF1DC]" : "text-red-500 bg-red-100"}`}>{data.data.status === 'completed' ? "Successful" : data.data.status === 'upcoming' ? "Upcoming" : "Pending"}</span>
          </div>
          <div className="flex justify-between">
            <span>Member Name</span>
            <span className='text-[#464749]'>{data.data.squadMemberName || "John Doe"}</span>
          </div>
          <div className="flex justify-between">
            <span>Member Email</span>
            <span className='text-[#464749]'>{data.data.squadMemberEmail || "johndoe@gmail.com"}</span>
          </div>
          <div className="flex justify-between">
            <span>Member ID</span>
            <span className='text-[#464749]'>{data.data.squadMemberId}</span>
          </div>
          <div className="flex justify-between">
            <span>Product</span>
            <span className='text-[#464749]'>Ajosquad</span>
          </div>
          <div className="flex justify-between">
            <span>Description</span>
            <span className='text-[#464749]'>{data.data.description}</span>
          </div>
          <div className="flex justify-between">
            <span>Position</span>
            <span className='text-[#464749]'>{data.data.position || "0"}/10</span>
          </div>
          <div className="flex justify-between">
            <span>Amount</span>
            <span className='text-[#464749] font-bold'>CA$ {data.data.amount}.00</span>
          </div>
          <div className="flex justify-between">
            <span>Payment ID</span>
            <span className='text-[#464749]'>{data.data.bankInformationId}</span>
          </div>
          <div className="flex justify-between">
            <span>Date</span>
            <span className='text-[#464749]'>{formatDate2(data.data.createdAt, true)}</span>
          </div>
        </div>
      </div>
    </div >
  )
}
