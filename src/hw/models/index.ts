const {Sequelize, DataTypes} = require('sequelize');
export const db = new Sequelize('postgres://postgres:genya147@127.0.0.1:5432/User');
const GroupFactory = require('../models/group.model');
const UserFactory = require('../models/user.model');
const UserGroupFactory = require('../models/userGroup.model');

export const GroupModel = GroupFactory(db, DataTypes);
export const UserModel = UserFactory(db, DataTypes);
export const UserGroupModel = UserGroupFactory(db, DataTypes);

// GroupModel.belongsTo(UserModel, { foreignKey: 'group_id', sourceKey: 'user_group_id', through: UserGroupModel });
// UserModel.belongsTo(GroupModel, { foreignKey: 'user_id', sourceKey: 'user_group_id', through: UserGroupModel });
UserGroupModel.belongsTo(GroupModel);
UserGroupModel.belongsTo(UserModel);
// const sync = () => {
//     return db.sync();
// };
//
// sync()
//     .then(() => console.log('synched'))
//     .catch((error: any) => console.log('sync error', error));
