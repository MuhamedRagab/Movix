import { Navigate, Outlet } from "react-router-dom/dist";
import Navbar from "@components/shared/Navbar";
import useCookieAuth from "@/hooks/useCookieAuth";
import LeftDrawer from "../components/daisyui/LeftDrawer";

const MainLayout = () => {
  const { user } = useCookieAuth();

  if (!user) return <Navigate to="/auth/login" replace />;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="relative">
        <Outlet />
        <LeftDrawer />
      </main>
    </>
  );
};

export default MainLayout;
