import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { checkAuthStatus } from "./redux/auth/authSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public routes */}

        <Route path='/' element={<Homepage />}></Route>

        {/* Privat routes */}

        <Route element={<ProtectedRoute />}>
          <Route path='/main' element={<MainPage />} />
        </Route>

        {/* Not existing routes */}
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  );
}

export default App;
