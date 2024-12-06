import { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import SearchInput from "../../components/FormInputs/SearchInput";
import Accordion from "../../components/Accordion/Accordion";

const HelpDesk = () => {
  return (
    <main className='py-10 px-3 md:px-6 flex flex-col lg:flex-row lg:justify-between'>
      <div className="flex gap-5 flex-col md:flex-row lg:flex-col lg:w-2/5">
        <div className="md:w-1/2 lg:w-full space-y-5">
          <h3 className="font-semibold text-3xl lg:text-4xl">Chat to us directly</h3>
          <p className="md:text-lg lg:text-xl">"Need help fast? Chat with our support team on WhatsApp for instant assistance."</p>
          <button className="w-full md:w-fit rounded-lg p-0.5 bg-gradient-to-r from-[#23454F] via-[#0066FF] to-[#1EB7CF]">
            <div className="bg-white flex justify-center items-center gap-2 py-2 px-10 rounded-[calc(0.5rem-2px)]">
              <IoLogoWhatsapp size={23} className='text-[#29D616]' />
              <span>Chat Support</span>
            </div>
          </button>
        </div>
        <div className="md:w-1/2 lg:w-full">
          <img src="./HelpDeskImage.svg" alt="" className="w-full lg:w-fit" />
        </div>
      </div>
      <div className="lg:w-1/2 space-y-5">
        <h2 className="font-bold text-[#2B2C34] text-xl">Frequently Asked Questions (FAQs)</h2>
        <SearchInput placeholder="Search...." />
        <Accordion
          title="What is Ajosquad?"
          content="Lorem ipsum dolor sit amet consectetur. et Adipiscing vel consequat ut sit molestie nd tincidunt risus faucibus. Pulvinar dolor ghe  laoreet vel lectus. A natoque faucibus var dignissim venenatis sit duis eu neque bge consectetur. Quis sagittis dui odio eget odio. Ultricies imperdiet duis odio integer tristique neque gravida nec. "
        />
        <Accordion
          title="What is Ajosquad?"
          content="Lorem ipsum dolor sit amet consectetur. et Adipiscing vel consequat ut sit molestie nd tincidunt risus faucibus. Pulvinar dolor ghe  laoreet vel lectus. A natoque faucibus var dignissim venenatis sit duis eu neque bge consectetur. Quis sagittis dui odio eget odio. Ultricies imperdiet duis odio integer tristique neque gravida nec. "
        />
        <Accordion
          title="What is Ajosquad?"
          content="Lorem ipsum dolor sit amet consectetur. et Adipiscing vel consequat ut sit molestie nd tincidunt risus faucibus. Pulvinar dolor ghe  laoreet vel lectus. A natoque faucibus var dignissim venenatis sit duis eu neque bge consectetur. Quis sagittis dui odio eget odio. Ultricies imperdiet duis odio integer tristique neque gravida nec. "
        />
        <Accordion
          title="What is Ajosquad?"
          content="Lorem ipsum dolor sit amet consectetur. et Adipiscing vel consequat ut sit molestie nd tincidunt risus faucibus. Pulvinar dolor ghe  laoreet vel lectus. A natoque faucibus var dignissim venenatis sit duis eu neque bge consectetur. Quis sagittis dui odio eget odio. Ultricies imperdiet duis odio integer tristique neque gravida nec. "
        />
        <Accordion
          title="What is Ajosquad?"
          content="Lorem ipsum dolor sit amet consectetur. et Adipiscing vel consequat ut sit molestie nd tincidunt risus faucibus. Pulvinar dolor ghe  laoreet vel lectus. A natoque faucibus var dignissim venenatis sit duis eu neque bge consectetur. Quis sagittis dui odio eget odio. Ultricies imperdiet duis odio integer tristique neque gravida nec. "
        />
        <Accordion
          title="What is Ajosquad?"
          content="Lorem ipsum dolor sit amet consectetur. et Adipiscing vel consequat ut sit molestie nd tincidunt risus faucibus. Pulvinar dolor ghe  laoreet vel lectus. A natoque faucibus var dignissim venenatis sit duis eu neque bge consectetur. Quis sagittis dui odio eget odio. Ultricies imperdiet duis odio integer tristique neque gravida nec. "
        />
      </div>
    </main>
  )
}

export default HelpDesk


