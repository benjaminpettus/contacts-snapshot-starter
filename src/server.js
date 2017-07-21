const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dbContacts = require('./db/contacts')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const {renderError} = require('./server/utils')
const routes = require('./server/routes');

app.set( 'view engine', 'ejs' );
app.set('views', path.join( __dirname + '/views' ))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use((request, response, next) => {
  response.locals.query = ''
  next()
})

app.use(session({
  key: 'user_sid',
  secret: 'issa secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: 10000
  }
}))

app.use( express.static( 'public' ))
app.use( passport.initialize() )
app.use( passport.session() )


app.use(( request, response, next ) => {
  if(!( request.cookies && request.cookies.user_sid )) {
    response.clearCookie('user_sid')
  }
  next()
})

app.use( routes )


app.use((request, response) => {
  response.render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
