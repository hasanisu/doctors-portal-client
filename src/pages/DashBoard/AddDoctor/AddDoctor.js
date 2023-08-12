import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const {register,formState: { errors },handleSubmit,} = useForm();
  
  const imageHostKey = process.env.REACT_APP_imgbb_key
  const navigate = useNavigate();
  const {data: specialties = [], isLoading} = useQuery({
    queryKey:['specialty'],
    queryFn: async ()=>{
        const res = await fetch('https://doctors-portal-server-two-wine.vercel.app/appointmentSpecialty');
        const data = await res.json();
        return data;
    }
  })

  const handleAddDoctor = (data) => {
    console.log(data);

    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(imgData => {
      if(imgData.success){
        console.log(imgData.data.url);
        const doctor = {
          name: data.name,
          email: data.email,
          specialty: data.specialty,
          image: imgData.data.url
        }

        //save doctor information to the database
        fetch('https://doctors-portal-server-two-wine.vercel.app/doctors', {
          method: 'POST',
          headers:{
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(doctor)
        })
        .then(res => res.json())
        .then(result => {
          console.log(result)
          toast.success(`${data.name} is added successfully`)
          navigate('/dashboard/manageDoctors')

        })
      }
    })
  };

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="w-96 p-7">
      <h2>Add a Doctor</h2>
      <form onSubmit={handleSubmit(handleAddDoctor)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.name && (
            <div className="alert alert-warning p-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-sm">{errors.name?.message}</span>
            </div>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: true,
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.email && (
            <div className="alert alert-warning p-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-sm">{errors.email?.message}</span>
            </div>
          )}
        </div>

        <label className="label">
          <span className="label-text">Specialty</span>
        </label>
        <select
        {...register("specialty", {
          required: true,
        })}
        className="input-bordered select select-ghost w-full max-w-xs mb-5">
          <option disabled selected>
            Please Select a Specialty
          </option>
          {
            specialties.map(specialty => <option
            key={specialty._id}
            value={specialty.name}
            >{specialty.name}</option>)
          }
          
        </select>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input
            type="file"
            {...register("image", {
              required: "Image is required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.image && (
            <div className="alert alert-warning p-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-sm">{errors.image?.message}</span>
            </div>
          )}
        </div>

        <input
          className="btn btn-accent w-full"
          value="Add a Doctor"
          type="submit"
        />
        {/* {signupError && <p className='text-red-600'>{signupError}</p>} */}
      </form>
    </div>
  );
};

/*
* Three places to store images
* 1. Third party image hosting server 
* 2. File system of your server 
* 3. mongodb 
*/

export default AddDoctor;
