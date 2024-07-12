import mongoose from 'mongoose';

const {
  Schema
} = mongoose;

const SellerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the name"],
  },
  hireDate: {
    type: Date,
    required: [true, "Please enter the hire date"],
  },
  commissionPerc: {
    type: Number,
    required: [true, "Please enter the commission percentage"],
  },
  entryTime: {
    type: String,
    required: [true, "Please enter the entry time"],
  },
  exitTime: {
    type: String,
    required: [true, "Please enter the exit time"],
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Seller = mongoose.model('Seller', SellerSchema);
export default Seller;