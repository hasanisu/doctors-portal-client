import React from "react";

const AppointmentOption = ({ option, setTreatment }) => {
    const {name, price, slots} = option;
  return (
    <div>
      <div className="card shadow-xl">
        <div className="card-body text-center ">
          <h2 className="text-2xl text-secondary font-bold">{name}</h2>
          <p>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
          <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available </p>
          <p><small>Price:$ {price}</small></p>
          <div className="card-actions justify-center">
            <label 
            disabled={slots.length === 0}
            onClick={()=> setTreatment(option)}
            htmlFor="booking-modal" 
            className="btn btn-primary text-white">Book Appointment</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
