import {Route, Routes, useLocation} from "react-router-dom";
import {Home, Sidebar, Navbar, Footer, Dashboard, Category, Product, Order, User} from "./components";

const App = () => {
    const location = useLocation();
    const hideFooterPages = ["/login"];

    return (
        <div>
            <Sidebar />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/categories" element={<Category />}/>
                <Route path="/products" element={<Product />}/>
                <Route path="/orders" element={<Order />}/>
                <Route path="/users" element={<User />}/>
                <Route path="/files" element={<Home />}/>
                <Route path="*" element={<h1>404 Not Found</h1>}/>
            </Routes>
            {!hideFooterPages.includes(location.pathname) && <Footer />}
        </div>
    )
}

export default App;