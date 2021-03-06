import { useState } from "react"

interface Props {
    value?: string | number | null;
    disabled?: boolean;
    func?: (state:boolean) => void

}

const Spot = (props: Props) => {
    const [hide, setHise] = useState(false)

    const runClick = () => {
        if (props.disabled == undefined || props.disabled == false) {
            setHise(pre => !pre)
            props.func != undefined && props.func(!hide)



        }
    }


    return (
        <button className="spot" onClick={runClick} >
            {hide == false && <p>{props.value}</p>}
            {hide && <MarkOut />}

        </button>
    )
}

export default Spot

const MarkOut = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" stroke="#087935" strokeWidth=".4rem" />
            <line x1="0" y1="0" x2="100" y2="100" stroke="#087935" strokeWidth=".4rem" />

            <line x1="100" y1="0" x2="0" y2="100" stroke="#087935" strokeWidth=".4rem" />
        </svg>
    )
}

