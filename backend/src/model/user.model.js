import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
     email: {
        type: String,
        required: true
    },
     password: {
        type: String,
        required: true
    },
     owner: {
        type: Boolean,
        default: false
    },
     profilePhoto: {
        type: String,
    },
     cartItem: [
        {
        quantity: {
            type: Number,
            default: 1
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    }
],
}, {timestamps: true})

export const User = mongoose.model("User", userSchema);

// if logged in via email then owner value is true otherwise false
// used because frontend functionality belong to owner will show to owner only.