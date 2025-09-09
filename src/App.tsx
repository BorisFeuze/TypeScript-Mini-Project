import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Card } from "./pages";
import { MainLayout } from "./layouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Card />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
