import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Homepage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
