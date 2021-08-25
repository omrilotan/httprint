const express = require('express')
const { json } = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const formData = require('./lib/form-data')

module.exports = ({ host, port, code = 201 } = {}) => new Promise((resolve, reject) => {
  const app = express()

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
            ([key, value]) => [`${cap(key)}:`, value]
          ),
          '======================================'
        ].flat().join('\n')
      )

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
