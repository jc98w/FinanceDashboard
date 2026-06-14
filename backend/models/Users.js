'use strict'

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        match: [/^[a-zA-Z ]+$/, 'Only alpha characters are allowed in name'],
        maxLength: [20, 'Max name length is 20']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, '{VALUE} is already taken'],
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9!@#$%\^&*-_]+$/, 'Only allowed characters are a-z, A-Z, 0-9, !@#$%^&*-_'],
        minLength: [3, 'Username must be at least 3 characters'],
        maxLength: [20, 'Max username length is 20']
    },
    passwordHash: {
        type: String,
    }
}, {
    strict: true
})

userSchema.statics.usernameTaken = async function(username) {
    const user = await this.findOne({ username })
    return Boolean(user)
}

userSchema.virtual('password')
    .set(function(plaintextPassword) {
        this._password = plaintextPassword
    })
    .get(function() {
        return this._password
    })

userSchema.pre('validate', async function(next) {
    // Ensure password is entered
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
        return next()
    }

    // Check that password meets strength criteria
    if (this._password) {
        const whitelistRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_\-])[a-zA-Z0-9!@#$%^&*_\-]{8,20}$/
        if (!whitelistRegex.test(this._password)) {
            this.invalidate('password', "Password must be 8 to 20 characters and be comprised of at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*-_)")
        }
    }

    // Check username for uniqueness
    const isTaken = await this.constructor.usernameTaken(this.username)
    if (isTaken) {
        this.invalidate('username', `${this.username} is already taken`)
    }
    next()
})

userSchema.pre('save', async function(next) {
    if (!this._password) {
        return next()
    }

    // Hash password
    try {
        const salt = await bcrypt.genSalt()
        this.passwordHash = await bcrypt.hash(this._password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User', userSchema)
export { User }