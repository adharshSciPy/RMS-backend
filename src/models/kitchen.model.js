import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const kitchenSchema = new Schema({
    kitchenName: {
        type: String,
        required: [true, 'Kitchen Name is required']
    },
    role: {
        type: String,
        trim: true,
        default: 'kitchen'
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Kitchen Email is required']
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, 'Company Id is required']
    },
    outletIds: {
        type: [Schema.Types.ObjectId],
        ref: 'Outlet'
    },
    menuId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
},
    { timestamps: true })

// hashing company password
kitchenSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10)
        next();
    }
    catch (err) {
        return next(err);
    }
})

// generate access token
kitchenSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            kitchenName: this.kitchenName,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

// matching company password
kitchenSchema.methods.isPasswordCorrect = async function (password) {
    if (password) {
        return await bcrypt.compare(password, this.password)
    }
    next()
}

export const Kitchen = mongoose.model("Kitchen", kitchenSchema)