import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BaseSelection } from "./components/BaseSelection";
import { BowlSelection } from "./components/BowlSelection";
import { CenterBowl } from "./components/CenterBowl";
import { IngredientSelection } from "./components/IngredientSelection";
import { SummaryBar} from "./components/SummaryBar";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header/>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
        <div className="flex">
          <BowlSelection/>
          <CenterBowl/>
          <BaseSelection/>
        </div>
        <IngredientSelection/>
        <SummaryBar/>
      </main>

      <Footer/>
    </div>
  );
}

export default App;