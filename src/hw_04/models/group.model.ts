module.exports = function (sequelize: any, DataTypes: any) {
    return sequelize.define('group', {
        group_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        permission: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'group'
    });
};
