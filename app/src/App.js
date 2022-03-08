import "./App.css";
import Home from "./Home";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Edit from "./Edit";

function App() {
  const [itemId, setItemId] = useState("");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setItemId={setItemId} />} />
        <Route path="/edit" element={<Edit itemId={itemId} />} />
      </Routes>
    </Router>
  );
}

export default App;
