import moviesApis from "@/configs/moviesApis";
import { useQueries } from "react-query";
import toast from "react-hot-toast";
import { getMoviesByCategory } from "@/api/movies";
import ImagesSlider from "@/components/movie/ImagesSlider";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";

const queries = moviesApis.map(({ title }) => {
  return {
    queryKey: ["movies", title],
    queryFn: (title) => getMoviesByCategory(title, 1),
    select: (data) => {
      return {
        category: title,
        data: data.data.results,
      };
    },
    enabled: !!title,
    cacheTime: 1000 * 60 * 60, // 1 hour
    staleTime: 1000 * 60 * 60, // 1 hour
    optimisticResults: true,
    suspense: true,
    keepPreviousData: true,
    useErrorBoundary: true,
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
      toast.error("Come back later");
    },
  };
});

export default function Home() {
  const data = useQueries(queries);

  return (
    <section className="container mx-auto px-2 pt-4 pb-20 mt-6">
      <h1 className="text-4xl font-bold text-center capitalize">
        Welcome to movix
      </h1>
      <div className="mt-12">
        {data?.map(({ data, isLoading }) => (
          <div key={data?.category || Math.random().toString()}>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="relative mt-6">
                <Link
                  to={`/${data?.category}`}
                  className="text-2xl font-bold capitalize link-hover"
                >
                  {data?.category}
                </Link>
                <ImagesSlider category={data?.category} movies={data?.data} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
