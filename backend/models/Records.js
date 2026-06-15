'use strict'

import mongoose from 'mongoose'

const recordSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, 'Record must be linked to an account']
    },
    value: {
        type: Number,
        required: true,
        default: 0
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    strict: true
})

const Record = mongoose.model('Record', recordSchema)
export { Record }