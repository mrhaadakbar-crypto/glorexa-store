import React from "react";
import { FiSearch } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";

const StoreNavbar = ({ cartCount, onCartClick, search, onSearch }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-3 px-4 py-3.5 sm:gap-5 sm:px-6">
        <a href="/" className="flex items-center gap-2.5 text-xl font-black text-slate-900">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white"><FiShoppingBag size={21} /></span>
          <span className="hidden sm:inline">Glorexa Store</span>
        </a>
        <label className="order-3 flex w-full items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 focus-within:border-orange-400 sm:order-none sm:ml-auto sm:max-w-xl sm:flex-1">
          <FiSearch size={19} className="shrink-0 text-slate-500" />
          <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search products, categories..." className="w-full bg-transparent text-sm outline-none sm:text-base" />
        </label>
        <button type="button" onClick={onCartClick} className="ml-auto flex items-center gap-2 rounded-xl bg-orange-500 px-3 py-3 font-extrabold text-white transition hover:bg-orange-600 sm:ml-0 sm:px-4">
          <FiShoppingCart size={19} /><span className="hidden sm:inline">Cart</span><span className="min-w-6 rounded-full bg-white px-1.5 py-0.5 text-center text-xs text-orange-600">{cartCount}</span>
        </button>
      </div>
    </header>
  );
};

export default StoreNavbar;
