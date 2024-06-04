import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { useContext } from "react";
import UserContext from "../Context/userContext";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const Navigate = useNavigate();

  const handlelogout = () => {
    logout();
    setUser(false);
    Navigate("/");
  };

  return (
    <nav className=" bg-blue-300 h-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <span className="font-semibold text-white text-3xl">
                BANK OF CODED
              </span>
            </Link>
          </div>
          <div className="block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/"
                className=" text-white hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
              >
                Home
              </NavLink>
              <>
                {user ? (
                  <>
                    <NavLink
                      to="/users"
                      className=" text-white hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                    >
                      Users
                    </NavLink>

                    <NavLink
                      to="/profile"
                      className=" text-white hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/transactions"
                      className=" text-white hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                    >
                      Transactions
                    </NavLink>
                    <NavLink
                      to="/Account"
                      className=" text-white hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                    >
                      Account
                    </NavLink>
                    <button
                      onClick={handlelogout}
                      className=" text-white hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className=" text-white hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className=" text-white hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
