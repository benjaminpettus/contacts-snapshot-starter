const router = require('express').Router();
const contacts = require('./contacts')
const DbContacts = require('../../db/contacts');
const Users = require('../../db/users')
const passport = require('../../../auth/passport')
const bcrypt = require('bcrypt')



router.get('/', ( request, response ) => {
  response.render('login')
})

router.post( '/', ( request, response, next ) => {
  passport.authenticate( 'local' , {
    successRedirect: '/contacts',
    failureRedirect: '/'
  })(request, response, next )
})

router.get( '/signup', ( request, response ) => {
  response.render( 'signup' )
})

router.post( '/signup', ( request, response, next ) => {
  const { username, password, email } = request.body
  bcrypt.hash( password, 10, ( err, hash ) => {
    Users.createUser( email, username, hash, () => {
      response.redirect( '/' )
    })
  })
})




router.use('/contacts', contacts);

module.exports = router;
