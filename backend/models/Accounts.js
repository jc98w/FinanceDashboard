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

accountSchema.pre('save', async function(next) {
    // Ensure user doesn't duplicate accounts names
    const existingAccount = await this.collection.findOne(
        {
            _id: { $ne: this._id },
            userId: this.userId,
            accountName: this.accountName 
        })

    if (existingAccount) {
        this.invalidate('accountName', 'This user already has account under this name')
    }
})

const Account = mongoose.model('Account', accountSchema)
export { Account }