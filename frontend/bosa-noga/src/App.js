import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { fetchProducts } from './store/itemsReducer'
import { fetchTopSales } from './store/topSalesReducer'
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomepageLoaded } from "./pages/HomepageLoaded";
import { About } from "./pages/About";
import { Catalog } from "./pages/Catalog";
import { Contacts } from "./pages/Contacts";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";

import "./App.css";
import { fetchCatalog } from "./store/catalogReducer";


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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
