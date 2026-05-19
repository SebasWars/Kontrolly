import { Router } from "express";
import { SalesController } from "../Controller/Sales.js";

export const salesRoute = Router();

/* 
NECESITO:
[X] GET => OBTENERT LOS ITEMS 
[ ] GET_BY_NAME => BUSCAR UN ITEM EN ESPEDIFICO
[X] POST => PARA ACTULIZAR LA CANTIDAD DE ITEMS SI SE GENERO LA COMPRA
__________________________________________________________________
*/

salesRoute.get('/:id', SalesController.getItems)
salesRoute.post('/:id', SalesController.createSell)