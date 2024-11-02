import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/main' element={<MainPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
