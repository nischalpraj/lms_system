import React, { useState } from "react";
import Header from "./components/Header";
import Marquee  from "./components/Marquee";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="overflow-x-hidden">
      <Header />
      <Marquee/>
      </div>
  );
}

export default App

