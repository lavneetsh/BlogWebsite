import React, { useState } from 'react';
import authService from '../appwrite/auth'; // Or your firebase service
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { Button, Input, Logo } from '../components'; // Import the building blocks
import { useForm } from 'react-hook-form';
import { getFriendlyAuthErrorMessage } from '../utils/errorUtils'; // Utility for error messages

// Note: We are no longer importing the component `Signup` from `../components`.
// This page component IS the signup page.

function SignupPage() { // Renamed to avoid confusion
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const session = await authService.createAccount(data);
            if (session) {
                const loggedInSession = await authService.login({ email: data.email, password: data.password });
                if (loggedInSession) {
                    const userData = await authService.getCurrentUser();
                    if (userData) {
                        dispatch(login(userData));
                        navigate("/");
                    }
                }
            }
        } catch (error) {
            const friendlyMessage = getFriendlyAuthErrorMessage(error);
        setError(friendlyMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-slate-50 px-4">
            <div className={`mx-auto w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 p-10`}>
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]"><Logo width="100%" /></span>
                </div>
                <h2 className="text-center text-2xl font-bold text-slate-900">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-slate-600">
                    Already have an account?&nbsp;
                    <Link to="/login" className="font-medium text-teal-600">Sign In</Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center bg-red-100 p-2 rounded">{error}</p>}
                
                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className='space-y-6'>
                        <Input label="Full Name:" placeholder="Enter your full name" {...register("name", { required: true })} />
                        <Input label="Email:" placeholder="Enter your email" type="email" {...register("email", { required: true })} />
                        <Input label="Password:" placeholder="Enter your password" type="password" {...register("password", { required: true })} />
                        <Button type="submit" className="w-full">Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;