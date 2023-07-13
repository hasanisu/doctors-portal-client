import React from 'react';

const Review = ({say}) => {
    const {name, photo, country, review } = say;
    return (
        <div className="card shadow-md text-gray-600">
            <div className="card-body items-center text-center">
                <p>{review}</p>
                <div className="card-actions justify-end">
                    <img src={photo} alt="" className='rounded-full border-4 border-primary'/>
                    <div className='text-start ml-5 mt-3'>
                        <h4 className='font-bold'>{name}</h4>
                        <p>{country}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;