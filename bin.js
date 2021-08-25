#!/usr/bin/env node
const app = require('.')

app({
  host: 'localhost',
  port: 1337,
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
