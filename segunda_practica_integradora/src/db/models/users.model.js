import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts"
    },
})

export const usersModel = mongoose.model("Users", usersSchema);