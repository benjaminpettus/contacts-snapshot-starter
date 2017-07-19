const express = require('express')
const bodyParser = require('body-parser')
const dbContacts = require('./db/contacts')
const path = require('path')
const app = express()
const passport = require('passport')
const {renderError} = require('./server/utils')
const routes = require('./server/routes');

app.set( 'view engine', 'ejs' );
app.set('views', path.join( __dirname + '/views' ))

app.use(express.static('public'))
app.use(passport.initialize())

app.use(bodyParser.urlencoded({ extended: false }))
app.use((request, response, next) => {
  response.locals.query = ''
  next()
})




app.use('/', routes)

app.use((request, response) => {
  response.render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
