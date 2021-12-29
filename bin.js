#!/usr/bin/env node
const app = require('.')

const [
  port = '1337'
] = process.argv.slice(2)

app({
  host: 'localhost',
  port,
  code: 200
}).then(
  ({ host, port }) => console.log(
    [
      '======================================',
      `HTTP server running: http://${host}:${port}`,
      'CTRL + C to shutdown',
      '======================================'
    ].join('\n')
  )
).catch(
  console.error
)
