/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import MovieCard from "@/components/movie/MovieCard";

// import Swiper core and required modules
import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { memo } from "react";

const ImagesSlider = ({ category, movies }) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        300: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        500: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
      modules={[Navigation]}
      navigation
      className="mt-4"
    >
      {movies.map(({ id, ...movie }) => (
        <SwiperSlide key={id}>
          <Link to={`/${category}/movie/${id}`}>
            <MovieCard {...{ ...movie }} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default memo(ImagesSlider);
