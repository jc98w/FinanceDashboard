'use strict'

export default async (fastify, opts) => {

    // api ping
    fastify.get('/', async function(req, reply) {
        return {
            service: 'Finance Dashboard API',
            version: '1.0.0'
        }
    })

}