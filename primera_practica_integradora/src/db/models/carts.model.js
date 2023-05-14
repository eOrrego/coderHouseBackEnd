import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true,
        default: []
    },
    // products: {
    //     type:
    //         [{
    //             pid: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
    //             quantity: { type: Number },
    //         }],
    // },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export const cartsModel = mongoose.model('Carts', cartsSchema);


// products: [{ type: Schema.Types.ObjectId, ref: 'products' }],