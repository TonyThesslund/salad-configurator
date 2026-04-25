import { useState } from "react";
import type { FormEvent } from "react";

import Modal from "./Modal";
import { saveRecipe } from "../services/api";
import { useIngredientStore } from "../store/useIngredientStore";
import { useAuthStore } from "../store/useAuthStore";

type SaveRecipeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SaveRecipeModal({ isOpen, onClose }: SaveRecipeModalProps) {
  const [recipeName, setRecipeName] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const slots = useIngredientStore((state) => state.slots);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const clearSelection = useIngredientStore((state) => state.clearSelection);
  const token = useAuthStore((state) => state.token);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ingredientIds = Object.values(slots)
      .filter((i) => i !== null)
      .map((i: any) => i.id);

    try {
      await saveRecipe(token!, {
        name: recipeName,
        bowlId: selectedBowl?.id ?? 0,
        ingredientIds: ingredientIds,
      });

      alert("Recipe saved!");
      clearSelection();

      setRecipeName("");
      setIsPublic(false);
      onClose();
    } catch (err) {
      console.error("Failed to save recipe:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 min-w-[320px] pt-4"
      >
        <h2 className="text-xl font-semibold">Tallenna resepti</h2>

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
          className="mt-2 rounded-md bg-[#A2D135] px-4 py-2 font-semibold text-black hover:brightness-95"
        >
          Tallenna resepti
        </button>
      </form>
    </Modal>
  );
}

export default SaveRecipeModal;
