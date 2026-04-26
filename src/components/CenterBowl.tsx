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

const SLOT_POSITIONS_6 = [
    { top: '15%', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '25%', left: '75%', transform: 'translate(-50%, 0)' },
    { top: '55%', left: '75%', transform: 'translate(-50%, 0)' },
    { top: '65%', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '55%', left: '25%', transform: 'translate(-50%, 0)' },
    { top: '25%', left: '25%', transform: 'translate(-50%, 0)' },
];

const SLOT_POSITIONS_4 = [
    { top: '20%', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '50%', left: '78%', transform: 'translate(-50%, -50%)' },
    { top: '78%', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '50%', left: '22%', transform: 'translate(-50%, -50%)' },
];

export function CenterBowl({ onOpenSaveModal }: CenterBowlProps) {
    const { slots, selectedBowl, clearSelection, clearSlot } = useIngredientStore();

    const DIVIDER_4 = "src/assets/icons/divider_4.png";
    const DIVIDER_6 = "src/assets/icons/divider_6.png";

    const setBaseType = useIngredientStore((state) => state.setBaseType);
    const baseType = useIngredientStore((state) => state.baseType);

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const base = slots['base'] ?? null;

    const activeSlots = Object.entries(slots).filter(
        ([key, value]) => key !== 'base' && value !== null
    ) as [string, Ingredient][];

    const handleClearBowl = () => {
        const shouldClear = window.confirm('Are you sure you want to empty the bowl?');
        if (shouldClear) {
            clearSelection();
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">
            <div className="flex gap-3 mb-6 items-center">
                <button
                    onClick={() => setBaseType(1)}
                    className={baseType === 1 ? "border-2 border-green-500 px-3 py-1 rounded" : "border px-3 py-1 rounded"}
                >
                    Salaatti
                </button>
                <button
                    onClick={() => setBaseType(2)}
                    className={baseType === 2 ? "border-2 border-green-500 px-3 py-1 rounded" : "border px-3 py-1 rounded"}
                >
                    Rahka
                </button>
                <button type="button" onClick={handleClearBowl} className="bg-gray-200 hover:bg-gray-300 rounded p-2" aria-label="Empty bowl">
                    <img src={trashIcon} alt="" aria-hidden="true" className="w-5 h-5 brightness-0" />
                </button>
                <button type="button" onClick={() => alert('Feature coming soon!')} className="bg-gray-200 hover:bg-gray-300 rounded p-2" aria-label="Undo">
                    <img src={undoIcon} alt="" aria-hidden="true" className="w-5 h-5 brightness-0" />
                </button>
                <button type="button" onClick={onOpenSaveModal} className="bg-gray-200 hover:bg-gray-300 rounded p-2" aria-label="Save">
                    <img src={saveIcon} alt="" aria-hidden="true" className="w-5 h-5 brightness-0" />
                </button>
            </div>



            <div className="relative w-80 h-80 flex items-center justify-center">
                {selectedBowl?.image_url && (
                    <img
                        src={selectedBowl.image_url}
                        alt={selectedBowl.shape + ' bowl'}
                        className={
                            selectedBowl.shape === 'square'
                                ? 'absolute inset-0 w-80 h-80 object-contain z-30 pointer-events-none select-none rounded-3xl'
                                : 'absolute inset-0 w-80 h-80 object-contain z-30 pointer-events-none select-none rounded-full'
                        }
                    />
                )}
                <div
                    className={
                        selectedBowl?.image_url
                            ? selectedBowl.shape === 'square'
                                ? 'w-80 h-80 rounded-3xl absolute inset-0 z-10 opacity-0'
                                : 'w-80 h-80 rounded-full absolute inset-0 z-10 opacity-0'
                            : 'w-80 h-80 ' +
                                (selectedBowl?.shape === 'square' ? 'rounded-3xl' : 'rounded-full') +
                                ' border-[12px] border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner relative overflow-hidden z-10'
                    }
                >
                    {!selectedBowl?.image_url && base?.image_url && (
                        <img
                            src={base.image_url}
                            alt={base.name}
                            className="absolute inset-0 w-full h-full object-cover z-10"
                        />
                    )}
                </div>
                {/* Dividers and slots always render above */}
                {selectedBowl && (selectedBowl.slot_count === 4 || selectedBowl.slot_count === 6) && (
                    <img
                        src={selectedBowl.slot_count === 4 ? DIVIDER_4 : DIVIDER_6}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-80 h-80 object-contain z-40 pointer-events-none"
                        style={{ borderRadius: '50%' }}
                    />
                )}
                <div className="absolute inset-0 z-50">
                    {activeSlots.map(([slotKey, ingredient], index) => {
                        const positions = selectedBowl?.slot_count === 4 ? SLOT_POSITIONS_4 : SLOT_POSITIONS_6;
                        const pos = positions[index] ?? positions[0];
                        return (
                            <div
                                key={slotKey}
                                className="absolute group rounded-full overflow-hidden shadow-md w-14 h-14"
                                style={{ top: pos.top, left: pos.left, transform: pos.transform }}
                            >
                                <img
                                    src={ingredient.wedge_image_url || ingredient.image_url}
                                    alt={ingredient.name}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => clearSlot(slotKey)}
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full gap-1"
                                    aria-label={`Poista ${ingredient.name}`}
                                >
                                    <span className="text-white text-xs font-medium leading-tight text-center px-1">{ingredient.name}</span>
                                    <span className="text-white text-xl font-bold leading-none">×</span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex gap-6 mt-4">
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