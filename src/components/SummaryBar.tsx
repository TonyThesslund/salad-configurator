import React from "react";
import { Link } from "react-router-dom";
import { useIngredientStore } from "../store/useIngredientStore";
import type { Ingredient } from "../types";

export const SummaryBar: React.FC = () => {
    const { slots, removeIngredient } = useIngredientStore();

    const activeIngredients = Object.values(slots).filter(
        (i): i is Ingredient => i !== null
    );

    return (
        <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">
            
            {/* Left: Selected Ingredients */}
            <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
                <h3 className="text-lg font-semibold mb-4">
                    Selected ingredients ({activeIngredients.length})
                </h3>
                
                {activeIngredients.length === 0 ? (
                    <p className="text-zinc-400">No ingredients selected</p>
                ) : (
                    <ul className="space-y-2">
                        {activeIngredients.map((item) => (
                            <li 
                                key={item.id} 
                                className="flex items-center justify-between text-sm bg-zinc-700 rounded-xl px-4 py-2"
                            >
                                <span>• {item.name}</span>
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
                    <span className="text-sm mb-1">Total weight</span>
                    <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
                        100g
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm mb-1">Total price</span>
                    <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
                        €0.00
                    </div>
                </div>
                <Link to="/print">
                    <button className="bg-white text-black font-semibold py-2 px-6 rounded-full shadow-md hover:bg-zinc-100 transition-colors">
                        Print
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SummaryBar;