import { useIngredientStore } from "../store/useIngredientStore";
import type { Bowl } from "../types";

interface Props {
  bowls: Bowl[];
}

export function BowlSelection({ bowls }: Props) {
  const setBowl = useIngredientStore((state) => state.setBowl);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">
      
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        1
      </div>

      <h2 className="mb-6 font-semibold text-lg">Valitse rasia</h2>

      <div className="w-full flex flex-col gap-3">
        {bowls.map((bowl) => (
          <button
            key={bowl.id}
            type="button"
            onClick={() => setBowl(bowl)}
            className="w-full h-16 rounded-xl flex items-center gap-4 px-1 text-left transition-colors"
          >
            {bowl.image_url ? (
              <img
                src={bowl.image_url}
                alt={bowl.name}
                className="w-14 h-14 object-contain shrink-0"
                loading="lazy"
              />
            ) : (
              <span
                aria-hidden="true"
                className="w-14 h-14 rounded-full bg-zinc-700 border border-zinc-500 shrink-0"
              />
            )}
            <span
              className={
                selectedBowl?.id === bowl.id
                  ? "text-[#A2D135]"
                  : "text-zinc-100"
              }
            >
              {bowl.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}