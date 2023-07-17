import React from "react";

const BookingModal = ({treatment}) => {
    const {name} = treatment;
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
            <label htmlFor="booking-modal" className="btn">
              ✕
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
