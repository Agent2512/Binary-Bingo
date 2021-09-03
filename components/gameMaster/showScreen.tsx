interface Props {
    value: string | number;
}


const ShowScreen = (props: Props) => {

    return (
        <div className="ShowScreen">
            <div className="box">
                <p>a player got {props.value} lines</p>
            </div>
        </div>
    )
}

export default ShowScreen