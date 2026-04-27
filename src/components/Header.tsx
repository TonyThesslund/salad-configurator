import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import closeMenuIcon from "../assets/icons/close_menu.svg";
import menuIcon from "../assets/icons/menu.svg";
import fresseLogo from "../assets/icons/fresse.png";
import { LoginModal } from "./LoginModal";
import { useAuthStore } from "../store/useAuthStore";
import { usePriceStore } from "../store/usePriceStore";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const userName = useAuthStore((state) => state.userName);
    const logout = useAuthStore((state) => state.logout);

    const token = useAuthStore((state) => state.token);
    const fetchPrices = usePriceStore((state) => state.fetchPrices);
    const isLoggedIn = !!token;

    useEffect(() => {
        if (token) {
            fetchPrices(token);
        }
    }, [token]);

    return (
        <>
        <header className="bg-zinc-800 text-white w-full h-32 flex items-center px-4 sm:px-8 gap-4 sm:gap-8">
            {/* Left: Logo */}
            <div className="flex items-center min-w-0 basis-32 justify-start">
                <img src={fresseLogo} alt="Fresse logo" className="w-24 sm:w-28 h-24 sm:h-28 object-contain shrink-0" />
            </div>

            {/* Center: Title */}
            <div className="flex-1 flex justify-center min-w-0">
                <Link to="/salad-configurator" className="text-2xl sm:text-3xl font-bold outline-none break-words whitespace-normal text-center">
                    BOWL-LASKURI
                </Link>
            </div>

            {/* Right: Menu/User (mirrors left for centering) */}
            <div className="flex items-center gap-2 shrink-0 basis-32 justify-end relative">
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
                        {isLoggedIn ? (
                            <>
                                <p className="font-bold">
                                    Hello, {userName}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="font-bold text-left hover:underline"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
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
                        )}
                        
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
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
}