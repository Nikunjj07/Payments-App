import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "./Button"
import { Input } from "./Input"
import { useEffect, useState } from "react";
import axios from "axios";


export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter,setFilter] = useState("");

    //debouncing
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter).then(response=>{
                setUsers(response.data.user)
            })
    },[filter])

    return <div className="px-8 py-4">
            <div>
                <span className="font-bold text-xl">Users</span>
                <Input onChange={(e)=>{
                    setFilter(e.target.value)
                }} placeholder={"Search users"}/>
            </div>
            <div>
                <div className="">
                    {users.map((user) => <User user={user}/>)}
                </div>
            </div>
        </div>
    
}


function User({user}){
    const navigate = useNavigate();
    return(
        <div className="flex flex-row justify-between font-semibold">
            <div className="flex flex-row items-center">
                <div className="rounded-full h-12 w-12 bg-slate-200 text-2xl text-center mr-2">
                    <div className="flex flex-col justify-center h-full">
                        {user.firstName[0].toUpperCase()}
                    </div>
                </div>
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div>
                <Button label={"Send Money"} onClick={(e)=>{
                    navigate(`/send?id=${user._id}&name=${user.firstName}`);
                }}/>
            </div>
        </div>
    )
}