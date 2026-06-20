'use strict'

import { Account } from '../../../models/Accounts.js'

/**
 * API for accessing financial account
 */

export default async (fastify, opts) => {
    const { Account } = fastify.db

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
        const { name, tags } = req.body;

        const newAccount = new Account({
            userId: userId,
            accountName: name,
            tags: tags
        })

        // FIXME: Error handling
        try {
            await newAccount.save()
        }
        catch (err) {
            console.log(err)
            return reply.code(400).send({ error: "Failed to create account"})
        }
        return { status: "Account created" }
    })

    // Basic READ
    fastify.get('/:accountId', { preValidation: [fastify.authenticate] } , async (req, reply) => {

        const accountId = req.params.accountId;
        const result = await Account.findOne({objectId: accountId})
        return result
    })
}