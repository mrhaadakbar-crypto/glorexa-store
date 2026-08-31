import React from "react";
import { useState } from "react";
import { FiX } from "react-icons/fi";

const initialForm = { name: "", email: "", phone: "", address: "", city: "", notes: "", paymentMethod: "Cash on Delivery" };
const fieldClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

const CheckoutModal = ({ open, cart, onClose, onSubmit, loading }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  if (!open) return null;
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!cart.length) return setError("Your cart is empty.");
    const customer = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
    if (await onSubmit(customer)) setForm(initialForm); else setError("Order save nahi hua. Browser storage permission check karein.");
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="my-4 w-full max-w-2xl rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">Checkout</p><h2 className="mt-1 text-2xl font-bold">Customer Details</h2></div><button type="button" aria-label="Close" disabled={loading} onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100"><FiX size={22} /></button></div>
        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2"><label className="font-semibold text-slate-700">Full name<input required name="name" value={form.name} onChange={update} className={fieldClass} /></label><label className="font-semibold text-slate-700">Phone<input required name="phone" value={form.phone} onChange={update} className={fieldClass} /></label></div>
          <div className="grid gap-4 sm:grid-cols-2"><label className="font-semibold text-slate-700">Email<input type="email" name="email" value={form.email} onChange={update} className={fieldClass} /></label><label className="font-semibold text-slate-700">City<input required name="city" value={form.city} onChange={update} className={fieldClass} /></label></div>
          <label className="block font-semibold text-slate-700">Delivery address<textarea required rows="3" name="address" value={form.address} onChange={update} className={fieldClass} /></label>
          <label className="block font-semibold text-slate-700">Order notes<textarea rows="2" name="notes" value={form.notes} onChange={update} className={fieldClass} /></label>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><span className="block text-xs text-slate-500">Payment Method</span><strong>Cash on Delivery</strong></div>
          <div className="flex justify-between border-t border-slate-200 pt-4 text-xl"><span>Total</span><strong>Rs. {total.toLocaleString("en-PK")}</strong></div>
          <button type="submit" disabled={loading || !cart.length} className="w-full rounded-xl bg-orange-500 px-5 py-3.5 font-black text-white hover:bg-orange-600 disabled:opacity-50">{loading ? "Placing Order..." : "Place Order"}</button>
        </form>
      </section>
    </div>
  );
};

export default CheckoutModal;
