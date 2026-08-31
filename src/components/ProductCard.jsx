import React from "react";
import { FiEye } from "react-icons/fi";

const ProductCard = ({ product, onOpen }) => {
  const image = product.images?.[0] || product.image || "https://placehold.co/600x600?text=Glorexa";
  return (
    <article onClick={() => onOpen(product)} className="group cursor-pointer overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-60 overflow-hidden bg-stone-100">
        <img src={image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {Number(product.stock) > 0 && Number(product.stock) <= 5 && <span className="absolute left-3 top-3 rounded-full bg-orange-50 px-2.5 py-1.5 text-xs font-extrabold text-orange-700">Only {product.stock} left</span>}
      </div>
      <div className="p-[18px]">
        <p className="text-xs font-black uppercase tracking-wide text-violet-600">{product.gender || "Unisex"} · {product.category || "General"}</p>
        <h3 className="my-2 truncate text-lg font-bold text-slate-900">{product.name}</h3>
        <p className="mb-4 line-clamp-2 min-h-11 text-sm leading-relaxed text-slate-500">{product.description}</p>
        <div className="flex items-center justify-between gap-2">
          <strong className="text-xl text-orange-600">Rs. {Number(product.price || 0).toLocaleString("en-PK")}</strong>
          <button type="button" className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 font-extrabold text-white transition hover:bg-orange-600"><FiEye size={16} /> View</button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
