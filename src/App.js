import "./App.css";
import SignInpage from "./SignUp/SignInpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUppage from "./SignUp/SignUppage";
import Home from "./Home/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUppage />} />
          <Route path="/SignInpage" element={<SignInpage />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
