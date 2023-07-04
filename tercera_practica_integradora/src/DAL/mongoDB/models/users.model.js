import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    age: {
        type: Number,
        required: false,
        min: 18,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin', 'premium'],
        default: 'user'
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carts'
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders'
    }],
    deleteAt: {
        type: Date,
        required: false,
    },
}, { timestamps: true });

const usersModel = mongoose.model('Users', usersSchema);

export default usersModel;