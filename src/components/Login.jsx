import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData){  dispatch(authLogin(userData)); 
                
                navigate("/");
            }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen w-full bg-slate-50 px-4'>
        <div className={`mx-auto w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 p-10`}>
            <div className="mb-4 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-slate-900">
                Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-slate-600">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-teal-600 transition-all duration-200 hover:underline hover:text-teal-700"
                >
                    Sign Up
                </Link>
            </p>
            {error && (
                <p className="text-red-600 mt-8 text-center bg-red-100 border border-red-300 rounded-lg py-2">
                    {error}
                </p>
            )}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-6'>
                    <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors duration-200"
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login