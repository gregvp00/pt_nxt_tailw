"use client";
import { useState, useTransition } from "react";
import { getCombinedData } from "./actions";
import UserCard from "@/components/UserCard";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const [showError, setShowError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

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

  return (
    <main className="p-4 sm:p-8 max-w-7xl mx-auto relative min-h-screen">
      {/* Fallback */}
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
                Reintentar ahora
              </button>
              <button
                onClick={() => setShowError(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mb-10">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
}
