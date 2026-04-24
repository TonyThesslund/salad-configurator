import type { ReactNode } from 'react';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose} role="presentation">
			<div
				className="modal-content"
				onClick={(event) => event.stopPropagation()}
				role="dialog"
				aria-modal="true"
			>
				{children}
			</div>
		</div>
	);
}

export default Modal;
