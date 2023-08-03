import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import MainLayout from "@/layouts/MainLayout";
import Home from "@pages/home";

// convert to lazy load
const Login = lazy(() => import("@/pages/auth/login"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const MovieCategory = lazy(() => import("@/pages/movies/category"));
const Movie = lazy(() => import("@/pages/movies/movie"));
const ErrorBoundary = lazy(() => import("@/pages/_error_boundary"));
const NotFoundPage = lazy(() => import("@/pages/not_found"));

// Components
import LoaderPage from "@/components/shared/LoaderPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorBoundary />,
    children: [{ path: "login", element: <Login /> }],
    ErrorBoundary: <ErrorBoundary />,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    ErrorBoundary: <ErrorBoundary />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/movix", element: <Home /> },
      { path: ":category", element: <MovieCategory /> },
      { path: ":category/movie/:id", element: <Movie /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

const Router = () => {
  return (
    <Suspense fallback={<LoaderPage />}>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </Suspense>
  );
};

export default Router;
