import React, { useContext } from "react";
import Navbar from "../Shared/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useAdmin from "../../hooks/useAmdin";

const DashboardLayout = () => {
  const {user} = useContext(AuthContext);
  const [isAdmin] = useAdmin(user.email);
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <li>
              <Link to='/dashboard'>My Appointment</Link>
            </li>
            {
              isAdmin && <>
              <li>
              <Link to='/dashboard/all-users'>All Users</Link>
              <Link to='/dashboard/addDoctor'>Add a Doctor</Link>
              <Link to='/dashboard/manageDoctors'>Manage Doctors</Link>
              </li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
