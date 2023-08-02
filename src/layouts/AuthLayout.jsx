import { Navigate, Outlet } from "react-router-dom";
import useCookieAuth from "@/hooks/useCookieAuth";

export const Unauthorized = () => (
  <>
    <Outlet />
    <Navigate to="/auth/login" replace />
  </>
);

export const Authorized = () => <Navigate to="/" replace />;

export default function AuthLayout() {
  const { user } = useCookieAuth();

  return <>{user ? <Authorized /> : <Unauthorized />}</>;
}
