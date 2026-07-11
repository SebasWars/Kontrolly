import { Router } from "express";
import { clientsController } from "../Controller/clients.js";

export const clientsRoute = Router();

clientsRoute.get('/', clientsController.getClients)
clientsRoute.get('/resumen', clientsController.getClientsResume)
clientsRoute.get('/cliente/:id', clientsController.getClientByID)
clientsRoute.get('/:query', clientsController.getClientsByQuery)

clientsRoute.post('/cliente', clientsController.createClient)
clientsRoute.put('/cliente/:id', clientsController.updateClient)
clientsRoute.delete('/cliente/:id', clientsController.delteClient)
