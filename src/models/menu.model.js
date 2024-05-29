import mongoose, { Schema } from 'mongoose'

//item schema for embedding in items field in menu schema
const itemsEmbedSchema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, 'Item Id is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Item Quantity is required']
    }
}, { timestamps: true });


const menuSchema = new Schema({
    items: {
        type: [itemsEmbedSchema],
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