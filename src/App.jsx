import React from "react";
import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Dave } from "./components/Dave";
import { Testimonials } from "./components/testimonials";
import { Contact } from "./components/contact";
import { Dashboard } from "./components/dashboard";
import { Password } from "./components/password";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import "./styles.scss"
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Signup } from "./components/signup";
import { Login } from "./components/login";


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  function Main() {
    return (
      <>
        <Navigation />
        <Header />
        <About />
        <Testimonials />
        <Contact />
      </>
    )
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgotpassword" element={<Password />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
