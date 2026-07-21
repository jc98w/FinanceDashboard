'use strict'

import bcrypt from 'bcrypt'

export default async (fastify, opts) => {
    const { User } = fastify.db

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

    // ping api/auth
    fastify.get('/', async (req, rep) => {
        return {
            services: "auth api"
        }
    })

    // user register
    fastify.post('/register', async (req, reply) => {
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        })
        
        try {
            await newUser.save()
        } catch (err) {
            if (err.name !== 'ValidationError') {
                console.log(`\x1b[31m${err.name}: ${err.message}`)
                return reply.code(400).send({error: ["An unexpected error occured"]})
            }
            let errMessage = []
            const fields = ['name', 'username', 'password']
            for (let field in fields) {
                try {
                    errMessage.push(err.errors[fields[field]].message)
                    console.log('\x1b[31m', err.errors[fields[field]].message)
                }
                catch {
                    console.log(`No error message from ${fields[field]}`)
                }
                
            }
            return reply.code(409).send({ error: errMessage })
        }

        return { status: 'User created' }
    })

    // user login
    fastify.post('/login', async (req, reply) => {
        fastify.log.info('attempting login')
        const user = await User.findOne({username: req.body.username})
        fastify.log.info(user)

        if (user && await bcrypt.compare(req.body.password, user.passwordHash)) {
            const token = fastify.jwt.sign(
                { userId: user._id.toString(), username: user.username },
                { expiresIn: '24hr' })

            reply.setCookie('token', token, {
                path: '/',
                secure: process.env.COOKIE_SECURE === true, // set COOKIE_SECURE to true to use https
                httpOnly: true,
                sameSite: 'strict',
                signed: true
            })

            return  { success: true }
        }
        else {
            return reply.send({ error: 'Incorrect password or username. Retry.' })
        }
    })

    fastify.post('/logout', async (req, reply) => {
        reply.clearCookie('token')
        reply.send({success: true, message: "Cookies cleared"})
    })

    // Check user log in status
    fastify.get('/status', { preValidation: [fastify.authenticate] }, async (req, reply) => {
        reply.status(200).send({ status: 'authenticated' })
    })
}