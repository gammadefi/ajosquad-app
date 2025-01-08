import React from 'react'
import { AuthActions, useAuth } from '../../zustand/auth.store';
import clsx from 'clsx';
import { Button } from '../../components/Button/Button';
import { FaArrowRight } from 'react-icons/fa6';

const Product = () => {
    const profile: any = useAuth((s) => s.profile);
    const [selected, setSelected] = React.useState("")
    const [error, setError] = React.useState(false)
    const products = [
        {
            image: "ajo-squad.png",
            title: "AjoSquad",
            description: "Join Ajosquad's Ajo community: Contribute weekly, connect with others, and build financial prosperity together"
        },
        {
            image: "ajo-home.png",
            title: "AjoHome",
            description:"Join AjoHome, Ajosquad's community-driven platform, where you collaborate with like-minded investors to achieve financial success through real estate investing.",
        },
        {
            image: "ajo-business.png",
            title: "AjoBusiness",
            description:"Ajosquad a product that help you grow your finances by a weekly contribution called Ajo",
            comingSoon: true
        }
    ]
    return (
        <div className='px-3 py-20 md:px-12'>

            <h3 className=' text-3xl md:text-5xl font-semibold '>Hi, <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#23454F] via-[#0066FF] to-[#1EB7CF]'>{profile.firstName} {profile.lastName}</span></h3>
            <h5 className='text-base md:text-xl mt-2 text-[#656565]'>You still have a few more step to complete your profile</h5>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mt-8'>
            {
                products.map((product, index) => <ProductCard key={index} {...product} selected={selected === product.title} onClick={(title) => {
                    setSelected(title)
                    if (product.comingSoon) {
                        setError(true)
                    }else{
                        setError(false)
                    }
                }} comingSoon={product?.comingSoon} />)
            }
            </div>


            {
                selected && <Button onClick={() => {
                    AuthActions.setVerified(true)
                    AuthActions.setProduct(selected)
                 }} disabled={error} label='Proceed' className='ml-auto mt-6 w-[270px] h-[48px] flex items-center justify-center' iconPosition='afterText'  icon={<FaArrowRight />} />
            }
           
        </div>
    )
}



export const ProductCard = ({ image, title, description, comingSoon = false, selected = false, onClick = (e) => { } }: { image: string, title: string, description: string, comingSoon?: boolean, selected?: boolean, onClick?: (e: any) => void }) => {
    return (
        <div onClick={() => onClick(title)} className={clsx('w-full p-3 cursor-pointer border-[0.8px] rounded-xl border-[#C8CCD0] h-[252px] flex flex-col gap-5', selected && comingSoon && "border-[#D42620]", selected && !comingSoon && "!border-[#0066FF]")}>
            <div className='h-[80px] w-[125px]'>
            <img className='h-[80px] object-contain w-auto' src={image} alt="" />

            </div>

            <div className='flex justify-between '>
                <h3 className="font-semibold">{title}</h3>
                <h5 className="text-[#FFA000] font-medium">{comingSoon && "Coming soon!!!"}</h5>
            </div>

            <p className='text-xs'>{description}</p>


        </div>
    )
}

export default Product