import React from 'react'
import { AuthActions, useAuth } from '../../zustand/auth.store';
import Modal from './Modal';
import { ProductCard } from '../../pages/setup/Product';
import { Button } from '../Button/Button';
import { FaArrowRight } from 'react-icons/fa6';

const OurProductModal = ({ open, onClick = () => { } }: { open: boolean, onClick?: () => void }) => {
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
            description: "Join AjoHome, Ajosquad's community-driven platform, where you collaborate with like-minded investors to achieve financial success through real estate investing.",
            comingSoon: true
        },
        {
            image: "ajo-business.png",
            title: "AjoBusiness",
            description: "Ajosquad a product that help you grow your finances by a weekly contribution called Ajo",
            comingSoon: true
        }
    ]


    return (
        <div>
            <Modal open={open} onClick={onClick}>
                <div className='lg:w-[1000px] lg:h-[526px]'>
                <h3 className=' text-3xl md:text-2xl font-semibold '>Select a product</h3>
                <h5 className='text-sm md:text-base mt-2 text-[#656565]'>Yay! You're now verified! Welcome to Ajosquad! Browse our products and discover how we can help you achieve your financial goals. What would you like to explore first?</h5>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mt-8'>
                        {
                            products.map((product, index) => <ProductCard key={index} {...product} selected={selected === product.title} onClick={(title) => {
                                setSelected(title)
                                if (product.comingSoon) {
                                    setError(true)
                                } else {
                                    setError(false)
                                }
                            }} comingSoon={product?.comingSoon} />)
                        }
                    </div>


                    {
                        selected && <Button onClick={() => {
                            AuthActions.setVerified(true)
                            AuthActions.setProduct(selected)
                            onClick()
                        }} disabled={error} label='Proceed' className='mx-auto mt-6 w-[270px] h-[48px] flex items-center justify-center' iconPosition='afterText' icon={<FaArrowRight />} />
                    }

                </div>
            </Modal>

        </div>
    )
}

export default OurProductModal