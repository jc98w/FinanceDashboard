'use strict'

/**
 * API for financial account value records
 */

export default async (fastify, opts) => {
    fastify.get('/', async (req, reply) => {
        return {
            service: 'records api'
        }
    })

    // Basic READ
    // FIXME: Currently just finding a random record
    fastify.get('/:accountNum', async (req, rep) => {
        const accountNum = req.params.accountNum
        return await fastify.records.findOne()
    })
}