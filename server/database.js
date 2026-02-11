// const { Sequelize } = require('sequelize');
// const path = require('path');

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: path.join(__dirname, 'database.sqlite'),
//   logging: false
// });

// module.exports = sequelize;



const { Sequelize } = require('sequelize');

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  })
  : new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  });

module.exports = sequelize;


