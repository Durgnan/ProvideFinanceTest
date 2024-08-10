import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Layout  from "./Layout";
import Products from "./Products";
import Checkout from "./Checkout";
import ProductDescription from './ProductDescription';

function App() {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="product/:id" element={<ProductDescription />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
