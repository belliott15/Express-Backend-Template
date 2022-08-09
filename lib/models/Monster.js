const pool = require('../utils/pool');

module.exports = class Monster {
  id;
  user_id;
  name;
  species;
  power_level;
  type;
  sub_type;
  created_at;

  constructor({ 
    id, 
    user_id, 
    name, 
    species, 
    power_level, 
    type,
    sub_type, 
    created_at 
  })
  {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.species = species;
    this.power_level = power_level;
    this.type = type;
    this.sub_type = sub_type;
    this.created_at = created_at;  
  }
  //creates new monster and puts them into the table
  static async insert({ name, species, type, sub_type, user_id }){
    const { rows } = await pool.query(`
    INSERT INTO monsters (name, species, type, sub_type, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `, [name, species, type, sub_type, user_id]);

    return new Monster(rows[0]);
  }

};
