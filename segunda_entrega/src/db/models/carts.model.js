import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    // products: {
    //     type: Array,
    //     required: true,
    //     default: []
    // },
    products: [{
        pid: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        quantity: { type: Number },
        _id: false,
    }],

    timestamp: {
        type: Date,
        default: Date.now
    }
});

export const cartsModel = mongoose.model('Carts', cartsSchema);