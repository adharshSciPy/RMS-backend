import mongoose, { Schema } from 'mongoose'

const transactionSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    tax: {
        type: String,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
    }
},
    { timestamps: true })


export const Transaction = mongoose.model("Transaction", transactionSchema)