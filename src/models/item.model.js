import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Item Name is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    price: {
        type: Number,
        required: [true, 'Item Price is required']
    },
    description: {
        type: String,
        required: [true, 'Item Description is required']
    },
    kitchenId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Kitchen Id is required']
    }
}, { timestamps: true });

export const Item = mongoose.model('Item', itemSchema);
