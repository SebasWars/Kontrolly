import type { StocksTypes } from "./StockTypes";

export type Actions = SelectWarehouse

export interface State{
    warehouses: StocksTypes[],
    selectedWarehouse: string | null
}

interface SelectWarehouse{
    type: 'SELECT_WAREHOUSE',
    payload: string
}