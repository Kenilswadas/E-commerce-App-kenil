import "./App.css";
import SignInpage from "./SignIn/SignInpage";
import SignUppage from "./SignUp/SignUppage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      {/* <SignUppage/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUppage/>} />
          <Route path="/SignInpage" element={<SignInpage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
