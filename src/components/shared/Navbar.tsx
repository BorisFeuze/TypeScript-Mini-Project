import { useState, type ChangeEventHandler } from "react";
import { Link } from "react-router-dom";
import { useArtwork } from "../../context";
import { debounce } from "../../utils";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isActive, setIsActive] = useState(true);

  const { setForm, form } = useArtwork();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    debounce(
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value })),
      300
    );
  };
  // close dropdown after clicking a link
  const handleCloseMenu = () => {
    const activeElement = document.activeElement;
    if (activeElement && (activeElement as HTMLElement).blur) {
      (activeElement as HTMLElement).blur(); // close dropdown by removing focus
    }
  };

  console.log(isActive);

  return (
    <nav className="navbar fixed top-0 z-50 w-full bg-white/95 backdrop-blur border-b shadow-sm">
      {/* Left: brand + mobile menu */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-56"
          >
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  handleCloseMenu();
                  setIsActive(true);
                }}
                className="btn btn-sm bg-slate-800 text-white hover:-translate-y-0.5 hover:shadow-md transition"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                onClick={() => {
                  handleCloseMenu();
                  setIsActive(false);
                }}
                className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-md transition"
              >
                my Favourite
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Brand */}
        <Link to="/" className="btn btn-ghost text-xl font-bold text-slate-900">
          Art Institute App
        </Link>
      </div>
      <div className={`${isActive ? "menu-active" : ""}`}>
        <label className="input w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="search"
            value={form.search}
            onChange={handleChange}
            required
            placeholder="Search"
          />
        </label>
      </div>
      {/* Right: desktop links */}
      <div className="navbar-end hidden lg:flex">
        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            className="btn bg-slate-800 text-white hover:-translate-y-0.5 hover:shadow-md transition"
            onClick={() => {
              setIsActive(true);
            }}
          >
            Home
          </NavLink>

          <NavLink
            to="/cart"
            className="btn bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-md transition"
            onClick={() => {
              setIsActive(false);
            }}
          >
            my Favourite
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
