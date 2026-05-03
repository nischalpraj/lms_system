import React, { useState } from "react";
import Header from "./components/Header";
import Marquee from "./components/Marquee";
import Hero2 from "./components/Hero2";
import Hero3 from "./components/Hero3";
import Award from "./components/Award";
import Contact from "./components/Contact"
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="overflow-x-hidden">
      <Header />
      <Marquee />
      <Hero2 />
      <Hero3 />
      <Award />
      <Contact/>
    </div>
  );
}

export default App;
