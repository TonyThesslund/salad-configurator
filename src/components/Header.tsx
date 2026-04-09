import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">
            <div className="w-24 h-24 rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col -mt-2 bg-zinc-800 shadow-lg">
                <p>Fresh Food Factory</p>
                <p>FRESSE</p>
            </div>

            <div className="flex items-center justify-center flex-col">
                <h1>BOWL-LASKURI</h1>
            </div>

            {/* Intentionally commented out. Not sure if this is supposed to be here */}
            {/* <div className="bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md">

            </div> */}

            <div className="bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md">
                <Link to="/community" className="font-bold hover:underline">
                      Saved recipes
                </Link>
                 <Link to="/print" className="font-bold hover:underline">
                  Print
                </Link>
            </div>
            
        </header>
  );
}