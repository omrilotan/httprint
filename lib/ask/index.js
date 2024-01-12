const { prompt } = require('inquirer')

module.exports = questions => prompt(
  Object.entries(questions).map(
    ([key, value]) => ({
      name: `\n${key}`,
      message: key,
      type: 'input',
      default: value
    })
  )
)
