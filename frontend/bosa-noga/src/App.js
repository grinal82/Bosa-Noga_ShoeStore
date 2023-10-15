import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { fetchProducts } from './store/itemsReducer'
import { fetchTopSales } from './store/topSalesReducer'
import { fetchCatalog } from "./store/catalogReducer";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomepageLoaded } from "./pages/HomepageLoaded";
import { About } from "./pages/About";
import { Catalog } from "./pages/Catalog";
import { Contacts } from "./pages/Contacts";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";
import { Product } from "./pages/Product";
import "./App.css";




function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchTopSales())
    dispatch(fetchCatalog())  
  },[dispatch])
  

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomepageLoaded />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/catalog/:id" element={<Product />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
