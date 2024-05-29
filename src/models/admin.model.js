import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const adminSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Admin Name is required']
    },
    role: {
        type: String,
        trim: true,
        default: 'superadmin'
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Admin Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
},
    { timestamps: true })

// hashing admin password
userSchema.pre('save', async function (next) {
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
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

// matching admin password
userSchema.methods.isPasswordCorrect = async function (password) {
    if (password) {
        return await bcrypt.compare(password, this.password)
    }
    next()
}

export const User = mongoose.model("Admin", adminSchema)