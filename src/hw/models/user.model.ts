module.exports = function (sequelize: any, DataTypes: any) {
    return sequelize.define('user', {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        login: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    }, {
        timestamps: false,
        tableName: 'user'
    });
};
