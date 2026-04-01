import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fics from "./pages/Fics";
import Originals from "./pages/Originals";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fics" element={<Fics />} />
      <Route path="/originals" element={<Originals />} />
    </Routes>
  );
}