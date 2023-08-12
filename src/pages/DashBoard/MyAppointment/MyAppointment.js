import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import { Button } from "react-day-picker";
import { Link } from "react-router-dom";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const [myAppointmentLoading, setMyAppointmentLoading] = useState(true);
  

  const url = `https://doctors-portal-server-two-wine.vercel.app/bookings?email=${user?.email}`;
  const { data: userBookings = [], isLoading } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      setMyAppointmentLoading(true)
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      setMyAppointmentLoading(false);
      return data;
      
    },
  });
  console.log(userBookings);

  // if (isLoading) {
  //   return <Loading></Loading>;
  // }

  return (
    <div>
      <h3 className="text-3xl mb-5">My Appointments</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-gray-200">
              <th>Sl.No</th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Time</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {
            myAppointmentLoading? 
            
            <Loading></Loading> 
            :
            userBookings?.map((userBooking, i) => (
              <tr className="hover" key={userBooking._id}>
                <th>{i + 1}</th>
                <th>{userBooking.patient}</th>
                <td>{userBooking.treatment}</td>
                <td>{userBooking.slot}</td>
                <td>{userBooking.appointmentDate}</td>
                <td>${userBooking.price}</td>
                <td>
                  {userBooking.price && !userBooking.paid && (
                    <Link to={`/dashboard/payment/${userBooking._id}`}>
                      <button className="btn btn-primary btn-sm">Pay</button>
                    </Link>
                  )}

                  {userBooking.price && userBooking.paid && (
                    <span className="text-green-600">paid</span>
                  )}
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
