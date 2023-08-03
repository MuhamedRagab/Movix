import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import MovieCard from "@/components/movie/MovieCard";
import toast from "react-hot-toast";
import { getMoviesByCategory } from "@/api/movies";
import Pagination from "@/components/daisyui/Pagination";
import { useState } from "react";

const MovieCategory = () => {
  const location = useLocation();
  const { category } = useParams();
  const [page, setPage] = useState(1);

  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies", category, page],
    queryFn: (category) => getMoviesByCategory(category, page),
    select: (data) => data.data,
    cacheTime: 1000 * 60 * 60, // 1 hour
    optimisticResults: true,
    getPreviousPageParam: (firstPage) => firstPage - 1,
    getNextPageParam: (lastPage) => lastPage + 1,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });

  return (
    <motion.section
      key={location.pathname}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0, y: 100 }}
      className="container mx-auto px-2 py-4 mt-6"
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
        <div className="flex justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-8 gap-4">
            {movies?.results?.map(({ id, ...movie }) => (
              <Link to={`/${category}/movie/${id}`} key={id}>
                <MovieCard {...movie} />
              </Link>
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
