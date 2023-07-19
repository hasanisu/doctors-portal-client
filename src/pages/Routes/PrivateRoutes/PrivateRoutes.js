import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation;
    if(loading){
        return <div className=' bg-red-300 w-4/12 h-16 rounded-md mx-auto mt-52 flex justify-center'>
            <p className='mt-3 text-2xl'>Loading ....</p>
            <span className="loading loading-ring loading-lg mr-"></span>
            </div>
    }
    if(user){
        return children 
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoutes;