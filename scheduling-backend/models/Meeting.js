import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';

class Meeting extends Model {}

Meeting.init({
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    onlineInfo: {
        type: DataTypes.TEXT
    },
    attendees: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    host: {
        type: DataTypes.STRING
    },
    coHost: {
        type: DataTypes.STRING
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    meetingType: {
        type: DataTypes.STRING, /* Internal or External*/
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'Meeting',
    tableName: 'meetings'
});

export default Meeting;
