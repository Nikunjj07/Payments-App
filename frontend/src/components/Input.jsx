
export const Input = ({label, placeholder, onChange})=>{
    return(
        <div className="pb-2">
            <div className="font-medium text-left pb-1">
                {label}
            </div>
            <input onChange={onChange} className="w-full border rounded-lg py-1 px-2" type="text" placeholder={placeholder}/>
        </div>
    )
}