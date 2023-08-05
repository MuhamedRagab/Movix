import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getMoviesByCategory } from "@/api/movies";
import { useEffect, useState, lazy } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import Pagination from "@/components/daisyui/Pagination";
import MovieCard from "@/components/movie/MovieCard";
const Loader = lazy(() => import("@components/shared/Loader"));

const MovieCategory = () => {
  const location = useLocation();
  const { category } = useParams();
  const [page, setPage] = useState(
    parseInt(window.sessionStorage.getItem("page")) || 1
  );

  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies", category, page],
    queryFn: (category, page) => getMoviesByCategory(category, page),
    select: (data) => data.data,
    cacheTime: 1000 * 60 * 60, // 1 hour
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!category,
    optimisticResults: true,
    suspense: true,
    keepPreviousData: true,
    useErrorBoundary: true,
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
      toast.error("Come back later");
    },
  });

  useEffect(() => {
    document.title = `${category} | Movie App`;
    setPage(1);
  }, [category]);

  return (
    <motion.section
      key={location.pathname}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0, y: 100 }}
      className="container mx-auto px-2 pt-4 pb-20 mt-6"
    >
      <h1 className="relative w-fit mx-auto text-4xl font-bold py-4 text-center after:absolute after:bottom-0 after:h-1 after:w-1/3 after:-translate-x-1/2 after:left-1/2">
        {category}
      </h1>
      <div className="mx-auto w-fit textarea-md font-bold">
        {movies?.dates && (
          <span className="text-gray-400">
            {movies?.dates?.minimum} - {movies?.dates?.maximum}
          </span>
        )}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-8 gap-4">
            {movies?.results?.map(({ id, ...movie }) => (
              <LazyLoadComponent
                key={id}
                useIntersectionObserver
                threshold={0.3}
                placeholder={
                  <div>
                    <div className="w-full h-64 bg-gray-800 animate-pulse"></div>
                    <div className="w-1/2 h-4 bg-gray-800 animate-pulse mt-2"></div>
                    <div className="w-1/4 h-4 bg-gray-800 animate-pulse mt-2"></div>
                    <div className="w-1/6 h-4 bg-gray-800 animate-pulse mt-2"></div>
                  </div>
                }
              >
                <Link to={`/${category}/movie/${id}`}>
                  <MovieCard {...movie} />
                </Link>
              </LazyLoadComponent>
            ))}
          </div>

          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black rounded-lg">
            <Pagination
              {...{
                setPage,
                page,
                total_pages: parseInt(movies?.total_pages / 2) || 1,
                isLoading,
              }}
            />
          </div>
        </>
      )}
    </motion.section>
  );
};

export default MovieCategory;
