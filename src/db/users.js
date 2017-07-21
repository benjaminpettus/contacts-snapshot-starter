const db = require('./db')

const createUser = (email, username, password, callback) => {
  return db.query(`
    INSERT INTO
      users ( email, username, password)
    VALUES ( $1::text, $2::text, $3::text )
    RETURNING *
    `,
    [ email, username, password ])
    .then( data => data )
    .catch( error => error )
}

const findByUsername = ( username ) => {
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
  .catch( error => console.log(error))
}

const findUserById = (id) => {
  return db.one(`
    SELECT
      id, username
    FROM
      users
    WHERE
      id=$1
  `,
  [ id ])
  .then(data => data )
  .catch( error => console.log(error))
}

module.exports = {
  createUser,
  findByUsername,
  findUserById
}
