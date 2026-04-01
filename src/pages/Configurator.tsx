import { BaseSelection } from "../components/BaseSelection";
import { BowlSelection } from "../components/BowlSelection";
import { CenterBowl } from "../components/CenterBowl";
import { IngredientSelection } from "../components/IngredientSelection";
import { SummaryBar } from "../components/SummaryBar";

export default function Configurator() {
  return (
    <div className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
      <div className="flex">
        <BowlSelection />
        <CenterBowl />
        <BaseSelection />
      </div>
      <IngredientSelection />
      <SummaryBar />
    </div>
  );
}
