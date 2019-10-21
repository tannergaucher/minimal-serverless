const mongoose = require('mongoose')

const dbOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
}

mongoose.connect(process.env.REACT_APP_DB_URL, dbOptions)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = {
  db,
}
