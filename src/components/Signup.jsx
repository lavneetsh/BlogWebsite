import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Logo } from './index.js';

// This is a simple UI component. All the logic will be in the page that uses it.
function Signup() {
  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 p-10`}>
            <div className="mb-4 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-slate-900">
                Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-slate-600">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-teal-600 transition-all duration-200 hover:underline hover:text-teal-700"
                >
                    Sign In
                </Link>
            </p>
            
            {/* The form and inputs are now handled by the page component */}
            {/* We will pass them down as children in the next step. */}
        </div>
    </div>
  );
}

export default Signup;