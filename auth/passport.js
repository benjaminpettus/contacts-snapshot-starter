const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../src/db/users')
const bcrypt = require('bcrypt')



passport.use(new LocalStrategy({
    passReqToCallback: true
  },
  ( request, username, password, done) => {
    Users.findByUsername( username , (error, user) => {
      console.log('user.password <><><><><>',user.password)
      if (error) { return done(error) }
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
  }
));



passport.serializeUser( ( user, done ) => {
  console.log('user', user)
  done( null, user.id )
})

passport.deserializeUser( ( id, done ) => {
  Users.findUserById( id, ( error, user ) => {
    console.log('user',user)
    if ( error ) { return done( error ) }
    done( error, user )
  })
})

module.exports = passport
