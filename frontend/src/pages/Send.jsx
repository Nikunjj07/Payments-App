import { UNSAFE_getSingleFetchDataStrategy, useSearchParams } from "react-router-dom"
import { Heading } from "../components/Heading"
import axios from "axios";
import { useState } from "react";


export const SendMoney = ({user})=>{
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const[amount,setAmount] = useState(0);
    const [success,setSuccess] = useState(false);



    return(
        <div className="bg-slate-200 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-96 p-7 pb-4 px-7 h-max text-center">
                    <Heading label={"Send Money"}/>
                    <div className="flex flex-row pt-10 mb-5">
                        <div className="rounded-full h-12 w-12 bg-green-500 text-2xl text-center text-white mr-2">
                            <div className="flex flex-col justify-center h-full">
                                {name[0].toUpperCase()}
                            </div>  
                        </div>
                        <div className="font-semibold text-2xl p-2">
                            {name}
                        </div>
                    </div>
                    <div className="py-2 flex flex-col">
                        <label htmlFor="amount" className="font-medium text-left pb-1">Amount (in Rs)</label>
                        <input onChange={(e)=>{
                            setAmount(Number(e.target.value))
                        }} id="amount" className="w-full border rounded-lg py-1 px-2" type="number"  placeholder={"Enter amount"}/>
                    </div>
                    <button className="w-full h-9 rounded bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-600"
                        onClick={async()=>{
                            const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                                amount:amount,
                                to:id
                            },{
                                headers:{
                                    Authorization:"Bearer "+ localStorage.getItem("token")
                                }
                            })
                            if (response.data.message === "Transfer successful") {
                               setSuccess(true);
                            } else {
                                setSuccess(false);
                            }
                    }}>Initiate Transfer</button>
        
                    {success && (
                        <div className="font-medium  text-sm mt-2">
                            Payment Success!
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}