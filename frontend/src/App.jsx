import React, { useState } from "react";
import Header from "./components/Landingpage/Header";
import Marquee from "./components/Landingpage/Marquee";
import Hero2 from "./components/Landingpage/Hero2";
import Hero3 from "./components/Landingpage/Hero3";
import Award from "./components/Landingpage/Award";
import Contact from "./components/Landingpage/Contact";
import Footer from "./components/Landingpage/Footer";
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
      <Contact />
      <Footer/>
    </div>
  );
}

export default App;
