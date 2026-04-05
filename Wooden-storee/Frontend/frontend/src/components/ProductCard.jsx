import { useNavigate } from "react-router-dom";

export default function ProductCard({ p, handleAdd, addedId }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${p._id}`)}
      className="bg-white rounded-2xl border border-stone-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="h-52 bg-amber-50 overflow-hidden relative">
        <img
          src={p.images?.[0] || p.image}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.innerHTML =
              "<div class='w-full h-full flex items-center justify-center text-6xl'>🪑</div>";
          }}
        />
      </div>

      <div className="p-4">
        <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">
          {p.category || "Furniture"}
        </span>

        <h3 className="text-base font-semibold text-stone-900 mt-1 mb-1">
          {p.name}
        </h3>

        <p className="text-xs text-stone-400 leading-relaxed mb-4 line-clamp-2">
          {p.description}
        </p>

        <div className="flex items-center justify-between">
          <span
            className="text-xl font-bold text-stone-900"
            style={{ fontFamily: "Georgia, serif" }}
          >
            ₹{Number(p.price).toLocaleString("en-IN")}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAdd(p);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              addedId === p._id
                ? "bg-green-500 text-white scale-95"
                : "bg-stone-900 text-white hover:bg-stone-700 hover:shadow-md"
            }`}
          >
            {addedId === p._id ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
