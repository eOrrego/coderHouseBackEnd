import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    description: {
        type: String,
        required: false,
        min: 3,
        max: 200
    },
    thumbnail: {
        type: Array,
        required: false,
    },
    code: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
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
    owner: {
        type: String,
        default: 'admin'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    deleteAt: {
        type: Date,
        required: false,
    },
}, { timestamps: true });

const productsModel = mongoose.model('Products', productsSchema);

export default productsModel;
