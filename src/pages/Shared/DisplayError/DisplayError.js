import React, { useContext } from "react";
import { Link, useLocation, useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const DisplayError = () => {
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate();
    const error = useRouteError();

    const handleLogout = () => {
    
        logOut()
          .then(() => {
            navigate('/login')
          })
          .catch((err) => console.err(err));
      };
    
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, something went wrong.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            {error.statusText || error.message}
          </p>
         
          <h4 className="text-3xl">Please <button onClick={handleLogout}>Sign Out</button></h4>
          
        </div>
      </div>
    </section>
  );
};

export default DisplayError;
