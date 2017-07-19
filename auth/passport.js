const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../src/db/users')



passport.use(new LocalStrategy({
    passReqToCallback: true
  },
  ( request, username, password, done) => {
    Users.findByUsername( username , (err, user) => {
      console.log('user.password <><><><><>',user.password)
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password !== user.password) {
        return done(null, false);
      }
      return done(null, user);
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
