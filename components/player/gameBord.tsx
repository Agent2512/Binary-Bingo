import Spot from "./spot"

interface Props { }

const GameBord = (props: Props) => {

    return (
        <div className="gameBord" >
            <div className="row">
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
            </div>
            <div className="row">
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
            </div>
            <div className="row">
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
                <Spot />
            </div>
        </div>
    )
}

export default GameBord
