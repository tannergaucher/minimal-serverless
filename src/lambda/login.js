const { User } = require('../models')
const connectToDb = require('../connect-to-db')
const { sign } = require('jsonwebtoken')

export async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    connectToDb()

    const req = JSON.parse(event.body)
    const lowercaseEmail = req.email.toLowerCase()
    const [user] = await User.find({
      email: lowercaseEmail,
    })
    const token = sign({ userId: user.id }, process.env.REACT_APP_APP_SECRET)

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          user,
          token,
        },
      }),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    }
  }
}
