import type { StocksTypes } from "./StockTypes";

export type Actions = SelectWarehouse | SetWarehouses 

export interface State{
    warehouses: StocksTypes[],
    selectedWarehouse: string | null
}

interface SelectWarehouse{
    type: 'SELECT_WAREHOUSE',
    payload: string
}

interface SetWarehouses{
    type: 'SET_WAREHOUSES',
    payload: StocksTypes[]
}
