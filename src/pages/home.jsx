import { Navigate } from "react-router-dom";
import moviesApis from "@/configs/moviesApis";

export default function Home() {
  return <Navigate to={moviesApis[0]?.title || "Top Rated"} />;
}
