import Client from '../models/client.model.js';
import Sale from '../models/sale.model.js';

// Função para buscar todos os clientes com opções de paginação e ordenação
export const getAllClients = async (req, res) => {

  try {
    const clients = await Client.find().sort({ name: 1 })
      .populate('sellerPerson', 'name');

    const clientsWithDetails = await Promise.all(
      clients.map(async (client) => {
        const purchases = await Sale.find({
          clientPerson: client._id
        })
        .populate('sellerPerson', 'name')
        .sort({
          saleDate: -1
        });

        return {
          ...client._doc,
          purchases: purchases,
          lastPurchase: (purchases.length > 0) ? purchases[0].createdAt : null,
          sellerClient: (client.sellerPerson) ?  client.sellerPerson.name : null,
        };
      })
    );
    res.json(clientsWithDetails);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Função para buscar um cliente pelo ID
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({
        message: 'Client not found'
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Função para criar um novo cliente
export const createClient = async (req, res) => {
  const client = new Client({
    name: req.body.name,
    cpf: req.body.cpf,
    rg: req.body.rg,
    phone: req.body.phone,
    cellphone: req.body.cellphone,
    birthDate: req.body.birthDate,
    address: req.body.address,
    maritalStatus: req.body.maritalStatus,
    spouse: req.body.spouse,
    sellerPerson: req.body.sellerPerson
  });

  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

// Função para atualizar um cliente pelo ID
export const updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (updatedClient) {
      res.json(updatedClient);
    } else {
      res.status(404).json({
        message: 'Client not found'
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

// Função para deletar um cliente pelo ID
export const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (deletedClient) {
      res.json({
        message: 'Client deleted'
      });
    } else {
      res.status(404).json({
        message: 'Client not found'
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};