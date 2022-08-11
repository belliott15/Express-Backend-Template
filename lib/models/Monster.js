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

  static async getAll(id){
    const { rows } = await pool.query(`
    SELECT * 
    FROM monsters
    WHERE id=$1
    `, [id]);
    return rows.map(monster => new Monster(monster));
  }

  static async getById(id){
    const { rows } = await pool.query(`
    SELECT * 
    FROM monsters
    WHERE id=$1
    `, [id]);

    if(!rows[0]) return null;
    return new Monster(rows[0]);
  }

  static async updateById(id, user_id, attrs){
    const monster = await Monster.getById(id);
    if(!monster) return null;
    const { name, species, type, sub_type, power_level } = { ...monster, ...attrs };
    const { rows } = await pool.query(`
    UPDATE monsters
    SET name=$3, species=$4, type=$5, sub_type=$6, power_level=$7
    WHERE id=$1
    AND user_id=$2
    RETURNING *;
    `, [id, user_id, name, species, type, sub_type, power_level]);
    return new Monster(rows[0]);
  }

  static async delete(id){ 
    const { rows } = await pool.query(`
    DELETE FROM monsters
    WHERE id=$1
    RETURNING *
    `, [id]);
    return new Monster(rows[0]);
  }
};
