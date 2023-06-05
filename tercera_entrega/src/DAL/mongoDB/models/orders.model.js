import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
    order_number: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    },
    purchase_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    },
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Bussiness' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
}, { timestamps: true });

const ordersModel = mongoose.model('Orders', ordersSchema);

export default ordersModel;