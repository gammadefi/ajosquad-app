import React ,{ useEffect } from "react";
import { useKeyPress } from "../../hooks/useKeyPress";

interface ISearch {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	value?: string;
	onSubmit?: () => void;
	onClear?: () => void;
	className?: string;
}

const SearchInput = ({
	onChange,
	placeholder,
	value = "",
	onSubmit = () => {},
	onClear = () => {},
	className,
}: ISearch) => {


	return (
		<div
			className="h-10 relative border-[#C8CCD0]  bg-[#F5F5F9] px-3 border-[0.4px] shadow-sm rounded-md md:w-full md:flex items-center"
		>
			<img
				src="/icons/close.svg"
				className="w-2 text-pc-grey9 cursor-pointer absolute"
				onClick={onClear}
				style={{ right: "23px", top: "50%", transform: "translateY(-50%)" }}
				alt=""
			/>
			<div className="flex flex-1 h-full items-center">
				<img
					src="/icons/search-normal.svg"
					className="w-4 mr-1"
					alt=""
				/>
				<input
					onChange={onChange}
					placeholder={placeholder}
					value={value}
					type="text"
					onSubmit={onSubmit}
					className="flex-1 h-full md:w-72 outline-none bg-transparent border-none hover:sh focus:border-none focus:shadow-none focus:outline-none text-sm placeholder-gray-400 text-gray-400 focus:ring-0 py-1 px-2"
				/>
			</div>
			
		</div>
	);
};

export default SearchInput;
