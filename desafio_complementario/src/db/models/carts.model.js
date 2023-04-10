import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true,
        default: []
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export const cartsModel = mongoose.model('Carts', cartsSchema);