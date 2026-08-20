'use strict'

import fp from 'fastify-plugin'
import cookie from '@fastify/cookie'

async function cookiePlugin (fastify, opts) {
    // Make sure cookie secret exists
    if (!process.env.COOKIE_SECRET) {
        throw new Error('COOKIE_SECRET environment variable is missing!')
    }

    fastify.register(cookie, {
        secret: process.env.COOKIE_SECRET,
        hook: 'onRequest'
    })
}

export default fp(cookiePlugin)