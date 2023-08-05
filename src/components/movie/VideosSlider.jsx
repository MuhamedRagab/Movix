/* eslint-disable react/prop-types */
// import Swiper core and required modules
import { Navigation, A11y, EffectCoverflow } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const VideosSlider = ({ videos }) => {
  return (
    <Swiper
      effect={"coverflow"}
      spaceBetween={50}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      modules={[Navigation, A11y, EffectCoverflow]}
      className="mySwiper"
      navigation
    >
      {videos.map(({ id, key, title }) => (
        <SwiperSlide key={id}>
          <iframe
            src={`https://www.youtube.com/embed/${key}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="allowfullscreen"
            className="w-full pt-8"
            height={300}
            loading="lazy"
          ></iframe>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideosSlider;
