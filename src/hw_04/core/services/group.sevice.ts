import {Group} from '../../types/group.type';
import {GroupModel, UserGroupModel} from '../../models';

export default class GroupService {
    async getGroupList(limit: number) {
        return await GroupModel.findAll({
            raw: true,
            limit: limit
        });
    }

    async getGroupById(id: string) {
        return await GroupModel.findOne({where: {group_id: id}});
    }

    async deleteUserById(group_id: string) {
        return await GroupModel.destroy({
            where: {group_id}
        });
    }

    async createGroup(group: Group) {
        return await GroupModel.create({
            ...group
        });
    }

    async updateGroup(group: Group) {
        return await GroupModel.update({...group}, {
            where: {
                group_id: group.group_id
            }
        })
    }
}
