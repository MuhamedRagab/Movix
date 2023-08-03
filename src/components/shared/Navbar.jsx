import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
// import { AiFillHeart } from "react-icons/ai";
import useCookieAuth from "@/hooks/useCookieAuth";
import { googleLogout } from "@react-oauth/google";
import SelectTheme from "@components/daisyui/SelectTheme";

export default function Navbar() {
  const { removeAuth } = useCookieAuth();

  const signOut = () => {
    removeAuth();
    googleLogout();
  };

  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Movix
          </Link>
        </div>

        <div className="flex-none items-center">
          {/* Favourites */}
          <button className="mr-3">
            <SelectTheme size={30} />
          </button>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <FaUserCircle size={32} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
            >
              {/* Settings */}

              <li>
                <button className="text-md font-bold" onClick={signOut}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

{
  /* <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle hover:text-red-700 duration-300"
      >
        <div className="indicator ">
          <AiFillHeart size={20} />
          <span className="badge badge-sm indicator-item">0</span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">
              View cart
            </button>
          </div>
        </div>
      </div>
    </div> */
}

{
  /* <li>
  <button className="text-md font-bold">Settings</button>
</li> */
}
