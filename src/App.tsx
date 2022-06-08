import { useEffect, useState } from "react";
import "./App.css";

import { fixUrl } from "./utils";
import { Link, Route, Routes } from "react-router-dom";
import Start from "./components/Start";
import Battle from "./components/Battle/Battle";
import Gallery from "./components/Gallery/Gallery";

function App() {
  return (
    <div className="app">
      <header>
        <h2> Fullstack Project - Hamsters war</h2>
        <nav>
          <Link to="/"> Start</Link>
          <Link to="/Battle"> Hamsters War </Link>
          <Link to="/Gallery"> Gallery </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/Battle" element={<Battle />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/*" element={<FourOhFour />} />
        </Routes>
      </main>
    </div>
  );
}
function FourOhFour() {
  return <p> 404 not found!! </p>;
}

export default App;
