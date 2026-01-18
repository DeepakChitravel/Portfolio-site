import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Achievements from "./pages/Achievements";
import Education from "./pages/Education";
import Certificates from "./pages/Certificates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/education" element={<Education />} />
        <Route path="/certificates" element={<Certificates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
