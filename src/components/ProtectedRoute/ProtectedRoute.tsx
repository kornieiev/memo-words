// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Компонент маршрута для защиты страниц
const ProtectedRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    // Перенаправляем на страницу логина, если пользователь не авторизован
    return <Navigate to='/' replace />;
  }

  // Если авторизован, отображаем защищенные компоненты
  return <Outlet />;
};

export default ProtectedRoute;
