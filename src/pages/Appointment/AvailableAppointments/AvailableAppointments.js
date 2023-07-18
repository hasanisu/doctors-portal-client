import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';


const AvailableAppointments = ({selectedDate}) => {
    const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null)
    useEffect(()=>{
        fetch('appointmentOptions.json')
        .then(res => res.json())
        .then(data => setAppointmentOptions(data))
    },[])
    return (
        <section className='my-16'>
            <h2 className='text-center text-secondary font-bold'>Available Services on {format(selectedDate, "PP")}</h2>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10'>
            {
                appointmentOptions.map(option => <AppointmentOption
                key={option._id}
                option={option}
                setTreatment={setTreatment}
                ></AppointmentOption>
                )
                
            }
                
            </div>
            {
            treatment && <BookingModal 
            treatment={treatment}
            selectedDate={selectedDate}
            setTreatment={setTreatment}
            ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;