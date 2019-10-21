const { User } = require('../models')
const connectToDb = require('../connect-to-db')

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    connectToDb()
    const req = JSON.parse(event.body)
  } catch (error) {
    console.log(error)
  }
}
