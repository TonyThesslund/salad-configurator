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
      weight_grams: base.weight_grams,
      image_url: base.image_url,
      wedge_image_url: base.wedge_image_url,
      barcode_url: base.barcode_url,
    };

    addIngredient(mappedBase);
  };

  return (
    <div className="bg-zinc-800 rounded-[3rem] pt-3 pb-6 px-3 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        2
      </div>

      <h2 className="mb-6 font-semibold text-lg">Valitse salaattipohja</h2>

      <div className="w-full flex flex-col gap-3">
        {bases.length === 0 ? (
          <p>Ei saatavilla</p>
        ) : (
          bases.map((base) => (
            <button
              key={base.id}
              type="button"
              onClick={() => handleBaseSelect(base)}
              className={`h-14 relative flex items-center px-4 rounded-xl transition text-left bg-transparent border-0 ${
                selectedBaseId === base.id
                  ? "text-[#A2D135]"
                  : "text-white hover:text-[#A2D135]"
              }`}
            >
              <span className="text-base text-left break-words pr-16 block w-full">
                {base.name}
              </span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                {base.image_url ? (
                  <img
                    src={base.image_url}
                    alt={base.name}
                    className="w-12 h-12 rounded-full object-cover shadow"
                    loading="lazy"
                  />
                ) : (
                  <span className="w-12 h-12 rounded-full bg-zinc-700 border border-zinc-500" aria-hidden="true" />
                )}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
