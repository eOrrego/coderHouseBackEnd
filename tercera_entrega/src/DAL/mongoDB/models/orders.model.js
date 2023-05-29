import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
    order_number: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    },
    date: {
        type: Date,
    },
    status: {
        type: String,
        default: 'active'
        // enum: ['active', 'inactive']
    },
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Bussiness' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    },
}, { timestamps: true });

const ordersModel = mongoose.model('Orders', ordersSchema);

export default ordersModel;