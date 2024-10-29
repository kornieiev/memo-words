import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<h1>HOME</h1>}></Route>
      </Routes>
    </>
  );
}

export default App;
