import React from "react";
import { FiMail } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";

const links = { Shop: ["Men", "Women", "New arrivals", "All products"], Help: ["Delivery", "Returns", "Order status", "Contact us"] };

const StoreFooter = () => {
  return (
    <footer className="bg-stone-900 px-5 pb-6 pt-16 text-stone-200">
      <div className="mx-auto grid max-w-[1240px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div><h2 className="font-serif text-4xl">Glorexa.</h2><p className="mt-4 max-w-sm leading-7 text-stone-400">Modern fashion, fragrance and lifestyle products—curated for Pakistan.</p><a href="mailto:hello@glorexa.com" aria-label="Email Glorexa" className="mt-4 inline-flex text-white hover:text-orange-400"><FiMail size={22} /></a></div>
        {Object.entries(links).map(([title, items]) => <div key={title}><strong>{title}</strong>{items.map((item) => <a key={item} href="#products" className="mt-3.5 block text-stone-400 transition hover:text-white">{item}</a>)}</div>)}
        <div><strong>Visit us</strong><p className="mt-4 flex gap-2 leading-6 text-stone-400"><FiMapPin className="mt-1 shrink-0" size={18} /><span>Pakistan<br />Online store</span></p><p className="text-stone-400">Cash on Delivery available.</p></div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1240px] flex-wrap justify-between gap-4 border-t border-stone-700 pt-5 text-xs text-stone-500"><span>© {new Date().getFullYear()} Glorexa. All rights reserved.</span><span>Privacy · Terms · Shipping</span></div>
    </footer>
  );
};

export default StoreFooter;
