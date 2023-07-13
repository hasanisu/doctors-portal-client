import React from 'react';
import clock from '../../../assets/icons/clock.svg'
import location from '../../../assets/icons/marker.svg'
import phone from '../../../assets/icons/phone.svg'

const Information = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-6'>
                <div className="bg-gradient-to-r from-primary to-secondary text-center lg:text-start text-white rounded-lg lg:flex pt-12 pb-12 pl-5 pr-8">
                    <img src={clock} alt="" className='inline items-center lg:mr-5' />
                    <div className='mt-4'>
                        <h2>Opening Hours</h2>
                        <p>Mon to Fri- 9:00 AM to 5:00 PM</p>
                    </div>
                </div>
                <div className="bg-accent text-center lg:text-start text-white rounded-lg lg:flex pt-12 pb-12 pl-5 pr-8">
                    <img src={location} alt="" className='inline mr-5' />
                    <div className='mt-4'>
                        <h2>Visit Our Location</h2>
                        <p>Aoto, Katsushika-ku, Tokyo, Japan</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-primary to-secondary text-center lg:text-start text-white rounded-lg lg:flex pt-12 pb-12 pl-5 pr-8">
                    <img src={phone} alt="" className='inline mr-5' />
                    <div className='mt-4'>
                        <h2>Contact us Now</h2>
                        <p>+8180-3000-3000</p>
                    </div>
                </div>
                
            </div>
    );
};

export default Information;