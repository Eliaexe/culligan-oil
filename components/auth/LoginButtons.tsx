import React from "react";
import { doSocialLogin } from "@/app/actions";

export default function LoginButtons() {
    return (
        <div className="flex flex-col space-y-3 mb-4">
            <button
                className='bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition duration-200'
                onClick={() => doSocialLogin("google")}
            >
                Sign In with Google
            </button>
            <button
                className='bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900 transition duration-200'
                onClick={() => doSocialLogin("github")}
            >
                Sign In with Github
            </button>
        </div>
    )
}
