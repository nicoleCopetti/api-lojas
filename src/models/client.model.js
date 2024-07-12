import mongoose from 'mongoose';

const {
    Schema
} = mongoose;

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    rg: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cellphone: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    address: {
        cep: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        complement: String
    },
    maritalStatus: {
        type: String,
        enum: ['Single', 'Married', 'Divorced'],
        required: true
    },
    spouse: {
        name: {
            type: String,
            required: function () {
                return this.maritalStatus === 'Married';
            }
        },
        phone: {
            type: String,
            required: function () {
                return this.maritalStatus === 'Married';
            }
        }
    },
    sellerPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Client = mongoose.model('Client', ClientSchema);
export default Client;