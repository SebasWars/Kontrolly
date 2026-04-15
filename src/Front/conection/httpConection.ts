const apiUrl = import.meta.env.VITE_API_URL

export async function getWarehouses(){
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data
}

export function getWarehousebyID(){}