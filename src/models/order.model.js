import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'send'
    },
    isDeclined: {
        type: Boolean,
        required: true,
        default: false
    }
},
    { timestamps: true })


export const Customer = mongoose.model("Order", orderSchema)