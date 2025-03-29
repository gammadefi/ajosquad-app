import React, { FunctionComponent, useRef } from "react";
import useOnClickOutside from "../../hooks/useClickOutside";

interface ModalPropsInterface {
	onClick?: () => void;
	children: React.ReactNode;
	open:boolean;
	showCloseButton?:boolean
}

const Modal: FunctionComponent<ModalPropsInterface> = ({ children, onClick = () => {}, open, showCloseButton = true }) => {
	const modalRef = useRef<any>();

	useOnClickOutside(modalRef, () => {
		onClick();
	});

	return (
		<>
		{open && (
			<div className="modal-background fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-70 z-[90]">
			<div className="flex items-center justify-around min-w-44 h-screen">
				<div
					ref={modalRef}
					className="modal items-center align-middle  bg-white rounded"
				>
					{
						showCloseButton && <div className="modal-head flex justify-between items-center px-1 py-1 ">
						<button
							onClick={onClick}
							type="button"
							className="focus:outline-none ml-auto focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					}
					
					<div className="modal-body p-5 overflow-y-auto rounded-xl">{children}</div>
				</div>
			</div>
		</div>
		)}
		</>
		
	);
};

export default Modal;
