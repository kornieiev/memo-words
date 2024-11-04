import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { checkAuthStatus } from "../redux/auth/authSlice";

export default function Layout() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error, user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <div className='container'>
      {loading && <h3>Loading...</h3>}
      {isAuthenticated ? (
        <h3>isAuthenticated === true</h3>
      ) : (
        <h3>isAuthenticated === false</h3>
      )}

      <Header />
      <main>
        <Outlet />
      </main>
      {/* FOOTER */}
    </div>
  );
}
