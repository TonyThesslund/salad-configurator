import { useState } from 'react';
import { useIngredientStore } from '../store/useIngredientStore';
import { usePriceStore } from '../store/usePriceStore';
import { calculateTotalWeight, calculateTotalPrice } from '../utils/calculations';
import type { Ingredient } from '../types';
import trashIcon from '../assets/icons/trash.svg';
import undoIcon from '../assets/icons/undo.svg';
import saveIcon from '../assets/icons/save.svg';
import SaveRecipeModal from './SaveRecipeModal';

interface BaseIngredient {
    id: number;
    name: string;
    categoryId: number;
    price?: number;
    weight_grams?: number;
    image_url?: string;
    wedge_image_url?: string;
    barcode_url?: string;
}

interface CenterBowlProps {
    onOpenSaveModal: () => void;
    baseIngredients: BaseIngredient[];
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

export function CenterBowl({ onOpenSaveModal, baseIngredients }: CenterBowlProps) {
    const { slots, selectedBowl, clearSelection, clearSlot } = useIngredientStore();
    const prices = usePriceStore((state) => state.prices);

    const DIVIDER_4 = "src/assets/icons/divider_4.png";
    const DIVIDER_6 = "src/assets/icons/divider_6.png";

    const setBaseType = useIngredientStore((state) => state.setBaseType);
    const baseType = useIngredientStore((state) => state.baseType);

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const baseSlot = slots['base'] ?? null;
    const base = baseSlot && baseIngredients
        ? baseIngredients.find(b => b.id === baseSlot.id) || null
        : null;

    const activeSlots = Object.entries(slots).filter(
        ([key, value]) => key !== 'base' && value !== null
    ) as [string, Ingredient][];

    const allIngredients = base ? [base, ...activeSlots.map(([_, ingredient]) => ingredient)] : activeSlots.map(([_, ingredient]) => ingredient);
    const totalWeight = calculateTotalWeight(allIngredients);
    const totalPrice = calculateTotalPrice(allIngredients, prices);

    const handleClearBowl = () => {
        const shouldClear = window.confirm('Are you sure you want to empty the bowl?');
        if (shouldClear) {
            clearSelection();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white py-8">
            {/* Top controls */}
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



            <div className="relative w-80 h-80 flex items-center justify-center mx-auto">
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

                {base?.image_url && (
                    <div
                        className={
                            selectedBowl?.shape === 'square'
                                ? 'absolute left-1/2 top-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 z-35 pointer-events-none select-none rounded-[4rem] overflow-hidden'
                                : 'absolute left-1/2 top-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 z-35 pointer-events-none select-none rounded-full overflow-hidden'
                        }
                        style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.18))' }}
                    >
                        {/* Salad base image with edge blur/darkening */}
                        <img
                            src={base.image_url}
                            alt={base.name}
                            className="w-full h-full object-cover"
                            style={{ filter: 'brightness(0.97)' }}
                        />
                        {/* Edge vignette for base image */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%)'
                            }}
                        />
                        {/* Bottom shadow/gradient for base image */}
                        <div
                            className="absolute left-0 right-0 bottom-0 h-1/2 pointer-events-none"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.22) 100%)'
                            }}
                        />
                    </div>
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

            <div className="flex justify-between w-80 mt-4 text-black text-base font-medium">
                <span>{totalWeight} g / {totalPrice.toFixed(2)} €</span>
                <span>{selectedBowl ? selectedBowl.volume : 0} ml</span>
            </div>

            <SaveRecipeModal
                isOpen={isSaveModalOpen}
                onClose={() => setIsSaveModalOpen(false)}
            />
        </div>
    );
}