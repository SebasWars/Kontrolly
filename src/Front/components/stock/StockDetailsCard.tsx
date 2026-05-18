type PropsTypes ={
    value: string,
    quantity: number
}

function StockDetailsCards({value, quantity}: PropsTypes){
    return(
        <div className="details_card">
            <h2>{value}</h2>
            <h3>{value !== 'Cantidad de productos' ? `€${quantity}` : quantity}</h3>
        </div>
    )
}
export default StockDetailsCards