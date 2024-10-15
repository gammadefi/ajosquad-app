import React from "react";

interface ICB extends React.InputHTMLAttributes<HTMLInputElement> {
	type?: "text" | "number"|"date";
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	value: string;
	error?: string;
}

export const TextInput = ({
	type = "text",
	onChange = () => {},
	placeholder,
	value,
	error = "",
	...props
}: ICB) => {
	return (
		<div className="w-full">
			<input
				{...props}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				style={{ borderColor: "#E3E8EE" }}
				className="h-10 border inline-block focus:outline-none placeholder-gray-300 w-full rounded shadow font-normal text-sm text-pc-grey5 py-1 px-3"
			/>
			{error && <span className="block mt-1 text-red-400 text-xs">{error}</span>}
		</div>
	);
};


