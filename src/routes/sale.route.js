import express from 'express';
import {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
  getSalesSummary
} from '../controllers/sale.controller.js';
import {
  validateId
} from '../middlewares/validatorsRequest.js';

const router = express.Router();

// Listar todas as vendas
router.get('/', getAllSales);

// Listar um resumo de vendas
router.get('/sumary', getSalesSummary);

// Listar uma venda por ID
router.get('/:id', validateId, getSaleById);

// Criar uma nova venda
router.post('/', createSale);

// Atualizar uma venda por ID
router.put('/:id', validateId, updateSale);

// Deletar uma venda por ID
router.delete('/:id', validateId, deleteSale);

export default router;