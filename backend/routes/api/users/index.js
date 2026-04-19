'use strict'

/**
 * API for access user data
 */

export default async (fastify, opts) => {
    fastify.get('/', async function(req, reply) {
        return {
            service: 'users api'
        }
    })

    // Basic READ
    fastify.get('/:name', async function (req, reply) {
        const name = req.params.name;
        const result = await fastify.users.findOne({name: req.params.name})
        return result
    })
}