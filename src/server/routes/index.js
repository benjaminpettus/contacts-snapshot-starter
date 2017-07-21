const router = require('express').Router()
const auth = require('./authRoutes')
const contacts = require('./contacts')

const sessionChecker = (request, response, next) => {
  if(!(request.session.passport && request.cookies.user_sid)) {
    response.redirect('/login')
  } else {
    next()
  }
}

router.use(auth)
router.use(sessionChecker)
router.use('/contacts', contacts);

module.exports = router;
