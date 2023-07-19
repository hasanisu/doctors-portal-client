import {createBrowserRouter} from 'react-router-dom';
import Home from '../Home/Home/Home';
import Main from '../layout/Main';
import Login from '../Login/Login';
import Appointment from '../Appointment/Appointment/Appointment';
import SignUp from '../SignUp/SignUp';
import DashBoard from '../DashBoard/DashBoard/DashBoard';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/appointment',
                element:<Appointment></Appointment>
            },
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>
    }
])