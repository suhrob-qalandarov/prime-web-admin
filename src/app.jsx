import {Route, Routes, useLocation} from "react-router-dom";
import {Navbar, Footer, Dashboard, Sidebar} from "./components";

const App = () => {
    const location = useLocation();
    const hideFooterPages = ["/login"];

    return (
        <div>
            <Sidebar />
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />}/>
            </Routes>
            {!hideFooterPages.includes(location.pathname) && <Footer />}
        </div>
    )
}

export default App;