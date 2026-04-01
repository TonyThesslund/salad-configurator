import { useState, useEffect } from "react";

import { BaseSelection } from "../components/BaseSelection";
import { BowlSelection } from "../components/BowlSelection";
import { CenterBowl } from "../components/CenterBowl";
import { IngredientSelection } from "../components/IngredientSelection";
import { SummaryBar } from "../components/SummaryBar";

interface Bowl {
  id: number;
  name: string;
  size: string;
}

interface Category {
  id: number;
  name: string;
  size: string;
}

interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
  price: number;
}

export default function Configurator() {

  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {

  }, []);

  return (
    <div className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
      <div className="flex">
        <BowlSelection bowls={bowls}/>
        <CenterBowl />
        <BaseSelection />
      </div>
      <IngredientSelection categories={categories} ingredients={ingredients}/>
      <SummaryBar />
    </div>
  );
}
