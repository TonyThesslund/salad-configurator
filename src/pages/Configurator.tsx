import { useEffect, useMemo, useState } from "react";

import {
  getBaseIngredients,
  getBowls,
  getCategories,
  getIngredients,
} from "../services/api";

import { BaseSelection } from "../components/BaseSelection";
import { BowlSelection } from "../components/BowlSelection";
import { CenterBowl } from "../components/CenterBowl";
import { IngredientSelection } from "../components/IngredientSelection";
import { SaveRecipeModal } from "../components/SaveRecipeModal";
import { SummaryBar } from "../components/SummaryBar";
import { CenterControls } from "../components/CenterControls";

import { useIngredientStore } from "../store/useIngredientStore";
import type { Bowl } from "../types";
interface Category {
  id: number;
  name: string;
  size: string;
  base_type_id: number;
}

interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
  price: number;
}

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

export default function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [saladBases, setSaladBases] = useState<BaseIngredient[]>([]);

  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [isSaveRecipeModalOpen, setIsSaveRecipeModalOpen] = useState(false);

  // Clear bowl handler for CenterControls
  const clearSelection = useIngredientStore((state) => state.clearSelection);
  const handleClearBowl = () => {
    const shouldClear = window.confirm('Are you sure you want to empty the bowl?');
    if (shouldClear) {
      clearSelection();
    }
  };

  const baseType = useIngredientStore((state) => state.baseType);
  
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoadingInitial(true);
      try {
        await Promise.all([
          getIngredients<Ingredient[]>().then(setIngredients),
          getBaseIngredients<BaseIngredient[]>().then(setSaladBases),
        ]);
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
      } finally {
        setIsLoadingInitial(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchContextualData = async () => {
      setIsLoadingCategories(true);
      setCategoriesError(null);

      try {
        const [bowlsData, categoriesData] = await Promise.all([
          getBowls<Bowl[]>(baseType),
          getCategories<Category[]>(baseType)
        ]);
        setBowls(bowlsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to fetch contextual data:", err);
        setCategoriesError("Failed to fetch categories");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchContextualData();
  }, [baseType]);

  const bases = useMemo<BaseIngredient[]>(() => {
    if (baseType === 1) {
      return saladBases;
    }
    return ingredients
      .filter((ing) => ing.categoryId === 1)
      .map((ing) => ({
        id: ing.id,
        name: ing.name,
        categoryId: ing.categoryId,
        price: ing.price,
      }));
  }, [baseType, saladBases, ingredients]);

  if (isLoadingInitial) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-600">Ladataan...</p>
      </div>
    );
  }

return (
<div className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
    <CenterControls
    onOpenSaveModal={() => setIsSaveRecipeModalOpen(true)}
    handleClearBowl={handleClearBowl}
    />

    <div className="flex flex-col gap-6 lg:flex-row">

    {/* BowlSelection */}
    <div className="order-2 lg:order-1 w-full lg:w-auto lg:flex-[1]">
      <BowlSelection bowls={bowls} />
    </div>

    {/* CenterBowl */}
    <div className="order-1 lg:order-2 w-full lg:flex-[2] min-h-[464px]">
      <CenterBowl baseIngredients={saladBases} />
    </div>

    {/* BaseSelection */}
    <div className="order-3 lg:order-3 w-full lg:w-auto lg:flex-[1] ">
      {baseType === 2 ? (
        <div className="bg-zinc-800 rounded-[3rem] pt-3 pb-6 px-3 text-white w-full flex flex-col items-center shadow-lg min-h-[464px]">
            <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
             2
            </div>

            <h2 className="mb-6 font-semibold text-lg">
              Valitse salaattipohja
            </h2>

            <div className="flex flex-1 items-center justify-center text-sm text-gray-400 text-center px-4">
             No base options for quark
            </div>
        </div>
      ) : (
        <BaseSelection bases={bases} />
      )}
    </div>
  </div>

  <IngredientSelection
    categories={categories}
    ingredients={ingredients}
    isLoadingCategories={isLoadingCategories}
    categoriesError={categoriesError}
  />

  <SummaryBar />

  <SaveRecipeModal isOpen={isSaveRecipeModalOpen} onClose={() => setIsSaveRecipeModalOpen(false)}/>
</div>
);
}
