import {Route, Routes, useLocation} from "react-router-dom";
import {Navbar, Footer, Dashboard} from "./components/index";

const App = () => {
    const location = useLocation();
    const hideFooterPages = ["/login"];

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />}/>
            </Routes>
            {!hideFooterPages.includes(location.pathname) && <Footer />}
        </div>
    )
}

export default App;