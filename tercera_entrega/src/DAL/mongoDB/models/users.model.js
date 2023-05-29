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
    role: {
        type: String,
        required: true,
        default: 'user'
        // enum: ['user', 'admin']
    },
    status: {
        type: String,
        required: true,
        default: 'active'
        // enum: ['active', 'inactive']
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }]
}, { timestamps: true });

const usersModel = mongoose.model('Users', usersSchema);

export default usersModel;