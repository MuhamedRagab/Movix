import { useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import moviesApis from "@/configs/moviesApis";

export default function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    toast.success(t("common.welcome"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigate to={moviesApis[0]?.title || "Top Rated"} />;
}
