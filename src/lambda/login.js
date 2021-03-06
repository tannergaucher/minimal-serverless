const { User } = require('../models')
const connectToDb = require('../connect-to-db')
const { sign } = require('jsonwebtoken')
const { compareSync } = require('bcryptjs')

export async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    connectToDb()
    const req = JSON.parse(event.body)
    const lowercaseEmail = req.email.toLowerCase()
    const [user] = await User.find({
      email: lowercaseEmail,
    })

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: {
            message: `No user found for that email`,
          },
        }),
      }
    }

    const validPassword = compareSync(req.password, user.password)

    if (!validPassword) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: {
            message: `Invalid Password`,
          },
        }),
      }
    }

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
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: {
          message: `Oops, something went wrong`,
        },
      }),
    }
  }
}
