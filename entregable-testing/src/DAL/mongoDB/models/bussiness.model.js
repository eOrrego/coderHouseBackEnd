import mongoose from "mongoose";

const bussinessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    address: {
        type: String,
        min: 3,
        max: 50
    },
    phone: {
        type: String,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        min: 3,
        max: 50
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    deleteAt: {
        type: Date,
        required: false,
    },
}, { timestamps: true });

const bussinessModel = mongoose.model('Bussiness', bussinessSchema);

export default bussinessModel;