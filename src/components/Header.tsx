import { useState } from "react";
import { Link } from "react-router-dom";
import closeMenuIcon from "../assets/icons/close_menu.svg";
import menuIcon from "../assets/icons/menu.svg";
import { LoginModal } from "./LoginModal";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <header className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4 items-center">
            <div className="w-24 h-24 rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col -mt-2 bg-zinc-800 shadow-lg">
                <p>Fresh Food Factory</p>
                <p>FRESSE</p>
            </div>

            <div className="flex items-center justify-center flex-col">
                <h1>BOWL-LASKURI</h1>
            </div>

            <div className="flex flex-col items-end gap-2 min-w-[200px]">
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
                    <div className="bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md">
                        <button
                            type="button"
                            onClick={() => {
                                setIsLoginOpen(true);
                                setIsMenuOpen(false);
                            }}
                            className="font-bold text-left hover:underline"
                        >
                            Kirjaudu sisään
                        </button>
                        <Link to="/community" className="font-bold hover:underline">
                            Saved recipes
                        </Link>
                        <Link to="/print" className="font-bold hover:underline">
                            Print
                        </Link>
                    </div>
                )}
            </div>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
            
        </header>
  );
}