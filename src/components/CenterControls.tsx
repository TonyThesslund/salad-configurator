import { useIngredientStore } from "../store/useIngredientStore";
import trashIcon from "../assets/icons/trash.svg";
import undoIcon from "../assets/icons/undo.svg";
import saveIcon from "../assets/icons/save.svg";

interface CenterControlsProps {
  onOpenSaveModal: () => void;
  handleClearBowl: () => void;
}

export function CenterControls({ onOpenSaveModal, handleClearBowl }: CenterControlsProps) {
  const setBaseType = useIngredientStore((state) => state.setBaseType);
  const baseType = useIngredientStore((state) => state.baseType);

  return (
    <div className="flex gap-4 mb-8 items-center justify-center">
      <button
        onClick={() => setBaseType(1)}
        className={`px-6 py-2 rounded-full font-semibold text-black shadow-sm transition border-2 ${baseType === 1 ? 'bg-[#C7E541] border-[#A2D135]' : 'bg-white border-zinc-200 hover:bg-zinc-100'}`}
      >
        Salaatti
      </button>
      <button
        onClick={() => setBaseType(2)}
        className={`px-6 py-2 rounded-full font-semibold text-black shadow-sm transition border-2 ${baseType === 2 ? 'bg-[#C7E541] border-[#A2D135]' : 'bg-white border-zinc-200 hover:bg-zinc-100'}`}
      >
        Rahka
      </button>
      <button type="button" onClick={handleClearBowl} className="rounded-full bg-zinc-200 hover:bg-zinc-300 w-10 h-10 flex items-center justify-center shadow-sm transition" aria-label="Empty bowl">
        <img src={trashIcon} alt="" aria-hidden="true" className="w-5 h-5" />
      </button>
      <button type="button" onClick={() => alert('Feature coming soon!')} className="rounded-full bg-zinc-200 hover:bg-zinc-300 w-10 h-10 flex items-center justify-center shadow-sm transition" aria-label="Undo">
        <img src={undoIcon} alt="" aria-hidden="true" className="w-5 h-5" />
      </button>
      <button type="button" onClick={onOpenSaveModal} className="rounded-full bg-zinc-200 hover:bg-zinc-300 w-10 h-10 flex items-center justify-center shadow-sm transition" aria-label="Save">
        <img src={saveIcon} alt="" aria-hidden="true" className="w-5 h-5" />
      </button>
    </div>
  );
}
