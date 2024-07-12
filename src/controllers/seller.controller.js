import Seller from '../models/seller.model.js';
import Sale from '../models/sale.model.js';
import moment from 'moment';

// Função para buscar todos os vendedores listanto o resumo mensal de vendas
export const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().sort({ name: 1 });

    const currentTime = moment();

    const sellersWithDetails = await Promise.all(sellers.map(async seller => {
      const currentTime = moment();
      const entryTime = moment(seller.entryTime, 'hh:mm A');
      const exitTime = moment(seller.exitTime, 'hh:mm A');
      const isWorking = currentTime.isBetween(entryTime, exitTime, null, '[)');

      const sales = await Sale.find({ sellerPerson: seller._id });

      const salesSummary = sales.reduce((summary, sale) => {
        const month = moment(sale.saleDate).format('YYYY-MM');
        if (!summary[month]) {
          summary[month] = {
            totalSales: 0,
            totalAmount: 0,
            totalCommission: 0,
          };
        }
        summary[month].totalSales += 1;
        summary[month].totalAmount += sale.saleAmount;
        summary[month].totalCommission += (sale.saleAmount * seller.commissionPerc) / 100;
        return summary;
      }, {});

      const orderedSummary = Object.keys(salesSummary)
        .sort((a, b) => moment(b).diff(moment(a)))
        .map(month => ({
          month,
          ...salesSummary[month],
        }));

      return {
        ...seller._doc,
        isWorking,
        salesSummary: orderedSummary,
      };
    }));

    res.json(sellersWithDetails);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Função para buscar um vendedor pelo ID
export const getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({
      message: 'Seller not found'
    });
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Função para criar um novo vendedor
export const createSeller = async (req, res) => {
  const seller = new Seller({
    name: req.body.name,
    hireDate: req.body.hireDate,
    commissionPerc: req.body.commissionPerc,
    entryTime: req.body.entryTime,
    exitTime: req.body.exitTime,
    status: req.body.status
  });

  try {
    const newSeller = await seller.save();
    res.status(201).json(newSeller);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// Função para atualizar informações de um vendedor pelo ID
export const updateSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({
      message: 'Seller not found'
    });

    seller.name = req.body.name || seller.name;
    seller.hireDate = req.body.hireDate || seller.hireDate;
    seller.commissionPerc = req.body.commissionPerc || seller.commissionPerc;
    seller.entryTime = req.body.entryTime || seller.entryTime;
    seller.exitTime = req.body.exitTime || seller.exitTime;
    seller.status = req.body.status || seller.status;

    const updatedSeller = await seller.save();
    res.status(200).json(updatedSeller);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// Função para deletar um vendedor pelo ID
export const deleteSellerById = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) {
      return res.status(404).json({
        message: 'Seller not found'
      });
    } else {
      res.status(200).json({
        message: 'Seller deleted'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};