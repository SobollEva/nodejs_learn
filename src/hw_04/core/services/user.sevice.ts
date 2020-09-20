import {User} from "../../types/user.type";
import {UserModel, UserGroupModel} from '../../models';

export default class UserService {
    async getUserList(limit: number) {
        UserGroupModel.findAll({
            raw: true
        });
        return await UserModel.findAll({
            raw: true,
            limit: limit
        });
    }

    async getUserById(id: string) {
        return await UserModel.findOne({where: {user_id: id}});
    }

    async deleteUserById(user_id: string) {
        return await UserModel.update({isDeleted: true}, {
            where: {user_id}
        })
    }

    async createUser(user: User) {
        return await UserModel.create({
            ...user
        });
    }

    async updateUser(user: User) {
        return await UserModel.update({...user}, {
            where: {
                user_id: user.user_id
            }
        })
    }
}
