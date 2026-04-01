import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fics from "./pages/Fics";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fics" element={<Fics />} />
    </Routes>
  );
}