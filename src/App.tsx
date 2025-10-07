import { Route, Routes } from "react-router-dom";
import "./App.css";
import TDCURD from "./pages/TDCURD";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TDCURD />} />
      </Routes>
    </>
  );
}

export default App;
