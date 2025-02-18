// Import react router dom
import {BrowserRouter, Route, Routes} from "react-router-dom";
// Import sonner
import {Toaster} from "sonner";
//
import Home from "./pages/Home";
import UserLayout from "./components/Layout/UserLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetail from "./components/Product/ProductDetail.jsx";
import Checkout from "./components/Cart/Checkout.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Toaster
                position="top-right"
                richColors
                toastOptions={{
                    style: {
                        fontFamily: "Inter, serif",
                        fontSize: "16px"
                    }
                }}
            />
            <Routes>
                <Route path="/" element={<UserLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="collections/:collection" element={<CollectionPage/>}/>
                    <Route path="product/:id" element={<ProductDetail/>}/>
                    <Route path="checkout" element={<Checkout/>}/>
                    <Route path="order-confirmation" element={<OrderConfirmationPage/>}/>
                </Route>
                <Route>{/* Admin layout */}</Route>
                <Route></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
