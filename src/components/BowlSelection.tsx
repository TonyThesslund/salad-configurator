interface Bowl {
  id: number;
  name: string;
  size?: string;
}

interface Props {
  bowls: Bowl[];
}

export function BowlSelection({ bowls }: Props) {
  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">
      
      {/* Step number */}
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        1
      </div>

      {/* Title */}
      <h2 className="mb-6 font-semibold text-lg">Valitse rasia</h2>

      {/* Bowl options (dynamic) */}
      <div className="w-full flex flex-col gap-4">
        {bowls.map((bowl) => (
          <button
            key={bowl.id}
            className="h-12 border-2 border-gray-600 rounded-xl flex items-center px-4 hover:border-[#A2D135] hover:text-[#A2D135] transition"
          >
            <span>{bowl.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}