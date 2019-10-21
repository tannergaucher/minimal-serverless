const { User } = require('../models')
const connectToDb = require('../connect-to-db')
const { hashSync, genSaltSync } = require('bcryptjs')

export async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    connectToDb()
    const req = JSON.parse(event.body)
    const lowercaseEmail = req.email.toLowerCase()
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(req.password, salt)

    const user = await User.create({
      email: lowercaseEmail,
      password: hashedPassword,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          user,
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
