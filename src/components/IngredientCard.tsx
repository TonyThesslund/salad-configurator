import { useIngredientStore } from "../store/useIngredientStore";
import { usePriceStore } from "../store/usePriceStore";
import { useAuthStore } from "../store/useAuthStore";

interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  diets?: string[];
  image_url?: string;
}

interface Props {
  ingredient: Ingredient;
}

export const IngredientCard = ({ ingredient }: Props) => {
  const addIngredient = useIngredientStore(
    (state) => state.addIngredient
  );

  const prices = usePriceStore((state) => state.prices);
  const token = useAuthStore((state) => state.token);

  const priceItem = prices.find(
    (p) => p.id === ingredient.id
  );

  return (
    <div
      onClick={() => addIngredient(ingredient)}
         className="flex rounded-2xl overflow-hidden shadow bg-zinc-900 cursor-pointer transition group hover:shadow-lg hover:scale-102 hover:z-10"
    >
      {/* Image section */}
      <div className="w-[30%] h-full flex-shrink-0 bg-zinc-800">
        {ingredient.image_url ? (
          <img
            src={ingredient.image_url}
            alt={ingredient.name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-zinc-700 flex items-center justify-center text-xs text-zinc-400">No Image</div>
        )}
      </div>
      {/* Info section */}
      <div className="flex-1 flex flex-col justify-center px-3 bg-white rounded-r-2xl min-w-0">
        <div className="font-semibold text-sm text-zinc-900 whitespace-normal leading-tight break-words">
          {ingredient.name}
        </div>
        <div className="flex items-center gap-2 mt-1">
          {/* Price */}
          <span className="text-xs font-semibold text-green-600">
            {token
              ? priceItem
                ? `+ ${priceItem.price ?? 0} €`
                : <span className="text-gray-400">No price</span>
              : <span className="text-gray-400">Login to see price</span>
            }
          </span>
          {/* Diet labels */}
          <div className="flex gap-1 flex-wrap">
            {ingredient.diets?.map((diet) => (
              <span
                key={diet}
                className={
                  diet.length > 1
                    ? "font-bold bg-[#A2D135] text-black rounded-full w-4 h-4 flex items-center justify-center text-[0.6rem]"
                    : "font-bold bg-[#A2D135] text-black rounded-full w-4 h-4 flex items-center justify-center text-[0.6rem]"
                }
              >
                {diet}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};