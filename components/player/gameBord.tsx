import { useEffect } from "react";
import { makeNumCol } from "utils/makeNumCol";
import Spot from "./spot"

interface Props { }

interface Irows {
    [key: string]: (number | number)[];
}


const GameBord = (props: Props) => {
    let rows: Irows = {
        row1: [],
        row2: [],
        row3: []
    }

    useEffect(() => {
        // console.log(makeNumCol(1, 9));
        makeNumCol(1, 9).forEach((num, i) => {
            rows[`row${i+1}`].push(num)
        })




        console.table(rows);
    }, [])


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
