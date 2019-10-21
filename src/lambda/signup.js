const { User } = require('../models')
const connectToDb = require('../connect-to-db')
const { hash } = require('bcrypt')

export async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    connectToDb()
    const req = JSON.parse(event.body)
    const hashedPassword = await hash(req.password, 10)
    const lowercaseEmail = req.email.toLowerCase()

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
