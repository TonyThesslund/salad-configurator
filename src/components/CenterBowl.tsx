export function CenterBowl() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">
            <div className="flex gap-3 mb-6 items-center">
                <button>Salaatti</button>
                <button>Rahka</button>
                <button>Icon1</button>
                <button>Icon2</button>
                <button>Icon3</button>
            </div>
            <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner relative">

            </div>
            <div className="flex gap-4">
                <p>100g / 1,99€</p>
                <p>500ml</p>
            </div>
        </div>
    );
}