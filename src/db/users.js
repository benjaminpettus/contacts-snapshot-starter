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

const findByUsername = ( username, callback ) => {
  console.log('username',username)
  return db.one(`
    SELECT
      id, username, password
    FROM
      users
    WHERE
      username=$1
  `,
  [ username ])
  .then( (data, error) => {
    callback( error, data)
  })
}

const findUserById = function(id) {
  return db.one(`
    SELECT
      *
    FROM
      users
    WHERE
      id=$1
  `,
  [ id ])
  .then(data => data)
  .catch( error => error )
}

module.exports = {
  createUser,
  findByUsername,
  findUserById
}
