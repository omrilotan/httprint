const { performance } = require('perf_hooks')
const express = require('express')
const { json } = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const formData = require('./lib/form-data')

module.exports = ({ host, port, code = 201 } = {}) => new Promise((resolve, reject) => {
  const app = express()

  app.set('x-powered-by', false)
  app.use((request, response, next) => {
    Object.defineProperty(
      request,
      'start',
      { value: performance.now() }
    )
    next()
  })
  app.use(cors({ preflightContinue: true }))
  app.use(json())
  app.use(formData())
  app.use(cookieParser())
  app.use(
    '*',
    (request, response) => {
      const {
        baseUrl,
        originalUrl,
        params,
        query,
        method,
        headers,
        body,
        cookies
      } = request

      const data = {
        baseUrl,
        originalUrl,
        params,
        query,
        method,
        headers,
        body,
        cookies
      }

      console.log(
        [
          `Message received on ${new Date()}`,
          ...Object.entries(data).map(
            ([key, value]) => [`${cap(key)}:`, JSON.stringify(value, null, 1)]
          ),
          '======================================'
        ].flat().join('\n')
      )

      response.set('Server-Timing', `app; dur=${performance.now() - request.start}; desc="Time to respond"`)
      response.status(code).end()
    }
  )

  app.listen(
    parseInt(port, 10),
    host,
    () => resolve({ host, port })
  )
})

const cap = string => string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
