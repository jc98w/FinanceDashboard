'use strict'

import fp from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

// Get database connection info from .env
const mongoUrl = process.env.MONGO_URL;

// mongodb connection setup
async function mongoPlugin (fastify, opts) {
    try {
        await fastify.register(fastifyMongo, { forceClose: true, url: mongoUrl })

        fastify.decorate('users', fastify.mongo.db.collection('users'))
        fastify.decorate('accounts', fastify.mongo.db.collection('accounts'))
        fastify.decorate('records', fastify.mongo.db.collection('records'))
    }
    catch {

        fastify.log.error('Database connection failed')
    }
}

export default fp(mongoPlugin, {name: 'mongo_connection'})