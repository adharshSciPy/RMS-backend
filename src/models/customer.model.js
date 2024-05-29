import mongoose, { Schema } from 'mongoose'

const customerSchema = new Schema({
    name: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    email: {
        type: Number,
    },
    address: {
        type: Number,
    },
    location: {
        type: Geolocation
    },
    transactionIds: {
        type: [Schema.Types.ObjectId],
        ref: 'Transaction'
    }
},
    { timestamps: true })


export const Customer = mongoose.model("Customer", customerSchema)