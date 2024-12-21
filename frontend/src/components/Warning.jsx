import { Link } from "react-router-dom"

export const Warning = ({label, buttonName, to}) => {
    return <div className="flex flex-row justify-center font-normal text-md">
            <div>
                {label}
            </div>
            <Link className="underline" to={to}>
                {buttonName}
            </Link>
    </div>
}