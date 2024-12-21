import { useNavigate } from "react-router-dom"
import { AppBar } from "../components/AppBar"
import { Button } from "../components/Button"

export const Index = ()=>{
    const navigate = useNavigate();
    return(
        <div className="h-screen flex flex-col">
            <div className="flex flex-row justify-between px-3 py-3 text-lg border-b-2">
                <div className="font-bold text-2xl">
                    <span>Payments App</span>
                </div>
                <div className="flex flex-row  items-center text-base">
                    <button className="rounded-lg bg-gray-800 hover:bg-gray-600 text-white border border-gray-700 py-2 font-medium px-5 hover:cursor-pointer focus:outline-none"
                    onClick={()=>{
                        navigate("/signin")
                    }}
                    >Sign In</button>
                    <button className="rounded-lg bg-gray-800 hover:bg-gray-600 text-white border border-gray-700 py-2 font-medium px-5 hover:cursor-pointer focus:outline-none ml-3"
                    onClick={()=>{
                        navigate("/signup")
                    }}
                    >Sign Up</button>
                </div>
            </div>
            <main className="flex-grow bg-gray-200 flex flex-col justify-center items-center text-center px-4">
                <h1 className="font-semibold text-2xl mb-2">
                Welcome to Payment's App
                </h1>
                <p className="text-lg mb-4">
                A safe and secure way to transfer money.
                </p>
                <p className="text-base mb-4">
                Easily manage your finances, track your
                spending, and make transactions.
                </p>
            </main>
            <footer className="w-full bg-white py-4 flex justify-center items-center shadow-inner">
                <div className="text-sm text-gray-500">
                © 2024 Payments App. All rights reserved.
                </div>
            </footer>
        </div>
    )
}