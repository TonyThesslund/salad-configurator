import { useState } from 'react';
import { useIngredientStore } from '../store/useIngredientStore';
import type { Ingredient } from '../types';
import trashIcon from '../assets/icons/trash.svg';
import undoIcon from '../assets/icons/undo.svg';
import saveIcon from '../assets/icons/save.svg';
import SaveRecipeModal from './SaveRecipeModal';

interface CenterBowlProps {
    onOpenSaveModal: () => void;
}

export function CenterBowl({ onOpenSaveModal }: CenterBowlProps) {
    const { slots, selectedBowl, clearSelection } = useIngredientStore();

    const DIVIDER_4 = "https://www.cc.puv.fi/~asa/fresh/images/jakaja_4_lohkoa.png";
    const DIVIDER_6 = "https://www.cc.puv.fi/~asa/fresh/images/jakaja_6_lohkoa.png";

    const setBaseType = useIngredientStore((state) => state.setBaseType);
    const baseType = useIngredientStore((state) => state.baseType);

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const base = slots['base'] ?? null;

    const activeIngredients = Object.entries(slots)
        .filter(([key]) => key !== 'base')
        .map(([, value]) => value)
        .filter((i): i is Ingredient => i !== null);

    const handleClearBowl = () => {
        const shouldClear = window.confirm('Are you sure you want to empty the bowl?');
        if (shouldClear) {
            clearSelection();
        }
    };

    const slotCount = selectedBowl?.slot_count ?? 0;

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">
            <div className="flex gap-3 mb-6 items-center">
                <button
                    onClick={() => setBaseType(1)}
                    className={
                        baseType === 1
                            ? "border-2 border-green-500 px-3 py-1 rounded"
                            : "border px-3 py-1 rounded"
                    }
                >
                    Salaatti
                </button>

                <button
                    onClick={() => setBaseType(2)}
                    className={
                        baseType === 2
                            ? "border-2 border-green-500 px-3 py-1 rounded"
                            : "border px-3 py-1 rounded"
                    }
                >
                    Rahka
                </button>

                <button
                    type="button"
                    onClick={handleClearBowl}
                    className="bg-gray-200 hover:bg-gray-300 rounded p-2"
                    aria-label="Empty bowl"
                >
                    <img src={trashIcon} alt="" aria-hidden="true" className="w-5 h-5 brightness-0" />
                </button>

                <button
                    type="button"
                    onClick={() => alert('Feature coming soon!')}
                    className="bg-gray-200 hover:bg-gray-300 rounded p-2"
                    aria-label="Undo"
                >
                    <img src={undoIcon} alt="" aria-hidden="true" className="w-5 h-5 brightness-0" />
                </button>

                <button
                    type="button"
                    onClick={onOpenSaveModal}
                    className="bg-gray-200 hover:bg-gray-300 rounded p-2"
                    aria-label="Save"
                >
                    <img src={saveIcon} alt="" aria-hidden="true" className="w-5 h-5 brightness-0" />
                </button>
            </div>

            <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner relative overflow-hidden">
                {base?.image_url && (
                    <img
                        src={base.image_url}
                        alt={base.name}
                        className="absolute inset-0 w-full h-full object-cover z-10"
                    />
                )}

                {selectedBowl && (selectedBowl.slot_count === 4 || selectedBowl.slot_count === 6) && (
                    <img
                        src={selectedBowl.slot_count === 4 ? DIVIDER_4 : DIVIDER_6}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
                    />
                )}

                <div className="relative z-30 flex flex-wrap gap-2 justify-center max-w-[240px]">
                    {activeIngredients.map((ingredient) => (
                        <div
                            key={ingredient.id}
                            className="bg-white px-4 py-1.5 rounded-full text-sm shadow-sm border border-gray-100"
                        >
                            {ingredient.name}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-4">
                <p>100g / 1,99€</p>
                <p>{selectedBowl ? selectedBowl.volume : 0} ml</p>
            </div>

            <SaveRecipeModal
                isOpen={isSaveModalOpen}
                onClose={() => setIsSaveModalOpen(false)}
            />
        </div>
    );
}