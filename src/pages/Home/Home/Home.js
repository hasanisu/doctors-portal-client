import React from 'react';
import Banner from '../Banner/Banner';
import DentalCare from '../DentalCare/DentalCare';
import Information from '../Information/Information';
import MakeAppoinment from '../MakeAppoinment/MakeAppoinment';
import Services from '../Services/Services';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <Information></Information>
            <Services></Services>
            <DentalCare></DentalCare>
            <MakeAppoinment></MakeAppoinment>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;