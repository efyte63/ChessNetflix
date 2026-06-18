import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chessconfermation from "./pages/Chessconfermation";
import Chessgame from "./pages/Chessgame";
import Netflix from "./pages/Netflix";
import Matches from "./pages/Matches";
import Learn_Chess from "./pages/Learn_Chess";
import Des from "./pages/Des";

export default function App() {
  return (
 
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/chessstart" element={<Chessconfermation />} />

        <Route path="/game" element={<Chessgame />} />

        <Route path="/netflix" element={<Netflix />} />

        <Route path="/matches" element={<Matches/>}></Route>

        <Route path="/learnchess" element={<Learn_Chess/>}></Route>

        <Route path="/movie/:id" element={<Des/>}></Route>
      </Routes>
    
  );
}