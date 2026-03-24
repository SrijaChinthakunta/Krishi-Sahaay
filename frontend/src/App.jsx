import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { App as CapacitorApp } from '@capacitor/app';

import Home from "./pages/Home";
import AskAI from "./pages/AskAI";
import DetectDisease from "./pages/DetectDisease";
import Schemes from "./pages/Schemes";
import About from "./pages/About";

function App() {

  const [language, setLanguage] = useState("English");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = CapacitorApp.addListener('backButton', () => {
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        CapacitorApp.exitApp();
      }
    });

    return () => {
      handler.remove();
    };
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route 
        path="/ask" 
        element={
          <AskAI 
            language={language} 
            setLanguage={setLanguage} 
          />
        } 
      />

      <Route path="/detect" element={<DetectDisease />} />
      <Route path="/schemes" element={<Schemes />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;