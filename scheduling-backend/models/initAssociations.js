import AdminUser from './AdminUser.js';
import LoginLog from './Login_logs.js';

AdminUser.hasMany(LoginLog, {
    foreignKey: 'admin_user_id',
    sourceKey: 'id'
});

LoginLog.belongsTo(AdminUser, {
    foreignKey: 'admin_user_id',
    targetKey: 'id'
});
