import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  extension: string;
  city: string;
  username: string;
  website: string;
  street: string;
  suite: string;
  zip: string;
  geo: {
    lat: string;
    lng: string;
  };
  userPosts: Post[];
}

export default function UserCard({ user }: { user: User }) {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!user.extension) return;
    navigator.clipboard.writeText(user.extension);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const visiblePosts = showAllPosts
    ? user.userPosts
    : user.userPosts.slice(0, 3);
  const hiddenPostsCount = user.userPosts.length - 3;
  // COLORES ALEATORIOS PARA TARJETAS
  const colors = [
    "bg-indigo-400/30 text-indigo-200 border-indigo-400/20",
    "bg-teal-400/30 text-teal-200 border-teal-400/20",
    "bg-rose-400/30 text-rose-200 border-rose-400/20",
    "bg-sky-400/30 text-sky-200 border-sky-400/20",
    "bg-violet-400/30 text-violet-200 border-violet-400/20",
    "bg-emerald-400/30 text-emerald-200 border-emerald-400/20",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  // ESTILOS BASE TARJETAS
  const cardClasses =
    "bg-[#201d24] shadow-[#302837] shadow-lg transition-shadow overflow-hidden p-6";

  return (
    <div className="flex flex-col h-full">
      {/* INFORMACIÓN DEL USUARIO */}
      <div
        className={`${cardClasses} ${randomColor} rounded-t-lg border-b border-dotted border-gray-300`}
      >
        <header className="mb-4">
          <h2 className="text-2xl font-bold text-gray-100">{user.name}</h2>
          <p className="text-amber-200 font-medium text-sm">
            {user.companyName}
          </p>
        </header>

        <div className="space-y-2 text-gray-600 text-sm mb-4">
          <p>
            <strong className="font-semibold text-gray-300">Email:</strong>{" "}
            <a
              href={`mailto:${user.email}`}
              className="text-blue-100 hover:underline hover:text-blue-50 transition-colors"
            >
              {user.email}
            </a>
          </p>

          <div className="flex items-center gap-2">
            <div>
              <strong className="font-semibold text-gray-300">Teléfono:</strong>{" "}
              <a
                href={`tel:${user.phone}`}
                className="text-blue-100 hover:underline hover:text-blue-50 transition-colors"
              >
                {user.phone}
              </a>
            </div>
            {/* BOTÓN COPIAR EXTENSIÓN */}
            {user.extension && (
              <button
                onClick={handleCopy}
                title="Copiar extensión teléfonica"
                className="group ml-2 flex items-center gap-1 
                border-gray-600 bg-gray-900 px-2.5 py-1 rounded-xl font-bold text-white text-xs 
                hover:bg-gray-950 active:scale-95 transition-all"
              >
                <span>{user.extension}</span>
                {copied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white opacity-100 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1
                      1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2
                      0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>

          <p className="inline-flex gap-1">
            <strong className="font-semibold text-gray-300">Ciudad:</strong>{" "}
            <span className=" text-gray-300">{user.city}</span>
          </p>
        </div>

        {/* BOTÓN MOSTRAR MÁS INFO */}
        <button
          onClick={() => setShowMoreInfo(!showMoreInfo)}
          aria-expanded={showMoreInfo}
          className="text-sm font-semibold text-amber-50 hover:text-white underline decoration-2 underline-offset-4"
        >
          {showMoreInfo ? "Ocultar detalles" : "Mostrar detalles"}
        </button>

        {showMoreInfo && (
          <div className="mt-4 p-4 text-gray-700 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sm">
              <strong className="font-semibold text-gray-900">Usuario:</strong>{" "}
              {user.username}
            </p>

            <p className="text-sm mb-4">
              <strong className="font-semibold text-gray-900">
                Página web:
              </strong>{" "}
              <a
                href={
                  user.website.startsWith("http")
                    ? user.website
                    : `https://${user.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline hover:text-blue-900 transition-colors"
              >
                {user.website}
              </a>
            </p>

            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm mb-2">
                <strong className="font-semibold text-gray-900">
                  Dirección:
                </strong>{" "}
                {user.street} {user.suite}, {user.zip}
              </p>
              {/* MAPA OPENSTREETMAP */}
              {user.geo && user.geo.lat && user.geo.lng && (
                <div className="h-48 w-full rounded-lg overflow-hidden border border-gray-300 shadow-inner relative z-0">
                  <iframe
                    title={`Mapa de ${user.name}`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                      parseFloat(user.geo.lng) - 0.05
                    }%2C${parseFloat(user.geo.lat) - 0.05}%2C${
                      parseFloat(user.geo.lng) + 0.05
                    }%2C${
                      parseFloat(user.geo.lat) + 0.05
                    }&layer=mapnik&marker=${user.geo.lat}%2C${user.geo.lng}`}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* POSTS DEL USUARIO */}
      <div className={cardClasses}>
        <span className="text-lg font-semibold text-gray-100 mb-4">
          Últimos posts
        </span>

        <ul className="space-y-4">
          {visiblePosts.map((post) => (
            <li
              key={post.id}
              className="bg-gray-800 border-l-4 border-gray-400 pl-3 py-1"
            >
              <h4 className="font-semibold text-gray-300 capitalize leading-snug">
                {post.title}
              </h4>
              <p className="text-gray-500 text-xs mt-1">{post.body}</p>
              <div className="text-right mt-1">
                <small className="text-gray-300 text-xs">#{post.id}</small>
              </div>
            </li>
          ))}
        </ul>

        {/* BOTÓN >3 POSTS */}
        {user.userPosts.length > 3 && (
          <button
            onClick={() => setShowAllPosts(!showAllPosts)}
            className="w-full mt-4 py-2 text-sm font-bold 
            text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 
            rounded-lg transition-colors border border-transparent 
            hover:border-indigo-100"
          >
            {showAllPosts ? "Ver menos" : `Ver ${hiddenPostsCount} posts más`}
          </button>
        )}
      </div>
    </div>
  );
}
