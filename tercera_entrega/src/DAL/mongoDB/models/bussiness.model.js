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
        default: 'active'
        // enum: ['active', 'inactive']
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
}, { timestamps: true });

const bussinessModel = mongoose.model('Bussiness', bussinessSchema);

export default bussinessModel;