import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6';


const Accordion = ({ title, content }: { title: string, content: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-[#C8CCD0] rounded-xl">
      <button
        onClick={toggleAccordion}
        className={`p-4 transition-all ${isOpen ? "border-b" : "border-b-0"} duration-300 border-[#C8CCD0] rounded-b-xl flex justify-between items-center w-full py-4`}
      >
        {title}
        <span className={`text-[#464749] transition-transform ${isOpen ? "rotate-180" : ""} duration-300`}>
          <FaChevronDown size={23} />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}
      >
        <div className="p-4 text-[#5A5C5E]">{content}</div>
      </div>
    </div>
  );
};

export default Accordion