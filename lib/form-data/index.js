const multiparty = require('multiparty')
/**
 * Convert multiparty interface from callback to Promise
 */
const parse = (request) => new Promise(
  (resolve, reject) => new multiparty.Form().parse(
    request,
    (error, fields, files) => error
      ? reject(error)
      : resolve({ fields, files })
  )
)

/**
 * Use only one value from each field with the same name
 * { 'key': [ '1', '2'] } => { 'key': '2' }
 */
const flatValues = (object) => Object.fromEntries(
  Object.entries(object).map(
    ([key, value]) => [key, Array.isArray(value) ? value.pop() : value]
  )
)

module.exports = () => async function formData (request, response, next) {
  if (!/^(post|put)$/i.test(request.method)) {
    return next()
  }

  // Escape block
  if (!request.get('content-type')?.includes('multipart/form-data')) {
    return next()
  }

  const { fields } = await parse(request)

  Object.defineProperty(
    request,
    'body',
    {
      value: Object.assign(
        request.body || {},
        flatValues(fields)
      ),
      enumerable: true,
      writable: true
    }
  )
  next()
}
