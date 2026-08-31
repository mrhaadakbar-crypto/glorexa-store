import React from "react";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiX } from "react-icons/fi";

const CartDrawer = ({ open, items, onClose, onQty, onRemove, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);

  return (
    <>
      {open && <button type="button" aria-label="Close cart" onClick={onClose} className="fixed inset-0 z-40 cursor-default bg-slate-950/60 backdrop-blur-sm" />}
      <aside className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!open}>
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">Your order</p><h2 className="mt-1 text-2xl font-bold">Shopping Cart</h2></div>
          <button type="button" aria-label="Close" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 hover:bg-slate-200"><FiX size={22} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {!items.length ? <div className="grid min-h-48 place-items-center rounded-2xl border border-dashed border-slate-300 text-slate-500">Your cart is empty.</div> : items.map((item) => {
            const key = item.cartKey || item._id;
            return <article key={key} className="flex gap-3 rounded-2xl border border-slate-200 p-3">
              <img src={item.images?.[0] || item.image || "https://placehold.co/120x120?text=G"} alt={item.name} className="h-24 w-24 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1"><h3 className="truncate font-bold text-slate-900">{item.name}</h3><p className="mt-1 font-bold text-orange-600">Rs. {Number(item.price || 0).toLocaleString("en-PK")}</p>{(item.size || item.color) && <small className="text-slate-500">{item.size && `Size: ${item.size}`}{item.size && item.color && " · "}{item.color && `Color: ${item.color}`}</small>}
                <div className="mt-3 flex items-center gap-2"><button type="button" aria-label="Decrease quantity" onClick={() => onQty(key, item.qty - 1)} className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 hover:bg-slate-200"><FiMinus size={14} /></button><span className="min-w-6 text-center font-bold">{item.qty}</span><button type="button" aria-label="Increase quantity" onClick={() => onQty(key, item.qty + 1)} className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 hover:bg-slate-200"><FiPlus size={14} /></button><button type="button" aria-label="Remove product" onClick={() => onRemove(key)} className="ml-auto grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><FiTrash2 size={15} /></button></div>
              </div>
            </article>;
          })}
        </div>
        <div className="border-t border-slate-200 bg-white p-5"><div className="mb-4 flex justify-between text-lg"><span>Subtotal</span><strong>Rs. {subtotal.toLocaleString("en-PK")}</strong></div><button type="button" disabled={!items.length} onClick={onCheckout} className="w-full rounded-xl bg-orange-500 px-5 py-3.5 font-black text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">Proceed to Checkout</button></div>
      </aside>
    </>
  );
};

export default CartDrawer;
