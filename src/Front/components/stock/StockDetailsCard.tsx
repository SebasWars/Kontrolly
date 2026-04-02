type PropsTypes ={
    value: string,
    quantity: number
}

function StockDetailsCards({value, quantity}: PropsTypes){
    return(
        <div className="details_card">
            <h2>{value}</h2>
            <h4>{value !== 'Cantidad de productos' ? `€${quantity}` : quantity}</h4>
        </div>
    )
}
export default StockDetailsCards