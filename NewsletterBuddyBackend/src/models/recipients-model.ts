import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const Recipient = sequelize.define('Recipient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subscribed: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'recipients',
  timestamps: false,
});

export default Recipient;
