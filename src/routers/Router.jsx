import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import MainLayout from "@/layouts/MainLayout";
import Home from "@pages/home";
import Login from "@pages/auth/login";
import AuthLayout from "@/layouts/AuthLayout";
import MovieCategory from "@pages/movies/category";
import Movie from "@pages/movies/movie";
import { AnimatePresence } from "framer-motion";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "login", element: <Login /> }],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: ":category", element: <MovieCategory /> },
      { path: ":category/movie/:id", element: <Movie /> },
    ],
  },
  { path: "*", element: <h1>Not Found</h1> },
]);

const Router = () => {
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
};

export default Router;
