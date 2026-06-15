'use strict'

import fp from 'fastify-plugin'
import mongoose from 'mongoose'
import { User } from '../models/Users.js'
import { Account } from '../models/Accounts.js'
import { Record } from '../models/Records.js'

// Set custom database connection info from .env
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongodb:27017/finance';

// mongodb connection setup
async function dbConnector (fastify, opts) {
    try {
        await mongoose.connect(mongoUrl)
        fastify.log.info('MongoDB connection successful')

        const models = { User, Account, Record }
        fastify.decorate('db', models)

        fastify.addHook('onClose', async (instance) => {
            await mongoose.connection.close();
            instance.log.info('MongoDB connection closed')
        })
    }
    catch (error){
        fastify.log.error('Database error: ', error)
        process.exit(1)
    }
}

export default fp(dbConnector)
