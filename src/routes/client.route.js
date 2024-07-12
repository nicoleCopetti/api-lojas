import express from 'express';
import {
  getAllClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient
} from '../controllers/client.controller.js';
import {
  validateClient,
  validateId
} from '../middlewares/validatorsRequest.js';

const router = express.Router();

// Listar todos os clientes
router.get('/', getAllClients);

// Listar cliente pelo ID
router.get('/:id', validateId, getClientById);

// Criar um novo cliente
router.post('/', validateClient, createClient);

// Atualizar um cliente pelo ID
router.put('/:id', validateId, validateClient, updateClient);

// Deletar um cliente pelo ID
router.delete('/:id', validateId, deleteClient);

export default router;