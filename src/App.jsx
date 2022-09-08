import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import { Dashboard } from "./components/dashboard";
import { Password } from "./components/password";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import "./styles.scss"
import {
  HashRouter as Router,
  Routes,
  Route, withRouter

} from "react-router-dom";
import { Signup } from "./components/signup";
import { Login } from "./components/login";


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  function Main() {
    return (
      <>
        <Navigation />
        <Header data={landingPageData.Header} />
        {/* <Features data={landingPageData.Features} /> */}
        <About data={landingPageData.About} />
        <Testimonials data={landingPageData.Testimonials} />
        <Contact data={landingPageData.Contact} />
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
