import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const outletSchema = new Schema({
    outletName: {
        type: String,
        required: [true, 'Outlet Name is required']
    },
    role: {
        type: String,
        trim: true,
        default: 'outlet'
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Outlet Email is required']
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, 'Company Id is required']
    },
    kitchenId: {
        type: Schema.Types.ObjectId,
        ref: 'Kitchen',
        required: [true, 'Kitchen Id is required']
    },
    ordersId: {
        type: [Schema.Types.ObjectId],
        ref: 'Orders'
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true })

// hashing company password
outletSchema.pre('save', async function (next) {
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
outletSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            outletName: this.outletName,
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
outletSchema.methods.isPasswordCorrect = async function (password) {
    if (password) {
        return await bcrypt.compare(password, this.password)
    }
    next()
}

export const Outlet = mongoose.model("Outlet", outletSchema)