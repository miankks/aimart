import mongoose from "mongoose";

const productSchema = new mongoose({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isFeature: {
        type: Boolean,
        default: false
    },
}, {timeStamps: true})

productSchema.index({name:"text", description:"text"})
productSchema.index({category:1})
productSchema.index({price:1})

export const Product = mongoose.model("Product", productSchema)
// 1 means product in category will display in ascending order