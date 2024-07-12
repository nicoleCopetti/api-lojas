import mongoose from 'mongoose';

const {
  Schema
} = mongoose;

const SaleSchema = new Schema({
  clientPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  sellerPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller'
  },
  saleDate: {
    type: Date,
    required: [true, "Please enter the sale date"],
  },
  saleAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  paymentMethod: {
    type: String,
    enum: ['Cartão', 'Dinheiro', 'Pix'],
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Sale = mongoose.model('Sale', SaleSchema);
export default Sale;