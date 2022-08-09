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
        throw new HttpError('Please be more creative this email already exists', 400);
      }
      throw e;
    }
  }

  //get user by email for signing in
  static async getByEmail(email){
    const { rows } = await pool.query(`
    SELECT * 
    FROM users
    WHERE email=$1
    `, [email]);

    if(!rows[0]) return;

    return new User(rows[0]);
  }

  //
  async isValidPassword(password) {
    return await bcrypt.compare(password, this.#passwordHash);
  }

};
