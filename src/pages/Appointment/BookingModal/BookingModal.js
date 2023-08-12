import { format } from "date-fns";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { toast } from "react-hot-toast";

const BookingModal = ({ treatment, setTreatment, selectedDate,refetch }) => {
  const { name, price, slots } = treatment; // treatment is appointment option just different name
  const { user } = useContext(AuthContext);
  console.log(user);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const date = form.date.value;
    const name = form.name.value;
    const email = form.email.value;
    const slot = form.slot.value;
    const phone = form.phone.value;

    const booking = {
      appointmentDate: date,
      treatment: treatment.name,
      patient: name,
      slot,
      email,
      phone,
      price,
    };
    //TODO: send data to the server
    // and once data is saved then close the modal
    // and display success toast
    fetch("https://doctors-portal-server-two-wine.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setTreatment(null);
          toast.success("booking confirmed");
          refetch();
        }
        else{
          toast.error(data.message)
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-0 top-0 mr-3 mt-3 rounded-md"
          >
            {" "}
            ✕{" "}
          </label>
          <h3 className="font-bold text-lg mb-5">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              name="date"
              type="text"
              disabled
              value={format(selectedDate, "PP")}
              className="input input-bordered w-full"
            />
            <select name="slot" className="select select-bordered w-full" >
              <option>Select Your Time Slot</option>

              {slots.map((slot, i) => (
                <option value={slot} key={i} required>
                  {slot}
                </option>
              ))}
            </select>
            <input
              defaultValue={user?.uid && user.displayName}
              disabled
              name="name"
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              defaultValue={user?.uid && user.email}
              disabled
              name="email"
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
            />
            <input
            required
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
          <div className="modal-action"></div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
