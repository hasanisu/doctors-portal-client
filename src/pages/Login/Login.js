import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {signInUser, signInWithGoogle} = useContext(AuthContext);
    const [loginError, setLoginError] = useState('')
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail)
    const location = useLocation;
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    if(token){
        navigate(from, {replace:true});
    }

    const handleLogin = data => {
        console.log(data)
        setLoginError('')
        signInUser(data.email, data.password)
        .then(result => {
            const user = result.user
            setLoginUserEmail(data.email)
            console.log("check email",data.email)

        })
        .catch(err => {
            console.error(err.message)
            setLoginError(err.message)
        })
    }

    const handleToLoginWithGoogle=()=>{
        signInWithGoogle()
        .then(result=> {
            const user = result.user;
            console.log(user)
        })
        .catch(err => console.error(err))
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7 shadow-lg'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type='text'
                            {...register("email", { required: "Email Address is required", })}
                            className="input input-bordered w-full max-w-xs" />
                        {
                            errors.email &&
                            <div className="alert alert-warning p-2 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span className='text-sm'>{errors.email?.message}</span>
                            </div>
                        }

                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type='password'
                            {...register("password",
                                {
                                    required: "Password is required",
                                    minLength: {value:6, message:'password must be 6 charecter or longer'}
                                })}
                            className="input input-bordered w-full max-w-xs" />
                        <label className="label"><span className="label-text">Forget Password?</span></label>
                        {
                            errors.password &&
                            <div className="alert alert-warning p-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span className='text-sm'>{errors.password?.message}</span>
                            </div>
                        }
                    </div>


                    <input className='btn btn-accent w-full' value='Login' type="submit" />
                    {loginError && <p className='text-red-600'>{loginError}</p>}
                </form>

                <p>New to Doctors Portal <Link className='text-secondary' to='/signup'>Create new cccount</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleToLoginWithGoogle} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;