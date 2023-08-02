import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";
import Login from "../pages/auth/login";
import AuthLayout from "../layouts/AuthLayout";
import MovieCategory from "../pages/movies/category";
import { AnimatePresence } from "framer-motion";
import Movie from "@pages/movies/movie";

const Router = () => {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path=":category" element={<MovieCategory />} />
            <Route path=":category/movie/:id" element={<Movie />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default Router;
