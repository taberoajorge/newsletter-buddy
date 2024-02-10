import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const EmailTask = sequelize.define('EmailTask', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'recipients',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
  attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastAttempt: {
    type: DataTypes.DATE,
  },
  attachment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subject: DataTypes.STRING,
  html: DataTypes.TEXT,
}, {
  tableName: 'emailTasks',
});

export default EmailTask;
