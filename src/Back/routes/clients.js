import { Router } from "express";
import { clientsController } from "../Controller/clients.js";

export const clientsRoute = Router();

clientsRoute.get('/', clientsController.getClients)
clientsRoute.get('/resumen', clientsController.getClientsResume)
clientsRoute.get('/cliente/:id', clientsController.getClientByID)

clientsRoute.post('/client', clientsController.createClient)
/* clientsRoute.delete('/client/:id', clientsController.delteClient) */
