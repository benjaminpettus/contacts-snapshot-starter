const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../src/db/users')
const bcrypt = require('bcrypt')



passport.use(new LocalStrategy({
    passReqToCallback: true,
    session: true
  },
  ( request, username, password, done) => {
    Users.findByUsername( username)
    .then( user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      bcrypt.compare( password, user.password, (error, response) => {
        if (!response) {
          return done(null, false);
        }
        return done(null, user);
      })
    })
    .catch (error => {
      console.error(error)
      done(error)
    })
  }
));



passport.serializeUser( ( user, done ) => {
  done( null, user.id )
})

passport.deserializeUser( ( id, done ) => {
  Users.findUserById( id )
    .then( (user, err) => {
      done( user, err )
    })
})


module.exports = passport
