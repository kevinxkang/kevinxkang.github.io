import './App.css';
import Navbar from "./components/navbar";
import { HashRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import resume from "./assets/coming-soon.pdf";
import Home from "./pages/home";
import Portfolio from "./pages/portfolio";
import ChengduTaste from "./pages/portfolio-pages/chengdu-taste";
import Crossword from "./pages/portfolio-pages/crossword";
import Personas from "./pages/portfolio-pages/ceremony";
import IterativeDesign from "./pages/portfolio-pages/iterative-design";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HashRouter>
            <Navbar />
            <Routes>
                {/*default route*/}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />}/>
                {/*<Route path="/about" element={<About />} />*/}
                <Route path="/work" element={<Portfolio />} />
                <Route path="/resume" a={resume}/>

                {/*work routes*/}
                <Route path="/work/chengdu-taste" element={<ChengduTaste />} />
                <Route path="/work/crossword" element={<Crossword />} />
                <Route path="/work/personas" element={<Personas />} />
                <Route path="/work/iterative-design" element={<IterativeDesign />} />

            </Routes>
        </HashRouter>
      </header>
        <Footer/>
    </div>
  );
}

export default App;
