import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import AppointmentOption from "./AppointmentOption";
import BookingModal from "../BookingModal/BookingModal";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";

const AvailableAppointments = ({ selectedDate }) => {
  // const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] = useState(null);
  const date = format(selectedDate, "PP");
  const {
    data: appointmentOptions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointmentOptions", date], //when date is selected then date will reload every time
    queryFn: async () => {
      const res = await fetch(
        `https://doctors-portal-server-two-wine.vercel.app/appointmentOption?date=${date}`
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  // useEffect(()=>{
  //     fetch('https://doctors-portal-server-two-wine.vercel.app/appointOption')
  //     .then(res => res.json())
  //     .then(data => setAppointmentOptions(data))
  // },[])
  return (
    <section className="my-16">
      <h2 className="text-center text-secondary font-bold">
        Available Services on {format(selectedDate, "PP")}
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {appointmentOptions.map((option) => (
          <AppointmentOption
            key={option._id}
            option={option}
            setTreatment={setTreatment}
          ></AppointmentOption>
        ))}
      </div>
      {treatment && (
        <BookingModal
          treatment={treatment}
          selectedDate={selectedDate}
          setTreatment={setTreatment}
          refetch={refetch}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppointments;
