import {createBrowserRouter} from 'react-router-dom';
import Home from '../Home/Home/Home';
import Main from '../layout/Main';
import Login from '../Login/Login';
import Appointment from '../Appointment/Appointment/Appointment';
import SignUp from '../SignUp/SignUp';
import DashBoard from '../DashBoard/DashBoard/DashBoard';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import DashboardLayout from '../layout/DashboardLayout';
import MyAppointment from '../DashBoard/MyAppointment/MyAppointment';
import AllUsers from '../DashBoard/AllUsers/AllUsers';
import AdminRoutes from './AdminRoutes/AdminRoutes';
import AddDoctor from '../DashBoard/AddDoctor/AddDoctor';
import ManageDoctors from '../DashBoard/ManageDoctors/ManageDoctors';
import Payment from '../DashBoard/Payment/Payment';
import DisplayError from '../Shared/DisplayError/DisplayError';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
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
        element:<PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        errorElement: <DisplayError></DisplayError>,
        children:[
            {
                path:'/dashboard',
                element:<MyAppointment></MyAppointment>
            },
            {
                path:'/dashboard/all-users',
                element:<AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
                path:'/dashboard/addDoctor',
                element:<AdminRoutes><AddDoctor></AddDoctor></AdminRoutes>
            },
            {
                path:'/dashboard/manageDoctors',
                element:<AdminRoutes><ManageDoctors></ManageDoctors></AdminRoutes>
            },
            {
                path:'/dashboard/payment/:id',
                element:<Payment/>,
                loader: ({params})=> fetch(`https://doctors-portal-server-two-wine.vercel.app/bookings/${params.id}`)
            }
        ]
    }
])