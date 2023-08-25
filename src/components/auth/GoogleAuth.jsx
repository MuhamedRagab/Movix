/* eslint-disable react/prop-types */
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import useCookieAuth from "@/hooks/useCookieAuth";
import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  const { setAuth } = useCookieAuth();

  useGoogleOneTapLogin({
    onSuccess: ({ credential }) => {
      setAuth({ data: credential, expireDateByMin: 4320 }); // 3 days
      console.clear();
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Login Failed");
    },
  });

  const loginWithGoogle = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      setAuth({ data: access_token, expireDateByMin: 4320 }); // 3 days
      console.clear();
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Login Failed");
    },
  });

  return (
    <button className="btn" onClick={() => loginWithGoogle()}>
      <FcGoogle size={20} /> Sign in with Google
    </button>
  );
};

export default GoogleAuth;
