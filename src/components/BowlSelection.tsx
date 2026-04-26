import { useIngredientStore } from "../store/useIngredientStore";
import type { Bowl } from "../types";

interface Props {
  bowls: Bowl[];
}

export function BowlSelection({ bowls }: Props) {
  const setBowl = useIngredientStore((state) => state.setBowl);
  const selectedBowlId = useIngredientStore((state) => state.slots.bowl?.id);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">
      
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        1
      </div>

      <h2 className="mb-6 font-semibold text-lg">Valitse rasia</h2>

      <div className="w-full flex flex-col gap-4">
        {bowls.map((bowl) => (
          <button
            key={bowl.id}
            type="button"
            onClick={() => setBowl(bowl)}
            className={`h-12 border-2 rounded-xl flex items-center px-4 transition ${
              selectedBowlId === bowl.id
              ? "border-[#A2D135] text-[#A2D135]"
              : "border-gray-600 hover:border-[#A2D135] hover:text-[#A2D135]"
            }`}
          >
            <span>{bowl.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}