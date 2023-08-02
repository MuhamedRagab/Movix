import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { getMovieById } from "../../api/movies";

const Movie = () => {
  const { id } = useParams();
  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: (id) => getMovieById(id),
    select: (data) => data.data,
    cacheTime: 1000 * 60 * 10, // 1 hour
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });

  return (
    <motion.section
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage:
          movie?.backdrop_path &&
          `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="bg-black bg-opacity-70 h-full">
        <h1 className="text-4xl font-bold py-4 text-center text-gray-300">
          Movie {movie?.title}
        </h1>
        <h3 className="text-center">{movie?.tagline}</h3>

        {isLoading || !movie ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <article className="pt-16">
            <div className="container mx-auto">
              <iframe
                src={`https://www.youtube.com/embed/${movie?.videos.results[0].key}`}
                title={movie?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen="allowfullscreen"
                className="w-full h-96"
              ></iframe>
              <p className="text-center mt-4">{movie?.overview}</p>
              <div className="flex flex-col justify-center items-center mt-4 text-lg">
                {movie.status === "Relased" && (
                  <p className="text-center">
                    release date: {movie?.release_date}
                  </p>
                )}
                <p className="text-center">
                  votes average: {movie?.vote_average}
                </p>
                <p className="text-center">votes count: {movie?.vote_count}</p>
                <p>Budget: {movie?.budget}&#36;</p>
                <p>popularity: {movie?.popularity}</p>
              </div>
            </div>

            <footer className="bg-black bg-opacity-60 w-full mt-6 p-4">
              <div className="flex flex-col items-center justify-center"></div>
              <div className="flex flex-wrap justify-center items-center mt-4 gap-4">
                <div>
                  <h4 className="text-center font-bold">Genres: </h4>
                  {movie.genres.map(({ id, name }) => (
                    <span key={id} className="badge badge-primary badge-lg m-1">
                      {name}
                    </span>
                  ))}
                </div>

                <div>
                  <h4 className="text-center font-bold">Production: </h4>
                  {movie.production_companies.map(({ id, name }) => (
                    <span key={id} className="badge badge-primary badge-lg m-1">
                      {name}
                    </span>
                  ))}
                </div>

                <div>
                  <h4 className="text-center font-bold">Spoken: </h4>
                  {movie.spoken_languages.map(({ iso_639_1, name }) => (
                    <span
                      key={iso_639_1}
                      className="badge badge-primary badge-lg m-1"
                    >
                      {name}
                    </span>
                  ))}
                </div>

                <div>
                  <h4 className="text-center font-bold">Countries: </h4>
                  {movie.production_countries.map(({ iso_3166_1, name }) => (
                    <span
                      key={iso_3166_1}
                      className="badge badge-primary badge-lg m-1"
                    >
                      {name}
                    </span>
                  ))}
                </div>
                {movie?.production_companies.length > 0 && (
                  <div>
                    <h4 className="text-center font-bold">
                      production_companies:
                    </h4>
                    <div className="flex gap-2 items-center">
                      {movie.production_companies.map(
                        ({ id, name, logo_path }) =>
                          logo_path && (
                            <div key={id}>
                              <h5 className="text-center font-bold">{name}</h5>
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
              </div>
            </footer>
          </article>
        )}
      </div>
    </motion.section>
  );
};

export default Movie;
