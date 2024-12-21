import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { SubHeading } from "../components/SubHeading"
import { Warning } from "../components/Warning"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const Signup = ()=>{
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    return(
        <div className="bg-slate-400 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4">
                    <Heading label={"Signup"}/>
                    <SubHeading label={"Enter your information to create an account"} />
                    <Input onChange={(e)=>{
                        setFirstName(e.target.value)
                    }} label= {"First Name"} placeholder={"John"}/>
                    <Input onChange={(e)=>{
                        setLastName(e.target.value)
                    }} label= {"Last Name"} placeholder={"Doe"}/>
                    <Input onChange={(e)=>{
                        setUsername(e.target.value)
                    }} label= {"Email"} placeholder={"johndoe@gmail.com"}/>
                    <Input onChange={(e)=>{
                        setPassword(e.target.value)
                    }} label= {"Password"} placeholder={"123456"}/>
                    <Button label={"Sign Up"} onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        })
                        //response.data.token
                        localStorage.setItem('token',response.data.token)
                        navigate("/dashboard")
                    }}/>
                    <Warning buttonName={"Sign In"} label={"Already have an account?"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}