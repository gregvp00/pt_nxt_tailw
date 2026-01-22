"use client";
import { useState, useTransition } from "react";
import { getCombinedData } from "./actions";
import UserCard from "@/components/UserCard";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const [showError, setShowError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const handleLoadData = () => {
    setShowError(false);
    startTransition(async () => {
      const result = await getCombinedData();
      if (result.success) {
        setData(result.data);
        setHasLoaded(true);
      } else {
        setShowError(true);
      }
    });
  };

  // FILTRO (Nombre, Email o Ciudad)
  const filteredData = data.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.city.toLowerCase().includes(term)
    );
  });

  return (
    <main className="p-4 sm:p-8 max-w-7xl mx-auto relative min-h-screen">
      {/* FALLBACK */}
      {showError && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-black text-xl font-bold mb-2">
              Error de conexión
            </h3>
            <p className="text-gray-600 mb-6">
              El servidor tardó demasiado en responder o hubo un fallo de red.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLoadData}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Reintentar
              </button>
              <button
                onClick={() => setShowError(false)}
                className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 mb-10">
        <button
          onClick={handleLoadData}
          disabled={isPending}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 disabled:bg-gray-400 transition-all shadow-lg active:scale-95"
        >
          {isPending
            ? "Sincronizando..."
            : hasLoaded
              ? "Volver a cargar datos"
              : "Cargar datos"}
        </button>

        {/* INPUT BÚSQUEDA */}
        {hasLoaded && (
          <div className="w-full max-w-md relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                className="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Búsqueda rápida"
              className="text-black block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* FALLBACK BÚSQUEDA */}
        {filteredData.length > 0
          ? filteredData.map((user) => <UserCard key={user.id} user={user} />)
          : hasLoaded && (
              <div className="col-span-full text-center text-gray-500 py-10">
                No se encontraron resultados para "{searchTerm}"
              </div>
            )}
      </div>
    </main>
  );
}
