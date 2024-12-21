import { DropMenu } from "./DropMenu"

export const AppBar = (Name)=>{
    return(
        <div className="flex flex-row justify-between px-3 py-3 text-lg border-b-2">
            <div className="font-bold text-2xl">
                <span>Payments App</span>
            </div>
            <div className="flex flex-row items-center">
                <span>Hello</span>
                <img className="w-9" src="https://img.icons8.com/?size=100&id=H101gtpJBVoh&format=png&color=000000" alt="Profile" />
            </div>
        </div>
    )
}