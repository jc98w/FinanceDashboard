'use strict'

import bcrypt from 'bcrypt'

export default async (fastify, opts) => {
    const loginSchema = {
        body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: {type: 'string', minLength: 3},
                password: {type: 'string', minLength: 8}
            }
        }
    }

    // user register
    fastify.post('/register', async (req, reply) => {
        const newName = req.body.name
        const newUsername = req.body.username
        const pwHash = await bcrypt.hash(req.body.password, 12)

        fastify.log.info(`New user attempt: ${newName}, ${newUsername}`)

        // Check for existing usernames
        const existingUser = await fastify.users.findOne({username: newUsername})
        fastify.log.info(`Existing user: ${existingUser}`)
        if (existingUser) {
            return reply.code(409).send({error: 'Username is already in use'})
        }

        await fastify.mongo.db.collection('users').insertOne({name: newName, username: newUsername, passwordHash: pwHash})

        return { status: 'User created' }
    })

    // user login
    fastify.post('/login', async (req, reply) => {
        const user = await fastify.users.findOne({username: req.body.username})

        if (user && await bcrypt.compare(req.body.password, user.passwordHash)) {
            const token = fastify.jwt.sign(
                { id: user._id.toString(), username: user.username },
                { expiresIn: '24hr' })
            return token
        }
        else {
            return reply.send({ error: 'Incorrect password or username. Retry.' })
        }
    })
}