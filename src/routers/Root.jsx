import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { Toaster } from "react-hot-toast";
import { globalToasterOptions } from "@utils/customToaster";
import { QueryClient, QueryClientProvider } from "react-query";
import i18nNextOptions from "@utils/i18nNextOptions.js";
import { CookiesProvider } from "react-cookie";
import Router from "./Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FontLoader from "../components/shared/FontLoader";
import { useEffect } from "react";

i18next.init(i18nNextOptions);

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
      <I18nextProvider i18n={i18next}>
        <Toaster position="bottom-right" toastOptions={globalToasterOptions} />
        <QueryClientProvider client={queryClient}>
          <CookiesProvider>
            <FontLoader />
            <Router />
          </CookiesProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </GoogleOAuthProvider>
  );
}
