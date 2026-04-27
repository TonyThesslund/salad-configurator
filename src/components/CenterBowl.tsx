import { useState } from 'react';
import { useIngredientStore } from '../store/useIngredientStore';
import { usePriceStore } from '../store/usePriceStore';
import { calculateTotalWeight, calculateTotalPrice } from '../utils/calculations';
import type { Ingredient } from '../types';
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
    baseIngredients: BaseIngredient[];
}

/* ---------------------------------------------
   Dynamic circular slot positioning
---------------------------------------------- */
function generateCircularPositions(count: number) {
    const radius = 25; // % distance from center
    const angleOffset = -90; // start at top

    return Array.from({ length: count }, (_, i) => {
        const angle = angleOffset + (360 / count) * i;
        const rad = (angle * Math.PI) / 180;

        return {
            top: `${50 + radius * Math.sin(rad)}%`,
            left: `${50 + radius * Math.cos(rad)}%`,
            transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`
        };
    });
}

export function CenterBowl({ baseIngredients }: CenterBowlProps) {
    const { slots, selectedBowl, clearSlot } = useIngredientStore();
    const prices = usePriceStore((state) => state.prices);

    const DIVIDER_4 = "src/assets/icons/divider_4.png";
    const DIVIDER_6 = "src/assets/icons/divider_6.png";

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const baseSlot = slots['base'] ?? null;
    const base = baseSlot && baseIngredients
        ? baseIngredients.find(b => b.id === baseSlot.id) || null
        : null;

    const activeSlots = Object.entries(slots).filter(
        ([key, value]) => key !== 'base' && value !== null
    ) as [string, Ingredient][];

    const allIngredients = base
        ? [base, ...activeSlots.map(([_, ingredient]) => ingredient)]
        : activeSlots.map(([_, ingredient]) => ingredient);

    const totalWeight = calculateTotalWeight(allIngredients);
    const totalPrice = calculateTotalPrice(allIngredients, prices);

    const slotCount = selectedBowl?.slot_count || 6;
    const positions = generateCircularPositions(slotCount);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white py-8">

            <div className="relative w-80 h-80 flex items-center justify-center mx-auto" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))' }}>
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
                        <img
                            src={base.image_url}
                            alt={base.name}
                            className="w-full h-full object-cover"
                            style={{ filter: 'brightness(0.97)' }}
                        />

                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%)'
                            }}
                        />

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

                <div className="absolute inset-0 z-50">
                    {activeSlots.map(([slotKey, ingredient], index) => {
                        const pos = positions[index];

                        return (
                            <div
                                key={slotKey}
                                className="absolute group w-27 h-37"
                                style={{
                                    top: pos.top,
                                    left: pos.left,
                                    transform: pos.transform
                                }}
                            >
                                <img
                                    src={ingredient.wedge_image_url || ingredient.image_url}
                                    alt={ingredient.name}
                                    className="w-full h-full object-cover"
                                />

                                <button
                                    onClick={() => clearSlot(slotKey)}
                                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label={`Poista ${ingredient.name}`}
                                >
                                    <span className="text-white text-xl font-medium leading-tight text-center text-shadow-lg/50 px-1">
                                        {ingredient.name}
                                    </span>

                                    <span className="text-red-500 text-6xl text-shadow-lg/50 font-bold leading-none">×</span>
                                </button>
                            </div>
                        );
                    })}
                </div>

                {selectedBowl && (slotCount === 4 || slotCount === 6) && (
                    <img
                        src={slotCount === 4 ? DIVIDER_4 : DIVIDER_6}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-80 h-80 object-contain z-60 pointer-events-none"
                        style={slotCount === 4 ? { borderRadius: '50%', transform: 'rotate(45deg)' } : { borderRadius: '50%' }}
                    />
                )}
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
