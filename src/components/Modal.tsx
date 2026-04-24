import type { ReactNode } from 'react';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
			onClick={onClose}
			role="presentation"
		>
			<div
				className="bg-white rounded-lg shadow-lg p-4 relative"
				onClick={(event) => event.stopPropagation()}
				role="dialog"
				aria-modal="true"
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-2 right-2 text-sm leading-none"
					aria-label="Close modal"
				>
					X
				</button>
				{children}
			</div>
		</div>
	);
}

export default Modal;
