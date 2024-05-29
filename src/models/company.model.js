import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const companySchema = new Schema({
    companyName: {
        type: String,
        required: [true, 'Company Name is required']
    },
    ownerName: {
        type: String
    },
    role: {
        type: String,
        trim: true,
        default: 'company'
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Copmany Email is required']
    },
    kitchenIds: {
        type: [Schema.Types.ObjectId],
        ref: 'Kitchen'
    },
    outletIds: {
        type: [Schema.Types.ObjectId],
        ref: 'Outlet'
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
},
    { timestamps: true })

// hashing company password
companySchema.pre('save', async function (next) {
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
companySchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            companyName: this.companyname,
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
companySchema.methods.isPasswordCorrect = async function (password) {
    if (password) {
        return await bcrypt.compare(password, this.password)
    }
    next()
}

export const Company = mongoose.model("Company", companySchema)