import { Toaster } from "react-hot-toast";
import { globalToasterOptions } from "@utils/customToaster";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";
import Router from "./Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FontLoader from "../components/shared/FontLoader";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function Root() {
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "Dark");
    }
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme")
    );
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Toaster position="bottom-right" toastOptions={globalToasterOptions} />
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <FontLoader />
          <Router />
        </CookiesProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
