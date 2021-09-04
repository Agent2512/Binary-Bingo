interface Props {
    numbers: number[]
    func: () => void
}

const Results = (props: Props) => {

    return (
        <div className="results">
            <div className="box">
                {props.numbers.map((v, i) => <p key={i} >{v}</p>)}
            </div>
            <button onClick={props.func} >hide numbers</button>
        </div>
    )
}

export default Results