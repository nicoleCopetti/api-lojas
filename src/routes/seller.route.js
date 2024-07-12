import express from 'express';
import {
  getAllSellers,
  getSellerById,
  createSeller,
  updateSellerById,
  deleteSellerById
} from '../controllers/seller.controller.js';
import {
  validateSeller,
  validateId
} from '../middlewares/validatorsRequest.js';

const router = express.Router();

// Listar todos os Vendedores
router.get('/', getAllSellers);

// Listar Vendedor pelo ID
router.get('/:id', validateId, getSellerById);

// Criar um novo Vendedor
router.post('/', validateSeller, createSeller);

// Atualizar dados de Vendedor pelo ID
router.put('/:id', validateId, validateSeller, updateSellerById);

// Deletar um vendedor pelo ID
router.delete('/:id', validateId, deleteSellerById);

export default router;