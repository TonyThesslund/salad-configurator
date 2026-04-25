import { useIngredientStore } from "../store/useIngredientStore";
import type { Ingredient } from "../types";

interface BaseIngredient {
  id: number;
  name: string;
  price?: number;
  type_id?: number;
  base_type_id?: number;
}

interface BaseSelectionProps {
  ingredients: BaseIngredient[];
}

export function BaseSelection({ ingredients }: BaseSelectionProps) {
  const baseType = useIngredientStore((state) => state.baseType);
  const addIngredient = useIngredientStore((state) => state.addIngredient);
  const selectedBaseId = useIngredientStore((state) => state.slots.base?.id);

  const bases = ingredients.filter((ingredient) => {
    const ingredientTypeId = ingredient.type_id ?? ingredient.base_type_id;
    return ingredientTypeId === undefined || ingredientTypeId === baseType;
  });

  const handleBaseSelect = (base: BaseIngredient) => {
    const mappedBase: Ingredient = {
      id: base.id,
      name: base.name,
      categoryId: 6,
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
          bases.map(base => (
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