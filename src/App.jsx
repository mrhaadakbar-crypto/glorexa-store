import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from './pages/AdminPage';
import Home from "./pages/Home";

export default function App() {
  return (


     <BrowserRouter>
    <Routes>
      <Route element={<AdminPage />} path="/admin-panel" />
      <Route element={<Home/>} path="/"/>
    </Routes>
</BrowserRouter>


  );
}
