import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import closeMenuIcon from '../assets/icons/close_menu.svg';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
		<div
			className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
			role="presentation"
		>
			<div
				className="bg-white text-zinc-900 rounded-lg shadow-lg p-4 relative"
				onClick={(event) => event.stopPropagation()}
				role="dialog"
				aria-modal="true"
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-2 right-2 p-1"
					aria-label="Close modal"
				>
					<img
						src={closeMenuIcon}
						alt=""
						aria-hidden="true"
						className="w-5 h-5 filter brightness-0"
					/>
				</button>
				{children}
			</div>
		</div>,
		document.body
	);
}

export default Modal;
