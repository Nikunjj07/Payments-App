import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/balance"
import { Users } from "../components/Users"
import axios from "axios"
import { DropMenu } from "../components/DropMenu"


export const Dashboard = ()=>{
    const [balance,setBalance] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/v1/account/balance',
                {
                    headers:{
                        Authorization:"Bearer "+ localStorage.getItem("token")
                    }
                }
            );
            setBalance(response.data.balance);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return(
        <div>
            <AppBar/>
        
            <Balance balance={balance}/>
            <Users/>
        </div>
    )
}