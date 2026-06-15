import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import AppShell from "./components/AppShell";

const Home = lazy(() => import("./pages/Home"));
const Repair = lazy(() => import("./pages/Repair"));
const Products = lazy(() => import("./pages/Products"));
const Chartering = lazy(() => import("./pages/Chartering"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));

function PageFallback() {
  return <div className="flex-1 flex items-center justify-center text-ink-300 text-sm">Loading…</div>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Suspense fallback={<PageFallback />}><Home /></Suspense>} />
            <Route path="repair" element={<Suspense fallback={<PageFallback />}><Repair /></Suspense>} />
            <Route path="products" element={<Suspense fallback={<PageFallback />}><Products /></Suspense>} />
            <Route path="chartering" element={<Suspense fallback={<PageFallback />}><Chartering /></Suspense>} />
            <Route path="reports" element={<Suspense fallback={<PageFallback />}><Reports /></Suspense>} />
            <Route path="settings" element={<Suspense fallback={<PageFallback />}><Settings /></Suspense>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
