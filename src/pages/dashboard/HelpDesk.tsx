import { IoLogoWhatsapp } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Accordion from "../../components/Accordion/Accordion";
import { faqs } from "../../utils/faq";
import { useMemo, useState } from "react";

const HelpDesk = () => {
  const [query, setQuery] = useState("");

  const processedFaqs = useMemo(() => {
    return [...faqs]
      .filter(item => item.question.toLowerCase().includes(query.toLowerCase().trim()))
  }, [query]);

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
        <div className="flex gap-4 items-center py-2 pl-3 pr-5 rounded-lg border border-[#C8CCD0]">
          <input type="text" placeholder="Search"  value={query}
        onChange={(e) => setQuery(e.target.value)} className="p-1 w-full focus:outline-none" />
          <button>
            <CiSearch size={24} />
          </button>
        </div>
        {
          processedFaqs.map((faq) => (
            <Accordion key={faq.question} question={faq.question} answer={faq.answer} />
          ))
        }
      </div>
    </main>
  )
}

export default HelpDesk


