import { useRouter } from "next/dist/client/router"
import { ChangeEvent, FormEvent, useState } from "react"

interface Props {
    type: "player" | "gameMaster"
}

const GameTypeBTN = (props: Props) => {
    const router = useRouter()
    const [userInput, setUserInput] = useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        name == "roomid" && setUserInput(value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (props.type == "gameMaster") {
            router.push(props.type)
        }
        else {
            router.push(props.type+"?roomid="+userInput)
        }

    }



    return (
        <form onSubmit={handleSubmit} onClick={() => { document.getElementById("btn-" + props.type)?.click() }} className={"gameTypeForm " + props.type}>
            <h2>be a {props.type}</h2>



            {props.type == "player" && <input value={userInput} onChange={handleChange} type="text" name="roomid" required />}
            <button  id={"btn-" + props.type} style={{ marginTop: "10px", display: "none" }} type="submit">test</button>
        </form>
    )
}

export default GameTypeBTN