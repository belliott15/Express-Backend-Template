//require app in order to import all models
require('../lib/app');
const sequelize = require('../lib/utils/sequelize');

async function sync() {
  try{
    await sequelize.sync({ alter: true });
    const { host, port, database } = sequelize.config;
    console.log(
      '🔄 Sequelize models synced to',
      `"${database}" on ${host}:${port}`
    );
  }catch(e){
    console.error(e);
  }finally{
    sequelize.close();
  }
}

sync();
