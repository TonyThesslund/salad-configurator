import { useIngredientStore } from "../store/useIngredientStore";

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

  const bases = ingredients.filter((ingredient) => {
    const ingredientTypeId = ingredient.type_id ?? ingredient.base_type_id;
    return ingredientTypeId === undefined || ingredientTypeId === baseType;
  });

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
              className="h-12 border-2 border-gray-600 rounded-xl flex items-center px-4 hover:border-[#A2D135] hover:text-[#A2D135] transition"
            >
              <span>{base.name}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}