'use strict'

import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'

async function authPlugin (fastify, opts) {
    fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET })

    // function for checking if user has been authenticated
    fastify.decorate("authenticate", async function (req, reply) {
        try {
            await requestAnimationFrame.jwtVerify();
        }
        catch (err) {
            reply.send(err);
        }
    })

}

export default fp(authPlugin, { name: 'auth-plugin'})