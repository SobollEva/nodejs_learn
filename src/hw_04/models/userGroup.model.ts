module.exports = function (sequelize: any, DataTypes: any) {
    return sequelize.define('user_group', {
    }, {
        timestamps: false,
        tableName: 'user_group'
    });
};

// user_group_id: {
//     type: DataTypes.TEXT,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false
// },
// user_id: {
//     type: DataTypes.UUID,
//     allowNull: false
// },
// group_id: {
//     type: DataTypes.UUID,
//     allowNull: false
// }
