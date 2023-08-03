/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { memo, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moviesApis from "@/configs/moviesApis";

export const MoviesCategorisList = memo(({ drawerOverlayRef }) => {
  const { category } = useParams();
  const [active, setActive] = useState(
    category || moviesApis[0]?.title || "Top Rated"
  );

  useEffect(() => {
    setActive(category);
  }, [category]);

  return (
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content gap-2">
      {moviesApis.map(({ title }) => (
        <li key={title}>
          <Link
            to={`/${title}`}
            className={`${
              active === title && "text-gray-200"
            } text-xl p-2 hover:text-gray-200 duration-300`}
            onClick={() => {
              setActive(title);
              drawerOverlayRef.current.click();
            }}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
});

const LeftDrawer = () => {
  const drawerOverlayRef = useRef(null);

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content fixed top-1/2 left-2 -translate-y-1/2">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn btn-circle btn-neutral drawer-button"
        >
          <BsFillArrowRightCircleFill size={24} />
        </label>
      </div>
      <div className="drawer-side">
        <label
          ref={drawerOverlayRef}
          htmlFor="my-drawer"
          className="drawer-overlay"
        ></label>
        {/* Sidebar content here */}
        <MoviesCategorisList drawerOverlayRef={drawerOverlayRef} />
      </div>
    </div>
  );
};

export default LeftDrawer;
