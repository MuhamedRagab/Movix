/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { getMovieById } from "@/api/movies";
import VideosSlider from "@components/movie/VideosSlider";

export const ProductionCompanies = ({ production_companies }) => {
  if (!production_companies) return null;

  return (
    <>
      {production_companies.length > 0 && (
        <div>
          <h4 className="text-center footer-title">production_companies:</h4>
          <div className="flex gap-2 items-center">
            {production_companies.map(
              ({ id, name, logo_path }) =>
                logo_path && (
                  <div key={id}>
                    <h5 className="text-center footer-title">{name}</h5>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${logo_path}`}
                      alt={name}
                      className="w-28 bg-white object-contain"
                      draggable={false}
                    />
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const SpokenLanguages = ({ spoken_languages }) => {
  if (!spoken_languages) return null;

  return (
    <div>
      <h4 className="text-center footer-title">Spoken: </h4>
      {spoken_languages.map(({ iso_639_1, name }) => (
        <span key={iso_639_1} className="badge badge-primary badge-lg m-1">
          {name}
        </span>
      ))}
    </div>
  );
};

export const ProductionCompaniesNames = ({ production_companies }) => {
  if (!production_companies) return null;

  return (
    <div>
      <h4 className="text-center footer-title">Production: </h4>
      {production_companies.map(({ id, name }) => (
        <span key={id} className="badge badge-primary badge-lg m-1">
          {name}
        </span>
      ))}
    </div>
  );
};

const ProductionCountries = ({ production_countries }) => {
  if (!production_countries) return null;

  return (
    <div>
      <h4 className="text-center footer-title">Countries: </h4>
      {production_countries.map(({ iso_3166_1, name }) => (
        <span key={iso_3166_1} className="badge badge-primary badge-lg m-1">
          {name}
        </span>
      ))}
    </div>
  );
};

const Geners = ({ genres }) => {
  if (!genres) return null;

  return (
    <div>
      <h4 className="text-center footer-title">Genres: </h4>
      {genres.map(({ id, name }) => (
        <span key={id} className="badge badge-primary badge-lg m-1">
          {name}
        </span>
      ))}
    </div>
  );
};

export const MovieInfo = ({
  videos,
  title,
  tagline,
  overview,
  status,
  release_date,
  vote_average,
  budget,
  popularity,
  vote_count,
}) => {
  return (
    <article className="container mx-auto p-2">
      <h1 className="text-4xl font-bold py-4 text-center text-gray-300">
        Movie {title}
      </h1>
      <h3 className="text-center">{tagline}</h3>
      <p className="text-center mt-4">{overview}</p>
      <div className="flex flex-col justify-center items-center mt-4 text-lg capitalize">
        <p className="text-center capitalize">
          {status}: {release_date}
        </p>

        <p className="text-center">votes average: {vote_average}</p>
        <p className="text-center">votes count: {vote_count}</p>
        {budget > 0 && <p>Budget: {budget}&#36;</p>}
        <p>popularity: {popularity}</p>
      </div>

      {videos?.results && <VideosSlider videos={videos?.results} />}
    </article>
  );
};

const Movie = () => {
  const { id } = useParams();
  const { data: movie } = useQuery({
    queryKey: ["movie", id],
    queryFn: (id) => getMovieById(id),
    select: (data) => data.data,
    cacheTime: 1000 * 60 * 10, // 1 hour
    staleTime: 1000 * 60 * 10, // 1 hour
    suspense: true,
    useErrorBoundary: true,
    enabled: !!id,
    optimisticResults: true,
    onSuccess: (data) => {
      document.title = `${data.title} | Movie App`;
    },
    onError: () => {
      toast.error("Something went wrong");
      toast.error("Come back later");
    },
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0, y: 100 }}
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage:
          movie?.backdrop_path &&
          `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="pt-16 bg-black bg-opacity-70">
        {/* Info */}
        <MovieInfo {...movie} />

        {/* footer */}
        <footer className="p-10 bg-base-200 text-base-content mt-8 text-center">
          <div className="flex flex-wrap justify-center items-center mt-4 gap-4">
            <Geners genres={movie.genres} />
            <ProductionCompaniesNames
              production_companies={movie.production_companies}
            />
            <SpokenLanguages spoken_languages={movie.spoken_languages} />
            <ProductionCountries
              production_countries={movie.production_countries}
            />
            <ProductionCompanies
              production_companies={movie.production_companies}
            />
          </div>
        </footer>
      </div>
    </motion.section>
  );
};

export default Movie;
