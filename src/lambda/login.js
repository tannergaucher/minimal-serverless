export async function handler(event, context) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          login: 'login stuff whoo',
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
