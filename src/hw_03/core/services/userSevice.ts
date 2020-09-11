import {User} from "../../types/user";

const {Sequelize, DataTypes} = require('sequelize');
const sq = new Sequelize('postgres://postgres:genya147@127.0.0.1:5432/User');
const UserModel = require('../../models/user');

export default class UserService {
    async getUserList(limit: number) {
        return await UserModel(sq, DataTypes).findAll({
            raw: true,
            order: Sequelize.col('age'),
            limit: limit
        });
    }

    async getUserById(id: string) {
        return await UserModel(sq, DataTypes).findOne({where: {id}});
    }

    async deleteUserById(id: string) {
        // return await UserModel(sq, DataTypes).destroy({
        //     where: {id}
        // });
        return await UserModel(sq, DataTypes).update({isDeleted: true}, {
            where: {id}
        })
    }

    async createUser(user: User) {
        return await UserModel(sq, DataTypes).create({
            ...user
        });
    }

    async updateUser(user: User) {
        return await UserModel(sq, DataTypes).update({...user}, {
            where: {
                id: user.id
            }
        })
    }
}
