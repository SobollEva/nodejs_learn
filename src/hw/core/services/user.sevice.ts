import {User} from "../../types/user.type";
import {UserModel} from '../../models';

const debug = require('debug')('app:service:user');

export default class UserService {
    async getUserList(limit: number) {
        debug(`getUserList, limit: ${limit}`);
        return await UserModel.findAll({
            raw: true,
            limit: limit
        });
    }

    async getUserById(id: string) {
        debug(`getUserById, user_id: ${id}`);
        return await UserModel.findOne({where: {user_id: id}});
    }

    async deleteUserById(id: string) {
        debug(`deleteUserById, user_id: ${id}`);
        return await UserModel.update({isDeleted: true}, {
            where: {id}
        })
    }

    async createUser(user: User) {
        debug(`createUser, user: ${JSON.stringify(user)}`);
        return await UserModel.create({
            ...user
        });
    }

    async updateUser(user: User) {
        debug(`updateUser, user: ${JSON.stringify(user)}`);
        return await UserModel.update({...user}, {
            where: {
                user_id: user.user_id
            }
        })
    }
}
