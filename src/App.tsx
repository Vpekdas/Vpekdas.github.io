import Game from "./components/Game.tsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Projects from "./pages/Projects.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import Background from "./components/Background.tsx";

function App() {
    return (
        <HashRouter>
            <div>
                <Background>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/game" element={<Game />} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </Background>
            </div>
        </HashRouter>
    );
}

export default App;
