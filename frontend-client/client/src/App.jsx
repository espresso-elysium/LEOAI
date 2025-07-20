import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./components/Main/Main"; // import Main.jsx
import Sidebar from "./components/Sidebar/Sidebar";
// import Chatpage from './pages/Chatpage';
import Leo from './pages/Leo';
import PrivateRoute from "./PrivateRoute";

function App() {
  const [chat, setChat] = useState([]);
  const username = "devuser"; // replace with JWT logic later
  const Gname = "Leo"; // or from user context

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} 
        


        />
        {/* <Route path="/home" element={<Chatpage />} /> */}
        // or
        <Route path="/leo" element={<PrivateRoute />}>
          <Route path="" element={<Leo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
