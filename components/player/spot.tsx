import { useState } from "react"

interface Props {

}

const Spot = (props: Props) => {
    const [hide, setHise] = useState(false)

    const runClick = () => {
        setHise(pre => !pre)


    }


    return (
        <button className="spot" onClick={runClick} >
            {hide == false && <p>test</p>}
            {hide && <MarkOut />}

        </button>
    )
}

export default Spot

const MarkOut = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" stroke="#fff" stroke-width=".4rem"  />
            <line x1="0" y1="0" x2="100" y2="100" stroke="#fff" stroke-width=".4rem" />

            <line x1="100" y1="0" x2="0" y2="100" stroke="#fff" stroke-width=".4rem" />
        </svg>
    )
}

