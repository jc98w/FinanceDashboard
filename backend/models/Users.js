'use strict'

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must enter name'],
        trim: true,
        match: [/^[a-zA-Z ]+$/, 'Only alpha characters are allowed in name'],
        maxLength: [20, 'Max name length is 20']
    },
    username: {
        type: String,
        required: [true, 'User must enter username'],
        trim: true,
        match: [/^[a-zA-Z0-9!@#$%\^&*-_]+$/, 'Only allowed characters are a-z, A-Z, 0-9, !@#$%^&*-_'],
        minLength: [3, 'Username must be at least 3 characters'],
        maxLength: [20, 'Max username length is 20']
    },
    password: {
        type: String,
        required: [true, 'User must enter password'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&*-_])[a-zA-Z0-9!@#$%\^&*-_]+$/,
            'Password must be comprised of at least one lowercase letter, one uppercase letter, one number, and one special character: !@#$%^&*-_'],
        minLength: [8, 'Password must be at least 8 characters'],
        maxLength: [30, 'Password cannot exceed 30 characters']
    }
}, {
    strict: true
})

const User = mongoose.model('User', userSchema)
export { User }