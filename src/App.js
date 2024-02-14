import "./App.css";
import SignInpage from "./SignUp/SignInpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUppage from "./SignUp/SignUppage";
import Home from "./Userside/Home";
import Admin from "./Adminside/Admin";
import Products from "./Adminside/Products";
import Items from "./Adminside/Items";
import Dashboard from "./Adminside/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig/Firebaseconfig";
import { useEffect, useState } from "react";
function App() {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName(null);
      }
    });
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/SignUppage"
            element={<SignUppage userName={userName} />}
          />

          <Route path="/" element={<SignInpage userName={userName} />} />
          <Route path="/Home" element={<Home userName={userName} />} />
          <Route path="/Admin" element={<Admin userName={userName} />} />
          <Route
            path="/Admin/Dashboard"
            element={<Dashboard userName={userName} />}
          />
          <Route
            path="/Admin/Products"
            element={<Products userName={userName} />}
          />
          <Route path="/Admin/Products/Items" element={<Items />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
