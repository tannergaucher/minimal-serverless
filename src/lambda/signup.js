const { User } = require('../models')
const db = require('../db')

export async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const req = JSON.parse(event.body)

    const user = await User.create({
      email: req.email,
      password: req.password,
    })

    console.log(user)

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
