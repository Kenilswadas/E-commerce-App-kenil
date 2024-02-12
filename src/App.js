import "./App.css";
import SignInpage from "./SignUp/SignInpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUppage from "./SignUp/SignUppage";
import Home from "./Userside/Home";
import Admin from "./Adminside/Admin";
import Products from "./Adminside/Products";
import Items from "./Adminside/Items";
import Dashboard from "./Adminside/Dashboard";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/SignUppage" element={<SignUppage />} />
          <Route path="/" element={<SignInpage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Admin/Dashboard" element={<Dashboard />} />
          <Route path="/Admin/Products" element={<Products />} />
          <Route path="/Admin/Products/Items" element={<Items />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
