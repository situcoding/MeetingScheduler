/* models/AdminUser.js */
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';


const AdminUser = sequelize.define('AdminUser', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING(255), allowNull: false },
    middle_name: { type: DataTypes.STRING(255), allowNull: true },
    last_name: { type: DataTypes.STRING(255), allowNull: false },
    birthday: { type: DataTypes.DATEONLY, allowNull: true },
    gender: { type: DataTypes.ENUM('M', 'F', 'O'), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    mobile: { type: DataTypes.STRING(20), allowNull: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.ENUM('admin_master', 'admin_user'), allowNull: false, defaultValue: 'admin_user' },
}, {
    tableName: 'admin_users',
    timestamps: false,
    freezeTableName: true
});



export default AdminUser;
