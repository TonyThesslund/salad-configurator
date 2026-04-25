import { useState } from "react";
import type { FormEvent } from "react";
import Modal from "./Modal";

type SaveRecipeModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function SaveRecipeModal({ isOpen, onClose }: SaveRecipeModalProps) {
    const [recipeName, setRecipeName] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("Recipe Name:", recipeName);
        console.log("Make Public:", isPublic);

        setRecipeName("");
        setIsPublic(false);

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 min-w-[320px] pt-4"
            >
                <h2 className="text-x1 font-semibold">
                    Tallenna resepti
                </h2>

                <label className="flex flex-col gap-1 text-sm font-medium">
                    Reseptin nimi
                    <input
                        type="text"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        className="rounded-md border border-zinc-300 px-3 py-2"
                        placeholder="Syötä reseptin nimi"
                        required
                    />
                </label>

                <label className="flex items-center gap-2 text-sm font-medium">
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                    />
                    Julkaise
                </label>

                <button
                    type="submit"
                    className="mt-2 rounded-md bg[#A2D135] px-4 py-2 font-semibold text-black hover:brightness-95"
                >
                    Tallenna resepti
                </button>
            </form>    
        </Modal>
    );
}

export default SaveRecipeModal;