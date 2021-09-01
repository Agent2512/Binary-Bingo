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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (props.type == "gameMaster") {
            router.push(props.type)
        }
        else {
            let checkRoom = await fetch("/getGame", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({roomid:userInput})
            }).then(res => res.json())

            if (checkRoom) {
                router.replace(props.type + "?roomid=" + userInput)
            } else {
                alert("no room by code")
            }
        }

    }



    return (
        <form onSubmit={handleSubmit} onClick={() => { document.getElementById("btn-" + props.type)?.click() }} className={"gameTypeForm " + props.type}>
            <h2>{props.type}</h2>
            {props.type == "player" && <input value={userInput} onChange={handleChange} type="text" name="roomid" required />}
            <button id={"btn-" + props.type} style={{ marginTop: "10px", display: "none" }} type="submit">test</button>
        </form>
    )
}

export default GameTypeBTN