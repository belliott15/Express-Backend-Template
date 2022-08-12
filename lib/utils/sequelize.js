const { Sequalize } = require('sequelize');

const options = { dialect: 'postgres', logging: false };

let sequelize = null;

const { DATABASE_URL } = process.env;
if(DATABASE_URL){
  sequelize = new Sequalize(process.env.DATABASE_URL, options);
} else {
  const {
    PGDATABASE: database,
    PGUSER: username,
    PGPASSWORD: password,
  } = process.env;
  sequelize = new Sequalize({ ...options, database, username, password });
}

const { host, port, database } = sequelize.config;
console.log(
  '🐘 Sequelize Postgres connected to',
  `"${database}" on ${host}:${port}`
);

module.exports = sequelize;
