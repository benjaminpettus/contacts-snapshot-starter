const router = require('express').Router();
const contacts = require('./contacts')
const DbContacts = require('../../db/contacts');
const Users = require('../../db/users')
const passport = require('../../../auth/passport')



router.get('/', ( request, response ) => {
  response.render('login')
})

router.post( '/', ( request, response, next ) => {
  console.log('request.body',request.body)
  passport.authenticate( 'local' , {
    successRedirect: '/contacts',
    failureRedirect: '/'
  })(request, response, next )
})

router.get( '/signup', ( request, response ) => {
  response.render( 'signup' )
})

router.post( '/signup', ( request, response ) => {
  Users.createUser(request.body)
    .then(( users ) => { response.redirect( '/' )} )
})



router.use('/contacts', contacts);

module.exports = router;
