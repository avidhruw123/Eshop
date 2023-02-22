import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//pages
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
//components
import { Header, Footer } from "./Components";
import AdminOnlyRoute from "./Components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./Components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout-details" element={<CheckoutDetails/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
