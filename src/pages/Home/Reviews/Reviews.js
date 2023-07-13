import React from 'react';
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import Review from './Review';

const Reviews = () => {


    const patientsReviews =[
        {
            id: 1,
            name: 'Wisehenry',
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            photo: people1,
            country:'New York' 
        },
        {
            id: 2,
            name: 'Jenney Afroz',
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            photo: people2,
            country:'Jacson Height' 
        },
        {
            id: 3,
            name: 'Kana Morita',
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            photo: people3,
            country:'Tokyo' 
        },
    ]

    return (
        <div className='mt-20'>
            <div className='text-start'>
                <h4 className='text-lg text-primary font-bold'>Testimonial</h4>
                <h2 className='text-3xl '>What Our Patients Says</h2>
            </div>
            <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-28'>
                {
                    patientsReviews.map(say => <Review
                    key={say.id}
                    say={say}
                    ></Review>)
                }
            </div>
        </div>
    );
};

export default Reviews;