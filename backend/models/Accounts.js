'use strict'

import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Account must be linked to a user']
    },
    accountName: {
        type: String,
        required: [true, 'Account must be named']
    },
    tags: {
        type: Array,
        required: true,
        default: []
    },
    currentValue: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    strict: true
})

const Account = mongoose.model('Account', accountSchema)
export { Account }