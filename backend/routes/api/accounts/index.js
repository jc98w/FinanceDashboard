'use strict'

import { Account } from '../../../models/Accounts.js'
import { Record } from '../../../models/Records.js'
import mongoose from 'mongoose'

/**
 * API for accessing financial account
 */

export default async (fastify, opts) => {

    fastify.get('/', async (req, reply) => {
        return {
            service: 'accounts api'
        }
    })

    /**
     * Creates new financial account linked to user
     */
    fastify.post('/create', { preValidation: [fastify.authenticate] }, async (req, reply) => {
        const { userId } = req.user;
        const { accountName, currentValue, tags } = req.body;

        const newAccount = new Account({
            userId: userId,
            accountName: accountName,
            currentValue: currentValue,
            tags: tags
        })
        console.log('\x1b[32m', newAccount)

        // FIXME: Error handling
        try {
            await newAccount.save()
        }
        catch (err) {
            if (err.name !== 'ValidationError') {
                console.log(`\x1b[31m${err.name}: ${err.message}`)
                return reply.code(400).send({error: ["An unexpected error occured"]})
            }
            console.log(err.errors)
            let errMessages = []

            for (let field in err.errors) {
                try {
                    errMessage.push(err.errors[field].message)
                    console.log('\x1b[31m', err.errors[field].message)
                }
                catch {
                    console.log(`No error message from ${fields[field]}`)
                }
                if (errMessages.length === 0) errMessages.push('Unknown error occured');
            }
            return reply.code(409).send({ error: errMessages })
        }
        return { status: "Account created" }
    })

    // Basic READ
    fastify.get('/:accountId', { preValidation: [fastify.authenticate] } , async (req, reply) => {
        const accountId = req.params.accountId;
        if (!mongoose.isValidObjectId(accountId)) {
            return reply.status(400).send({ error: "Invalid account ID"})
        }

        const result = await Account.findOne({_id: accountId, userId: req.user.userId})
        if (!result) {
            return reply.status(404).send({ error: "Account not found" })
        }
        return result
    })

    // Get all accounts for a user
    fastify.get('/me', { preValidation: [fastify.authenticate] }, async(req, reply) => {
        const { userId } = req.user;
        const result = await Account.find({ userId: userId })
        return { accounts: result }
    })

    fastify.delete('/', { preValidation: [fastify.authenticate] }, async (req, reply) => {
        const { accountName } = req.body;
        const accountToDel = await Account.findOne({accountName: accountName, userId: req.user.userId})

        if (!accountToDel) {
            // If account is not found
            reply.status(404).send({ error: `${accountName} not found`})
        }

        // Delete account and records linked to the account
        const response = await Account.deleteOne({ accountName: accountName, userId: req.user.userId})
        const responseRecord = await Record.deleteMany({ accountId: accountToDel._id })

        if (response.acknowledged && response.deletedCount === 1) {
            return { success: true, message: "Account deleted" }
        }
        else {
            return reply.status(400).send({ error: "Unable to delete account", response: response })
        }
    })
}