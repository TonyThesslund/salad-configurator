import { Header } from "./components/Header"
import { Footer } from './Components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col justify-between">
      <Header/>
      <h1 className="text-2xl font-bold mb-8 text-slate-700">
        Welcome to React!
      </h1>

      <Footer/>
    </div>
  );
}

export default App;