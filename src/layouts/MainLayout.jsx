import { useEffect, useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom/dist";
import { useTranslation } from "react-i18next";
import Navbar from "@components/shared/Navbar";
import useCookieAuth from "@/hooks/useCookieAuth";

const MainLayout = () => {
  const { i18n } = useTranslation();
  const { user } = useCookieAuth();
  const userLang = useMemo(() => localStorage.getItem("lang"), []);

  useEffect(() => {
    if (!userLang) localStorage.setItem("lang", "en");
    i18n.changeLanguage(userLang);
  }, [i18n, user, userLang]);

  if (!user) return <Navigate to="/auth/login" replace />;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
