import { Router } from "express";
import { SalesController } from "../Controller/Sales.js";

export const salesRoute = Router();

/* 
NECESITO:
GET => OBTENERT LOS ITEMS
GET_ID => BUSCAR UN ITEM EN ESPEDIFICO
PUT => PARA ACTULIZAR LA CANTIDAD DE ITEMS SI SE GENERO LA COMPRA
__________________________________________________________________
POST => CUANDO YA SE GENERO LA COMPRA, CREAR UNA FACTURA
DELETE => SI QUIERO ELIMINAR UNA VENTA, CANCELACION O DEVOLUCION.
*/

salesRoute.get('/:id', SalesController.getItems)
salesRoute.post('/:id', SalesController.createSell)