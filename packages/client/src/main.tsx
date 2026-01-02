import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import ProductsList from './components/products/ProductsList.tsx'
import ProductDetailsPage from './components/product-details/ProductDetailsPage.tsx'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
    <Outlet />
  </StrictMode>
)
