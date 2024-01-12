module.exports = {
  alias: {
    port: ['p'],
    host: ['h'],
    status: ['s'],
    delay: ['d'],
    interactive: ['i']
  },
  boolean: [
    'interactive'
  ],
  coercers: {
    port: Number,
    status: Number,
    delay: Number
  },
  default: {
    host: 'localhost',
    status: 201,
    delay: 0,
    interactive: false
  }
}
