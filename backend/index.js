require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const { Client } = require('pg')

const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT || 5432,
    ssl: { rejectUnauthorized: false }
})

async function main() {
    await client.connect()

    fastify.get('/', async () => {
        const res = await client.query('SELECT * FROM test_table')
        return res.rows
    })

    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' })
    console.log('Fastify server listening...')
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})
