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

// no es necesario el next() porque no hay más middlewares en la cadena de middlewares de este modelo
cartsSchema.pre('findOne', function (next) {;
    this.populate('products.pid');
    next();
});

export const cartsModel = mongoose.model('Carts', cartsSchema);