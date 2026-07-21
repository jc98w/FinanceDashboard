'use strict'

import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'

async function authPlugin (fastify, opts) {
    fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET })

    // function for checking if user has been authenticated
    fastify.decorate("authenticate", async function (req, reply) {
        const cookieToken = req.cookies.token;
        if (!cookieToken) {
            return reply.status(401).send({ error: 'Unauthorized: Token is missing'})
        }

        const token = req.unsignCookie(cookieToken);

        if (!token || !token.valid) {
            return reply.status(401).send({ error: 'Unauthorized: Missing or invalid token'})
        }

        try {
            const decoded = await fastify.jwt.verify(token.value);
            req.user = decoded;
        }
        catch (err) {
            reply.status(401).send({ error: 'Unauthorized: Session expired' });
        }
    })

}

export default fp(authPlugin, { name: 'auth-plugin'})