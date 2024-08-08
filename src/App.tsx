import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { Product } from "./components/Product";

function App() {
  return (
    <Router>
      <div className="flex h-full max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
