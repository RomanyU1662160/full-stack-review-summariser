import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import ProductsList from './components/products/ProductsList.tsx'
import ProductDetails from './components/product-details/ProductDetails.tsx'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
)
