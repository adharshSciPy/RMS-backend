import mongoose, { Schema } from 'mongoose'

//item schema for embedding in items field in menu schema
const itemsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Item Name is required']
    },
    price: {
        type: Number,
        required: [true, 'Item Price is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Item Quantity is required']
    },
    desciption: {
        type: String,
        required: [true, 'Item Description is required']
    }
}, { timestamps: true })


const menuSchema = new Schema({
    items: {
        type: [itemsSchema],
        required: [true, 'Items required to create a menu']
    },
    kitchenId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Kitchen Id is required']
    },
    isActive: {
        type: Boolean,
        default: true
    }

},
    { timestamps: true })


export const Menu = mongoose.model("Menu", menuSchema)