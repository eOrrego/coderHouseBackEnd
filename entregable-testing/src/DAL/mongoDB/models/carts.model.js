import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    products: [{
        pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
            max: 1000000
        },
        _id: false,
    }],
}, { timestamps: true });

const cartsModel = mongoose.model('Carts', cartsSchema);

export default cartsModel;