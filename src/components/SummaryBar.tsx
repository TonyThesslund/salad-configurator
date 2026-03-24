import React from "react";

type SummaryBarProps = {
  ingredients?: string[];
  totalWeight?: string;
  totalPrice?: string;
};

export const SummaryBar: React.FC<SummaryBarProps> = ({
  ingredients = [],
  totalWeight = "0g",
  totalPrice = "€0.00",
}) => {
  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">
      
      {/* Left: Selected Ingredients */}
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="text-lg font-semibold mb-4">Selected ingredients</h3>
        
        {ingredients.length === 0 ? (
          <p className="text-zinc-400">No ingredients selected</p>
        ) : (
          <ul className="space-y-2">
            {ingredients.map((item, index) => (
              <li key={index} className="text-sm">
                • {item}
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
            {totalWeight}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-sm mb-1">Total price</span>
          <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
            {totalPrice}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SummaryBar;