import "./App.css";
import SignInpage from "./SignUp/SignInpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUppage from "./SignUp/SignUppage";
import Home from "./Home/Home";
import Admin from "./Home/Admin";
import Products from "./Home/Products";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUppage />} />
          <Route path="/SignInpage" element={<SignInpage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Admin/Products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
