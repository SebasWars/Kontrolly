import React, { createContext, useState, type ReactNode } from "react";
import type { StocksTypes } from "./Types/StockTypes";

interface PropType{
    children: ReactNode
}

interface WarehouseContextType{
    warehouse: StocksTypes | null,
    setWarehouse: React.Dispatch<React.SetStateAction<StocksTypes | null>>
}

export const WarehouseContext = createContext<WarehouseContextType | undefined>(undefined)

export function WarehouseProvider({children}: PropType){
    const [warehouse, setWarehouse] = useState<StocksTypes | null>(null)

    return(
        <WarehouseContext.Provider value={{warehouse, setWarehouse}}>
            {children}
        </WarehouseContext.Provider>
    )
}