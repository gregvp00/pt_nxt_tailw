import { useState } from "react";

export default function UserCard({ user }: { user: any }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6 grow">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-indigo-600 font-medium text-sm">
            {user.companyName}
          </p>
        </div>

        <div className="space-y-2 text-gray-600 text-sm mb-4">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {user.phone}
          </p>
          <p>
            <strong>Ciudad:</strong> {user.city}
          </p>
        </div>

        <button
          onClick={() => setShowMore(!showMore)}
          className="mb-4 text-sm font-bold text-gray-800 hover:text-indigo-600 underline decoration-2 underline-offset-4"
        >
          {showMore ? "Ver menos" : "Mostrar más información"}
        </button>

        {showMore && (
          <div className="p-4 text-gray-700 bg-gray-50 rounded-xl mb-4 border border-gray-100">
            <p className="text-sm">
              <strong>Nombre de usuario:</strong> {user.username}
            </p>
            <p className="text-sm">
              <strong>Página web:</strong> {user.website}
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Últimos Posts
          </h3>
          <div className="space-y-4">
            {user.userPosts.map((post: any, i: number) => (
              <article key={i} className="bg-white">
                <h4 className="font-semibold text-gray-800 capitalize leading-snug">
                  {post.title}
                </h4>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                  {post.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
