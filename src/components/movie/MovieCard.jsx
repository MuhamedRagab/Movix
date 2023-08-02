/* eslint-disable react/prop-types */
const MovieCard = ({
  backdrop_path,
  poster_path,
  title,
  original_title,
  release_date,
  vote_average,
  popularity,
  vote_count,
}) => {
  return (
    <div className="relative group overflow-hidden">
      <div>
        <img
          className="image-full w-full h-full object-cover duration-300 transform group-hover:scale-125"
          src={`${import.meta.env.VITE_BASE_IMAGE_URL}/${
            poster_path || backdrop_path
          }`}
          alt={title || original_title}
          loading="lazy"
        />
      </div>
      <div className="absolute -top-full group-hover:top-0 left-0 w-full h-full bg-black bg-opacity-90 p-2 text-md overflow-auto duration-300 select-none">
        <p className="text-lg font-black mb-2">{title || original_title}</p>
        <p className="text-md  font-b">Date: {release_date}</p>
        <p className="text-md">votes: {vote_average}</p>
        <p className="text-md">popularity: {popularity}</p>
        <p className="text-md">votes count: {vote_count}</p>
      </div>
    </div>
  );
};

export default MovieCard;
