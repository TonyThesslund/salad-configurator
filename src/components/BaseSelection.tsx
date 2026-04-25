import { useIngredientStore } from "../store/useIngredientStore";
import type { Ingredient } from "../types";

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

interface BaseSelectionProps {
  bases: BaseIngredient[];
}

export function BaseSelection({ bases }: BaseSelectionProps) {
  const addIngredient = useIngredientStore((state) => state.addIngredient);
  const selectedBaseId = useIngredientStore((state) => state.slots.base?.id);

  const handleBaseSelect = (base: BaseIngredient) => {
    const mappedBase: Ingredient = {
      id: base.id,
      name: base.name,
      categoryId: base.categoryId,
      price: base.price ?? 0,
    };

    addIngredient(mappedBase);
  };

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        2
      </div>

      <h2 className="mb-6 font-semibold text-lg">Valitse salaattipohja</h2>

      <div className="w-full flex flex-col gap-4">
        {bases.length === 0 ? (
          <p>Ei saatavilla</p>
        ) : (
          bases.map((base) => (
            <button
              key={base.id}
              type="button"
              onClick={() => handleBaseSelect(base)}
              className={`h-12 border-2 rounded-xl flex items-center px-4 transition ${
                selectedBaseId === base.id
                  ? "border-[#A2D135] text-[#A2D135]"
                  : "border-gray-600 hover:border-[#A2D135] hover:text-[#A2D135]"
              }`}
            >
              <span>{base.name}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
