import { Tsocket } from "hooks/useSocket";
import { IGame } from "interfaces";
import { useEffect, useState } from "react";
import makeNumCol from "utils/makeNumCol";
import Spot from "./spot"

interface Props {
    socket: Tsocket
}

interface Irows {
    row1: (number | null)[];
    row2: (number | null)[];
    row3: (number | null)[];
    [key: string]: (number | null)[]
}

interface IcheckedRow {
    row1: number
    row2: number
    row3: number
    [key: string]: number
}


const GameBord = (props: Props) => {
    const [mainRows, setMainRows] = useState<Irows>({
        row1: [],
        row2: [],
        row3: []
    })

    useEffect(() => {
        // temp
        let rows: Irows = {
            row1: [],
            row2: [],
            row3: []
        }


        // make first row
        makeNumCol(1, 9).forEach((num, i) => {
            rows[`row${i + 1}`].push(num)
        })
        // make the other rows
        for (let i = 0; i < 8; i++) {
            let min = 10 * (i + 1)
            let max = 9 + (10 * (i + 1))
            // if last row
            if (i == 7) max = 90

            makeNumCol(min, max).forEach((num, i) => {
                rows[`row${i + 1}`].push(num)
            })
        }


        for (let i = 0; i < 3; i++) {
            const arr = rows[`row${i + 1}`]

            for (let j = 0; j < 4; j++) {
                let element = arr[Math.floor(Math.random() * arr.length)];
                if (element == null) {
                    j--
                } else {
                    let index = arr.indexOf(element)
                    arr[index] = null
                }
            }
        }


        // console.table(rows);
        setMainRows(rows)
    }, [])

    const [checkedRow, setCheckedRow] = useState<IcheckedRow>({
        row1: 0,
        row2: 0,
        row3: 0
    })

    const handleRow = (row: string, state: boolean) => {
        setCheckedRow(pre => {
            let newObj = { ...pre }
            if (state) {
                newObj[row]++
            }
            else {
                newObj[row]--
            }

            if (newObj[row] < 0) {
                newObj[row] = 0
            }

            return newObj
        })
    }

    const [masterNumbers, setMasterNumbers] = useState<number[]>([])


    useEffect(() => {
        const socket = props.socket

        if (socket) {



            socket.on("gameUpdate", (game: IGame) => {
                setMasterNumbers(game.numbers)
            })
        }
    }, [props.socket])

    const [numOfLines, setNumOfLines] = useState(0)

    useEffect(() => {
        // console.log(masterNumbers);
        
        let _numOfLines = 0
        for (const key in checkedRow) {
            const cRow = checkedRow[key];
            const mRow = mainRows[key]

            if (cRow == 5) {
                let valid = false
                let nums = mRow.filter(i => i != null)
                for (const num of nums) {
                    if (num) {
                        console.log(masterNumbers.includes(num));
                        valid = masterNumbers.includes(num)
                        if (valid) {
                            
                            valid = masterNumbers.includes(num)
                        }
                    }

                }


                if (valid) {
                    _numOfLines++
                }
            }
        }


        _numOfLines != 0 && setNumOfLines(_numOfLines)
    }, [checkedRow])


    useEffect(() => {
        const socket = props.socket
        
        if (socket && numOfLines != 0) {
            socket.emit("playerLines", numOfLines)
        }
    }, [numOfLines])

    return (
        <div className="gameBord" >
            <div className="row">
                {mainRows.row1.map((v, i) => <Spot func={(s) => { handleRow("row1", s) }} key={i} value={v} disabled={v == null} />)}
            </div>
            <div className="row">
                {mainRows.row2.map((v, i) => <Spot func={(s) => { handleRow("row2", s) }} key={i} value={v} disabled={v == null} />)}
            </div>
            <div className="row">
                {mainRows.row3.map((v, i) => <Spot func={(s) => { handleRow("row3", s) }} key={i} value={v} disabled={v == null} />)}
            </div>
        </div>
    )
}

export default GameBord
