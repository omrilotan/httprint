#!/usr/bin/env node

const { readFile } = require('fs').promises
const { join } = require('path')
const parse = require('yargs-parser')
const { name, version, man } = require('./package.json')
const yargOptions = require('./lib/parser-options')
const ask = require('./lib/ask')
const app = require('.')

const center = (line, width) => line.padStart(width - Math.floor((width - line.length) / 2), ' ')

start()
async function start () {
  const args = parse(process.argv.slice(2), yargOptions)

  const { _: [_port = '1337', _host = 'localhost'] } = args

  const {
    port = _port,
    host = _host,
    status,
    delay,
    interactive,
    help
  } = args

  if (help) {
    const text = await readFile(join(__dirname, man), 'utf8')
    console.log(text)
    return
  }

  const options = {
    port,
    host,
    status,
    delay
  }

  interactive && Object.assign(options, await ask(options))

  {
    const { host, port } = await app(options)
    const border = '======================================================================='
    const message = [
      `${name}@${version} running HTTP server on http://${host}:${port}`,
      'CTRL + C to shutdown'
    ].map(line => center(line, border.length))
    console.log([border, ...message, border].join('\n'))
  }
}
