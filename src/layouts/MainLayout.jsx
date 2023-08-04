import { Navigate, Outlet } from "react-router-dom/dist";
import Navbar from "./Navbar";
import useCookieAuth from "@/hooks/useCookieAuth";
import LeftDrawer from "@components/daisyui/LeftDrawer";
import "react-lazy-load-image-component/src/effects/blur.css";

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
