import React, { useState } from "react";
import Header from "./components/Header";
import Marquee from "./components/Marquee";
import Hero2 from "./components/Hero2"
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="overflow-x-hidden">
      <Header />
      <Marquee />
      <Hero2/>
      </div>
  );
}

export default App

