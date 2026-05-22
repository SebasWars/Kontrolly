interface Props{
    message: string
}
export function PopUpOptional({message}: Props){
    return(
        <div className="popUp_optional_container">
            {message}
            <div className="popUp_optional_buttons">
                <button>No</button>
                <button>Si</button>
            </div>
        </div>
    )
}