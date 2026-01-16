import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const EventLog = sequelize.define('EventLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  eventType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'recipients',
      key: 'id',
    },
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'eventLogs',
});

export default EventLog;
