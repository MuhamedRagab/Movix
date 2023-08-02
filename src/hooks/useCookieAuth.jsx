import { useCookies } from "react-cookie";

export const expireDate = (timeByMin) =>
  new Date(Date.now() + timeByMin * 60 * 1000);

const useCookieAuth = () => {
  const [{ user }, setUserCookie, removeUserCookie] = useCookies(["user"]);

  const setAuth = ({ data, expireDateByMin }) => {
    setUserCookie(
      "user",
      { token: data },
      {
        secure: true,
        // httpOnly: true, // Only accessible by the server
        path: "/",
        expires: expireDate(expireDateByMin),
      }
    );
  };

  const removeAuth = () => {
    removeUserCookie("user", { path: "/" });
  };

  return { user, setAuth, removeAuth };
};

export default useCookieAuth;
