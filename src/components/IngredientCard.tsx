import { useIngredientStore } from "../store/useIngredientStore";

interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  diets?: string[];
}

interface Props {
  ingredient: Ingredient;
}

export const IngredientCard = ({ ingredient }: Props) => {
  const addIngredient = useIngredientStore(
    (state) => state.addIngredient
  );

  return (
    <div
      onClick={() => addIngredient(ingredient)}
      className="w-30 h-17 border rounded-md shadow-sm p-2 flex flex-col justify-between items-center hover:shadow-md transition cursor-pointer"
    >
      {/* Nimi */}
      <div className="text-xs font-semibold text-center break-words">
        {ingredient.name}
      </div>

      {/* Diet labels */}
      <div className="flex justify-center gap-1 flex-wrap">
        {ingredient.diets?.map((diet) => (
          <span
            key={diet}
            className="text-[0.6rem] bg-green-100 text-green-700 px-1 py-0.5 rounded"
          >
            {diet}
          </span>
        ))}
      </div>
    </div>
  );
};