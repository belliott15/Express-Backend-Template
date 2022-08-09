const pool = require('../utils/pool');
const bcrypt = require('bcrypt');
const HttpError = require('../utils/HttpError.js');

module.exports = class User {
  id;
  email;
  #passwordHash; //# is a private class field: 
  // hides it from anything outside this class

  constructor({ id, email, password_hash }) {
    this.id = id;
    this.email = email;
    this.#passwordHash = password_hash;
  }
  
  //gets all users in table
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows.map((row) => new User(row));
  }

  //creates a user
  static async insert({ email, password }) {
    //email requirements
    if(email.length <= 6) {
      throw new Error('Invalid Input');
    }
    //password requirements
    if(password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    // hash the password
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    //try catch with the insert into users table
    try{
      const { rows } = await pool.query(`
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING *
      `, [email, passwordHash]);
      return new User(rows[0]);
    }catch(e){
      if (e.code === '23505'){
        throw new HttpError('This email already exists', 400);
      }
      throw e;
    }
  }


};
