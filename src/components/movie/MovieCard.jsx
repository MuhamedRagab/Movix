import { LazyLoadImage } from "react-lazy-load-image-component";

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
    <div className="relative group overflow-hidden ">
      <div>
        <LazyLoadImage
          wrapperClassName="bg-base-200 overflow-hidden"
          className="image-full object-cover transform sm:group-hover:scale-125"
          src={`${import.meta.env.VITE_BASE_IMAGE_URL}/${
            poster_path || backdrop_path
          }?w=200&h=300`}
          style={{ transition: "transform 0.25s ease-in-out" }}
          alt={title || original_title}
          loading="lazy"
          effect="blur"
          useIntersectionObserver
          threshold={0.3}
          draggable={false}
          height={300}
          width={200}
        />
      </div>
      <div className="absolute -top-full hidden sm:block group-hover:-top-[6px] left-0 w-full h-full bg-black bg-opacity-90 p-2 text-md overflow-auto duration-300 select-none">
        <p className="text-lg font-black mb-2">{title || original_title}</p>
        <p className="text-base font-b">Date: {release_date}</p>
        <p className="text-base">votes: {vote_average}</p>
        <p className="text-base">popularity: {popularity}</p>
        <p className="text-base">votes count: {vote_count}</p>
      </div>
    </div>
  );
};

export default MovieCard;
