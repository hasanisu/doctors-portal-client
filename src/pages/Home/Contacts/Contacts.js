import React from "react";
import bg from "../../../assets/images/appointment.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const Contacts = () => {
  return (
    <section
      className="mt-10"
      style={{
        background: `url(${bg})`,
      }}
    >
       <div className="text-center pt-14 mb-10">
       <h4 className="text-xl font-semibold text-secondary">Contact us</h4>
        <h2 className="text-4xl text-white">Stay connect with us</h2>
       </div>
      <form className=" pb-14">
      <div className="flex justify-center mb-3">
      <input type="text" placeholder="Email Address" className="input w-full max-w-md" /> <br />
      </div>
      <div className="flex justify-center mb-3">
      <input type="text" placeholder="Subject" className="input w-full max-w-md" /> <br />
      </div>
      <div className="flex justify-center mb-12">
        <textarea placeholder="Your message" className="textarea textarea-bordered textarea-lg w-full p-3 max-w-md" ></textarea>
      </div>
      <div className="flex justify-center">
      <PrimaryButton>Submit</PrimaryButton>
      </div>
      </form>
    </section>
  );
};

export default Contacts;
