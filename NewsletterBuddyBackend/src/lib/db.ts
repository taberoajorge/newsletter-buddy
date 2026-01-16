// db.js
import { Sequelize } from 'sequelize';
import config from './config.js';

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
