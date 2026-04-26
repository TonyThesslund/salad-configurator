import type { PriceListItem } from "../store/usePriceStore";

export function calculateTotalPrice(ingredients: Ingredient[], prices: any[]): number {
  return ingredients.reduce((sum, item) => {
    const priceItem = prices.find((p) => (p.id === item.id || p.item_id === item.id));
    return sum + (priceItem ? priceItem.price : 0);
  }, 0);
}
import type { Ingredient } from "../types";

export function calculateTotalWeight(ingredients: Ingredient[]): number {
  return ingredients.reduce(
    (sum, ingredient) => sum + (ingredient.weight_grams ?? 0),
    0
  );
}
