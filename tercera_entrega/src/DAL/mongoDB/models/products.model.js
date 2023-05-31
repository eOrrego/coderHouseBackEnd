import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    },
    status: {
        type: String,
        default: 'active'
        // enum: ['active', 'inactive']
    },
}, { timestamps: true });

const productsModel = mongoose.model('Products', productsSchema);

export default productsModel;
