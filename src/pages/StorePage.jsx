import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { FiTruck } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Link } from "react-router-dom";
import CartDrawer from "../components/CartDrawer";
import CheckoutModal from "../components/CheckoutModal";
import ProductCard from "../components/ProductCard";
import StoreFooter from "../components/StoreFooter";
import StoreNavbar from "../components/StoreNavbar";

const PRODUCT_KEY = "glorexa_products";
const CART_KEY = "glorexa-cart";
const ORDER_KEY = "glorexa_orders";
const CATEGORY_KEY = "glorexa_categories";
const defaultCategories = [{ name: "Shoes", gender: "Male" }, { name: "Clothing", gender: "Male" }, { name: "Perfume", gender: "Male" }, { name: "Watches", gender: "Male" }, { name: "Shoes", gender: "Female" }, { name: "Dresses", gender: "Female" }, { name: "Perfume", gender: "Female" }, { name: "Cosmetics", gender: "Female" }, { name: "Watches", gender: "Female" }];
const read = (key, fallback = []) => { try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : fallback; } catch { return fallback; } };
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
const openDatabase = () => new Promise((resolve, reject) => { const request = indexedDB.open("glorexa_store", 2); request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains("orders")) request.result.createObjectStore("orders", { keyPath: "_id" }); if (!request.result.objectStoreNames.contains("products")) request.result.createObjectStore("products", { keyPath: "_id" }); }; request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
const getProducts = async () => { try { const db = await openDatabase(); const products = await new Promise((resolve, reject) => { const request = db.transaction("products", "readonly").objectStore("products").getAll(); request.onsuccess = () => resolve(request.result || []); request.onerror = () => reject(request.error); }); db.close(); return products.length ? products : read(PRODUCT_KEY); } catch { return read(PRODUCT_KEY); } };
const saveOrder = async (order) => { const orders = [order, ...read(ORDER_KEY).filter((item) => item._id !== order._id)]; try { const db = await openDatabase(); await new Promise((resolve, reject) => { const request = db.transaction("orders", "readwrite").objectStore("orders").put(order); request.onsuccess = resolve; request.onerror = () => reject(request.error); }); db.close(); } catch { /* localStorage fallback below */ } return write(ORDER_KEY, orders); };

const ProductDetails = ({ product, onClose, onAdd }) => {
  const media = [...(product.images || []), ...(product.image && !product.images?.includes(product.image) ? [product.image] : [])];
  const [active, setActive] = useState(media[0] || "https://placehold.co/700x700?text=Glorexa");
  const [size, setSize] = useState(product.sizes?.[0] || "");
  const [color, setColor] = useState(product.colors?.[0] || "");
  const [qty, setQty] = useState(1);
  const choiceClass = (selected) => `rounded-lg border px-3.5 py-2 transition ${selected ? "border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500" : "border-slate-300 bg-white hover:border-slate-500"}`;

  return <div onMouseDown={(event) => event.target === event.currentTarget && onClose()} className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm">
    <section className="relative my-4 max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
      <button type="button" aria-label="Close details" onClick={onClose} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-slate-100 hover:bg-slate-200"><FiX size={22} /></button>
      <div className="grid gap-8 md:grid-cols-2">
        <div><div className="h-[360px] overflow-hidden rounded-2xl bg-slate-100 sm:h-[460px]">{active === product.video ? <video controls src={active} className="h-full w-full object-contain" /> : <img src={active} alt={product.name} className="h-full w-full object-contain" />}</div><div className="mt-3 flex gap-2 overflow-x-auto pb-1">{media.map((src) => <button type="button" key={src} onClick={() => setActive(src)} className={`h-[70px] w-[70px] shrink-0 overflow-hidden rounded-lg border-2 p-0.5 ${active === src ? "border-orange-500" : "border-slate-200"}`}><img src={src} alt="" className="h-full w-full object-cover" /></button>)}{product.video && <button type="button" onClick={() => setActive(product.video)} className={choiceClass(active === product.video)}>Video</button>}</div></div>
        <div className="pt-2"><p className="font-extrabold text-violet-600">{product.gender || "Unisex"} / {product.category}</p><h1 className="mt-2 pr-10 text-3xl font-black text-slate-900">{product.name}</h1><p className="my-5 text-3xl font-black text-orange-600">Rs. {Number(product.price || 0).toLocaleString("en-PK")}</p><p className="leading-7 text-slate-500">{product.description}</p>
          {!!product.colors?.length && <div className="mt-6"><strong>Color</strong><div className="mt-2 flex flex-wrap gap-2">{product.colors.map((value) => <button type="button" key={value} onClick={() => setColor(value)} className={choiceClass(color === value)}>{value}</button>)}</div></div>}
          {!!product.sizes?.length && <div className="mt-6"><strong>Size</strong><div className="mt-2 flex flex-wrap gap-2">{product.sizes.map((value) => <button type="button" key={value} onClick={() => setSize(value)} className={choiceClass(size === value)}>{value}</button>)}</div></div>}
          <div className="mt-6 flex items-center gap-3"><strong>Quantity</strong><button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100"><FiMinus /></button><span className="font-bold">{qty}</span><button type="button" onClick={() => setQty(Math.min(Number(product.stock || qty + 1), qty + 1))} className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100"><FiPlus /></button></div>
          <button type="button" disabled={Number(product.stock) <= 0} onClick={() => onAdd(product, { size, color, qty })} className="mt-7 flex w-full justify-center gap-2 rounded-xl bg-orange-500 p-4 text-lg font-black text-white hover:bg-orange-600 disabled:opacity-50"><FiShoppingCart size={22} />{Number(product.stock) <= 0 ? "Out of Stock" : "Add to Cart"}</button>
        </div>
      </div>
    </section>
  </div>;
};

const StorePage = () => {
  const [products, setProducts] = useState(() => read(PRODUCT_KEY));
  const [cart, setCart] = useState(() => read(CART_KEY));
  const [categories, setCategories] = useState(() => read(CATEGORY_KEY, defaultCategories));
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  useEffect(() => { if (!localStorage.getItem(CATEGORY_KEY)) write(CATEGORY_KEY, defaultCategories); const sync = async () => { setProducts(await getProducts()); setCategories(read(CATEGORY_KEY, defaultCategories)); }; sync(); window.addEventListener("glorexa-products-updated", sync); window.addEventListener("glorexa-categories-updated", sync); window.addEventListener("focus", sync); return () => { window.removeEventListener("glorexa-products-updated", sync); window.removeEventListener("glorexa-categories-updated", sync); window.removeEventListener("focus", sync); }; }, []);
  useEffect(() => { write(CART_KEY, cart); }, [cart]);
  const visible = useMemo(() => products.filter((product) => { const query = search.trim().toLowerCase(); const matchesSearch = !query || [product.name, product.description, product.category, product.gender].join(" ").toLowerCase().includes(query); return matchesSearch && (gender === "All" || product.gender === gender) && (category === "All" || product.category === category); }), [products, search, gender, category]);
  const categoryNames = [...new Set(categories.filter((item) => gender === "All" || item.gender === gender).map((item) => item.name))];
  const cartCount = cart.reduce((total, item) => total + Number(item.qty || 0), 0);
  const addToCart = (product, choice) => { const cartKey = `${product._id}|${choice.size}|${choice.color}`; setCart((current) => { const found = current.find((item) => item.cartKey === cartKey); return found ? current.map((item) => item.cartKey === cartKey ? { ...item, qty: Math.min(Number(product.stock || 999), item.qty + choice.qty) } : item) : [...current, { ...product, ...choice, cartKey }]; }); setSelected(null); setCartOpen(true); };
  const setQty = (key, qty) => setCart((current) => qty <= 0 ? current.filter((item) => (item.cartKey || item._id) !== key) : current.map((item) => (item.cartKey || item._id) === key ? { ...item, qty: Math.min(Number(item.stock || qty), qty) } : item));
  const placeOrder = async (customer) => { if (!cart.length) return false; setOrderLoading(true); const items = cart.map((item) => ({ product: item._id, name: item.name, price: Number(item.price), qty: item.qty, image: item.images?.[0] || item.image || "", size: item.size || "", color: item.color || "" })); const order = { _id: uid(), orderNumber: `GLX-${Date.now().toString().slice(-8)}`, customer, items, total: items.reduce((sum, item) => sum + item.price * item.qty, 0), status: "Pending", createdAt: new Date().toISOString() }; const saved = await saveOrder(order); if (saved) { window.dispatchEvent(new CustomEvent("glorexa-orders-updated")); setCart([]); setCheckoutOpen(false); setMessage(`Order ${order.orderNumber} placed successfully.`); } else setMessage("Order save nahi hua. Browser storage permission check karein."); setOrderLoading(false); return saved; };
  const genderButton = (value) => `rounded-full px-5 py-2.5 font-extrabold transition ${gender === value ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"}`;

  return <div className="min-h-screen bg-[#f7f5f1] text-stone-900">
    <Link to="/admin-panel" className="fixed bottom-4 right-4 z-20 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-lg hover:bg-orange-600">Admin</Link>
    <StoreNavbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} search={search} onSearch={setSearch} />
    <section className="mx-auto mb-8 grid min-h-[590px] max-w-[1400px] overflow-hidden bg-stone-900 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="flex flex-col justify-center px-6 py-16 text-white sm:px-12 lg:px-[clamp(30px,7vw,100px)] lg:py-24"><span className="flex items-center gap-2 text-xs font-black tracking-[0.16em] text-[#d6b38c]"><HiOutlineSparkles size={17} /> THE NEW STANDARD OF STYLE</span><h1 className="my-6 font-serif text-[clamp(50px,7vw,88px)] font-medium leading-[0.94] tracking-[-0.045em]">Objects made<br /><em className="text-[#d6b38c]">to be noticed.</em></h1><p className="max-w-lg text-lg leading-7 text-stone-400">A considered collection of fashion, fragrance and accessories—selected for people who choose with intention.</p><a href="#products" className="mt-7 flex w-fit items-center gap-2 rounded bg-[#f5eee5] px-5 py-3.5 font-black text-stone-900">Explore collection <FiArrowRight size={18} /></a></div>
      <div className="relative min-h-[360px] overflow-hidden bg-gradient-to-br from-[#d8c2aa] to-[#b78e69] lg:min-h-0"><div className="absolute left-[18%] top-[12%] aspect-square w-[65%] rounded-full border border-white/40" /><div className="absolute bottom-[-5%] left-[29%] h-[62%] w-[42%] rounded-t-[160px] rounded-b-[22px] bg-gradient-to-br from-stone-800 to-black shadow-2xl" /><div className="absolute bottom-[8%] left-[8%] font-serif text-xl text-white">GLX / 2026</div><div className="absolute right-[7%] top-[8%] [writing-mode:vertical-rl] text-xs font-black tracking-[0.28em]">CURATED IN PAKISTAN</div></div>
    </section>
    <section className="mx-auto grid max-w-[1240px] gap-3 px-5 pb-7 pt-4 md:grid-cols-3">{[[FiTruck, "Nationwide Delivery", "Reliable delivery across Pakistan"], [FiCheckCircle, "Secure Ordering", "Simple and protected checkout"], [HiOutlineSparkles, "Curated Quality", "Only products worth owning"]].map(([Icon, title, text]) => <div key={title} className="flex items-center gap-3 rounded-xl bg-[#ebe6de] p-4"><Icon size={23} /><div><strong className="block text-sm">{title}</strong><small className="text-stone-500">{text}</small></div></div>)}</section>
    <main id="products" className="mx-auto max-w-[1240px] px-5 py-14 pb-24">{message && <p className="mb-6 rounded-xl bg-emerald-50 p-4 text-emerald-700">{message}</p>}<div className="mb-7 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-2 text-xs font-black tracking-[0.16em] text-[#9f6c45]">SHOP THE EDIT</p><h2 className="font-serif text-[clamp(34px,5vw,50px)]">Curated essentials.</h2></div><p className="max-w-sm leading-7 text-stone-500">Discover pieces selected across fashion, beauty and accessories.</p></div>
      <div className="mb-3 flex flex-wrap gap-2">{["All", "Male", "Female"].map((value) => <button type="button" key={value} onClick={() => { setGender(value); setCategory("All"); }} className={genderButton(value)}>{value}</button>)}</div>
      <div className="flex gap-2 overflow-x-auto pb-5">{["All", ...categoryNames].map((value) => <button type="button" key={value} onClick={() => setCategory(value)} className={`whitespace-nowrap rounded-lg border px-3.5 py-2 transition ${category === value ? "border-orange-500 bg-orange-50 text-orange-700" : "border-slate-200 bg-white text-slate-600"}`}>{value}</button>)}</div>
      <p className="mb-5 text-sm text-stone-500">{visible.length} products</p>{visible.length ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">{visible.map((product) => <ProductCard key={product._id} product={product} onOpen={setSelected} />)}</div> : <div className="rounded-2xl bg-white p-16 text-center">No matching product found.</div>}
    </main>
    <StoreFooter />{selected && <ProductDetails product={selected} onClose={() => setSelected(null)} onAdd={addToCart} />}<CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onQty={setQty} onRemove={(key) => setCart((current) => current.filter((item) => (item.cartKey || item._id) !== key))} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} /><CheckoutModal open={checkoutOpen} cart={cart} onClose={() => setCheckoutOpen(false)} onSubmit={placeOrder} loading={orderLoading} />
  </div>;
};

export default StorePage;
