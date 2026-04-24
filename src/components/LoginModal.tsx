import { useState } from "react";
import type { FormEvent } from "react";
import Modal from "./Modal";

type LoginModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("Login clicked");
		setEmail("");
		setPassword("");
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-[320px] pt-4">
				<h2 className="text-xl font-semibold">Kirjaudu sisään</h2>

				<label htmlFor="login-email" className="flex flex-col gap-1 text-sm font-medium">
					Sähköposti
					<input
						id="login-email"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						className="rounded-md border border-zinc-300 px-3 py-2"
						placeholder="sinä@example.com"
						required
					/>
				</label>

				<label htmlFor="login-password" className="flex flex-col gap-1 text-sm font-medium">
					Salasana
					<input
						id="login-password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						className="rounded-md border border-zinc-300 px-3 py-2"
						placeholder="Syötä salasanasi"
						required
					/>
				</label>

				<button
					type="submit"
					className="mt-2 rounded-md bg-[#A2D135] px-4 py-2 font-semibold text-black hover:brightness-95"
				>
					Kirjaudu sisään
				</button>
			</form>
		</Modal>
	);
}

export default LoginModal;
