interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
  price: number;
}

interface BaseSelectionProps {
  ingredients: Ingredient[];
}

export function BaseSelection({ ingredients }: BaseSelectionProps) {
  const baseNames = [
    "Kuninkaallinen salaattimix",
    "Saariston salaattisekoitus",
    "Salaattimix rose",
    "Jäävuorisalaatti leikattu",
    "Provensaalisalaatti"
  ];

  const bases = ingredients.filter(i => baseNames.includes(i.name));

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        2
      </div>

      <h2 className="mb-6 font-semibold text-lg">Valitse salaattipohja</h2>

      <div className="w-full flex flex-col gap-4">
        {bases.length === 0 ? (
          <p>Ei saatavilla</p>
        ) : (
          bases.map(base => (
            <button
              key={base.id}
              className="h-12 border-2 border-gray-600 rounded-xl flex items-center px-4 hover:border-[#A2D135] hover:text-[#A2D135] transition"
            >
              <span>{base.name}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}