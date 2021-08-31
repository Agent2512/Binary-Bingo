import Link from 'next/link'

interface Props {
    type: "player" | "gameMaster"
}

const GameTypeBTN = (props: Props) => {

    return (
        <form onClick={() => console.log("test")} className={"gameTypeForm " + props.type}>
            <h2>be a {props.type}</h2>
        </form>
    )
}

export default GameTypeBTN