'use strict'

/**
 * API for accessing financial account
 */

export default async (fastify, opts) => {
    fastify.get('/', async (req, reply) => {
        return {
            service: 'accounts api'
        }
    })

    // Basic READ
    fastify.get('/:name', async (req, reply) => {
        const name = req.params.name;
        const result = await fastify.accounts.findOne({name: name})
        return result
    })
}