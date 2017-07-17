const db = require('./db')

const createUser = (user, callback) => {
  return db.query(`
    INSERT INTO
      users ( email, username, password)
    VALUES ( $1::text, $2::text, $3::text )
    RETURNING *
    `,
    [ user.email, user.username, user.password ])
    .then( data => data )
    .catch( error => error )
}

module.exports = {
  createUser
}
