import React from 'react'

const ReferralRules = () => {
  return (
    <div>
        <h3 className='text-base md:text-xl font-semibold'>Share the Savings, Earn Rewards!</h3>

        <div className='my-8'>
            <h3 className='text-lg font-semibold'>How it works</h3>
            <ul className='list-disc mt-3 pl-5' >
                <li>Refer a Friend: Invite your friends, family, or colleagues to join Ajosquad.</li>
                <li>Earn Points: For each successful referral, you'll receive 5 points.</li>
                <li>Redeem Rewards: Once you accumulate 50 points, you can redeem them for a $50 cash reward.</li>
            </ul>
        </div>
        <div className='my-8'>
            <h3 className='text-lg font-semibold'>Terms and Conditions</h3>
            <ul className='list-disc mt-3 pl-5' >
                <li>Referrals must sign up using your unique referral link or code to qualify.</li>
                <li>To be considered a successful referral, the person referred must complete their registration and make their first savings contribution.</li>
                <li>Points will be credited to your account automatically upon successful referral completion.</li>
                <li>Points can only be redeemed once it gets to 50points then a fresh point cycle begins.</li>
                <li>Points expire after 12 months and existing points cannot be rolled over after 12 months of first referral</li>
                <li>Ajosquad reserves the right to amend or terminate the referral program at any time.</li>
            </ul>
        </div>
    </div>
  )
}

export default ReferralRules