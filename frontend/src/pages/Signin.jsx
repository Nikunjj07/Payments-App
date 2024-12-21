import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { Warning } from "../components/Warning"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const Signin = ()=>{
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    return(
        <div className="bg-slate-400 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-96 p-2 px-4 h-max text-center">
                    <Heading label={"Sign In"}/>
                    <SubHeading label={"Enter your credentials to access your account"}/>
                    <Input label= {"Email"} placeholder={"johndoe@gmail.com"}
                        onChange={(e)=>{
                            setUsername(e.target.value);
                        }}
                    />
                    <Input label={"Password"} placeholder={"Password"}
                        onChange={(e)=>{
                            setPassword(e.target.value);
                        }}
                    />
                    <Button label={"Sign In"} onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username,
                            password
                        })
                        localStorage.setItem("token",response.data.token)
                       navigate("/dashboard");
                    }}/>
                    <Warning buttonName={"Sign Up"} label={"Already have an account?"} to={"/signup"}/>
                </div>
            </div>
        </div>
    )
}