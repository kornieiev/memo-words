import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage";
import FoldersPage from "./pages/FoldersPage";
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
          <Route path='/folders' element={<FoldersPage />} />
        </Route>

        {/* Not existing routes */}
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  );
}

export default App;
