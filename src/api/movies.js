import moviesApis from "@/configs/moviesApis";
import { axiosInstance } from "@utils/axiosInstance";

const apiKey = import.meta.env.VITE_API_KEY;

export const getMoviesByCategory = ({ queryKey }) => {
  const [, category] = queryKey;
  const { url } = moviesApis.find((item) => item.title === category);

  return axiosInstance.get(`${url}?api_key=${apiKey}`);
};

export const getMovieById = ({ queryKey }) => {
  const [, id] = queryKey;

  return axiosInstance.get(
    `/movie/${id}?api_key=${apiKey}&append_to_response=videos`
  );
};
