import { useState } from "react";
import { Link } from "react-router-dom";
import closeMenuIcon from "../assets/icons/close_menu.svg";
import menuIcon from "../assets/icons/menu.svg";
import fresseLogo from "../assets/icons/fresse.png";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-zinc-800 text-white w-full h-32 flex items-center px-8 gap-8 relative">

            <img src={fresseLogo} alt="Fresse logo" className="w-28 h-28 object-contain shrink-0" />

            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold">BOWL-LASKURI</h1>

            <div className="ml-auto flex items-center gap-2 shrink-0 relative">
                <button
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="p-2 rounded-md border border-zinc-600 hover:bg-zinc-700"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    <img
                        src={isMenuOpen ? closeMenuIcon : menuIcon}
                        alt=""
                        aria-hidden="true"
                        className="w-6 h-6"
                    />
                </button>

                {isMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md z-50">
                        <Link to="/community" className="font-bold hover:underline">
                            Saved recipes
                        </Link>
                        <Link to="/print" className="font-bold hover:underline">
                            Print
                        </Link>
                    </div>
                )}
            </div>
            
        </header>
  );
}