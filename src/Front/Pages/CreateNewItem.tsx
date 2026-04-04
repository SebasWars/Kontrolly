import useWarehouse from "../Hooks/UseWarehouse"
import BasicInfo from "../components/warehouse/BasicInfo"
import Fees from "../components/warehouse/Fees"

function CreateNewItem(){
    const {warehouse} = useWarehouse()
    return(
        <div className="create_new_item_container">
            <h1>Almacen: {warehouse?.warehouse}</h1>
            <BasicInfo/>
            <Fees/>
        </div>
    )
}

export default CreateNewItem