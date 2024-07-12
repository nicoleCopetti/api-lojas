import { body, param, validationResult } from 'express-validator';
import { isValidCPF } from '../utils/validateCPF.js';

export const validateId = [
  param('id').isMongoId().withMessage('Invalid ID format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validação dos campos do Vendedor
export const validateSeller = [
  body('name').notEmpty().withMessage('Name is required'),
  body('hireDate').isISO8601().withMessage('Hire date must be a valid date'),
  body('commissionPerc').isInt({ min: 0 }).withMessage('Commission percentage must be a positive integer'),
  body('entryTime').matches(/^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/).withMessage('Entry time must be in HH:mm AM/PM format'),
  body('exitTime').matches(/^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/).withMessage('Exit time must be in HH:mm AM/PM format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validação dos campos do cliente
export const validateClient = [
  body('name').notEmpty().withMessage('Name is required'),
  body('cpf').custom((value) => {
    if (!isValidCPF(value)) {
      throw new Error('Invalid CPF');
    }
    return true;
  }),
  body('rg').notEmpty().withMessage('RG is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('cellphone').notEmpty().withMessage('Cellphone is required'),
  body('birthDate').notEmpty().withMessage('BirthDate is required'),
  body('address.cep').notEmpty().withMessage('CEP is required'),
  body('address.country').notEmpty().withMessage('Country is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.number').notEmpty().withMessage('Number is required'),
  body('maritalStatus').notEmpty().withMessage('MaritalStatus is required'),
  body('sellerPerson').notEmpty().withMessage('SellerPerson is required'),
  // Validar o conjuge apenas se estado civil for 'Casado'
  body('spouse.name').if(body('maritalStatus').equals('Married')).notEmpty().withMessage('Spouse Name is required'),
  body('spouse.phone').if(body('maritalStatus').equals('Married')).notEmpty().withMessage('Spouse Phone is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];