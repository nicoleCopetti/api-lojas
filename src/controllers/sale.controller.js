import Client from '../models/client.model.js';
import Sale from '../models/sale.model.js';

// Funação para listar todas as vendas
export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
    .populate('sellerPerson', 'name')
    .populate('clientPerson', 'name');
    res.json(sales);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Função para listar uma venda por ID
export const getSaleById = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const sale = await Sale.findById(id);
    if (!sale) {
      return res.status(404).json({
        message: 'Sale not found'
      });
    }
    res.json(sale);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Função para criar uma nova venda
export const createSale = async (req, res) => {
  const {
    clientPerson,
    sellerPerson,
    saleDate,
    saleAmount,
    paymentMethod,
    status
  } = req.body;

  const newSale = new Sale({
    clientPerson,
    sellerPerson,
    saleDate,
    saleAmount,
    paymentMethod,
    status
  });

  try {
    const createdSale = await newSale.save();
    res.status(201).json(createdSale);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

// Função para atualizar uma venda por ID
export const updateSale = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    clientPerson,
    sellerPerson,
    saleDate,
    saleAmount,
    paymentMethod,
    status
  } = req.body;

  try {
    const sale = await Sale.findById(id);

    if (!sale) {
      return res.status(404).json({
        message: 'Sale not found'
      });
    }

    sale.clientPerson = clientPerson;
    sale.sellerPerson = sellerPerson;
    sale.saleDate = saleDate;
    sale.saleAmount = saleAmount;
    sale.paymentMethod = paymentMethod;
    sale.status = status;

    const updatedSale = await sale.save();
    res.json(updatedSale);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

// Função para remover uma venda por ID
export const deleteSale = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const sale = await Sale.findByIdAndRemove(id);
    if (!sale) {
      return res.status(404).json({
        message: 'Sale not found'
      });
    }
    res.json({
      message: 'Sale deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Função para listar um resumo de vendas agrupado por mês e ano
export const getSalesSummary = async (req, res) => {
  try {
    const salesSummary = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$saleDate' },
            month: { $month: '$saleDate' },
            paymentMethod: '$paymentMethod'
          },
          quantity: { $sum: 1 },
          totalAmount: { $sum: '$saleAmount' },
          totalCommission: { $sum: '$commissionAmount' }
        }
      },
      {
        $group: {
          _id: {
            year: '$_id.year',
            month: '$_id.month'
          },
          salesPaymentMethod: {
            $push: {
              paymentMethod: '$_id.paymentMethod',
              quantity: '$quantity',
              totalAmount: '$totalAmount'
            }
          },
          totalQuantityAllPayments: { $sum: '$quantity' },
          totalAmountAllPayments: { $sum: '$totalAmount' },
          totalCommission: { $sum: '$totalCommission' }
        }
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1
        }
      }
    ]);

    const newCustomersSummary = await Client.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          quantityNewCustomers: { $sum: 1 }
        }
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1
        }
      }
    ]);

    salesSummary.forEach(monthSummary => {
      const matchingNewCustomers = newCustomersSummary.find(newCustomers => {
        return (
          newCustomers._id.year === monthSummary._id.year &&
          newCustomers._id.month === monthSummary._id.month
        );
      });

      monthSummary.newCustomersSummary = matchingNewCustomers
        ? matchingNewCustomers.quantityNewCustomers
        : 0;
    });

    res.json({
      salesSummary
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


