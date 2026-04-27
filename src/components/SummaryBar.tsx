import React from "react";
import { Link } from "react-router-dom";
import { useIngredientStore } from "../store/useIngredientStore";
import { usePriceStore } from "../store/usePriceStore";
import type { Ingredient } from "../types";
import { calculateTotalWeight, calculateTotalPrice } from "../utils/calculations";

export const SummaryBar: React.FC = () => {
    const slots = useIngredientStore((state) => state.slots);
    const removeIngredient = useIngredientStore((state) => state.removeIngredient);

    const prices = usePriceStore((state) => state.prices);

    const base = slots.base as Ingredient | null;
    const toppings: Ingredient[] = Object.entries(slots)
        .filter(([key, value]) => key !== 'base' && value !== null)
        .map(([_, value]) => value as Ingredient);
    const allIngredients: Ingredient[] = base ? [base, ...toppings] : toppings;

    const totalWeight = calculateTotalWeight(allIngredients);
    const totalPrice = calculateTotalPrice(allIngredients, prices);

    return (
        <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">
            
            {/* Left: Selected Ingredients */}
            <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">Valitut ainesosat</h3>
                    <span className="rounded-full bg-zinc-200 px-4 py-1 text-sm font-semibold text-black">
                        {allIngredients.length} kpl
                    </span>
                </div>
                
                {allIngredients.length === 0 ? (
                    <p className="text-zinc-400">Ei valittuja ainesosia</p>
                ) : (
                    <ul className="space-y-2">
                        {allIngredients.map((item: Ingredient) => (
                            <li 
                                key={item.id} 
                                className="flex items-center justify-between text-sm bg-zinc-700 rounded-xl px-4 py-2"
                            >
                                <span>{item.name}</span>
                                <button
                                    onClick={() => removeIngredient(item.id)}
                                    className="text-red-400 hover:text-red-300 text-lg leading-none w-6 h-6 flex items-center justify-center hover:bg-zinc-600 rounded-full transition-colors"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Right: Totals */}
            <div className="flex-1 flex flex-col justify-center items-center gap-6">
                
                <div className="flex flex-col items-center">
                    <span className="text-sm mb-1">Arvioitu paino</span>
                    <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
                        {totalWeight}g
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm mb-1">Arvioitu hinta</span>
                    <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
                        {totalPrice.toFixed(2)} €
                    </div>
                </div>
                <Link to="/print">
                    <button className="bg-white text-black font-semibold py-2 px-6 rounded-full shadow-md hover:bg-zinc-100 transition-colors">
                        Tulosta
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SummaryBar;

// oli valmiina jo