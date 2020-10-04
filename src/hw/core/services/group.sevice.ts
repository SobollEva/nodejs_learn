import {Group} from '../../types/group.type';
import {GroupModel} from '../../models';
const debug = require('debug')('app:service:group');

export default class GroupService {
    async getGroupList(limit: number) {
        debug(`getGroupList, limit: ${limit}`);
        return await GroupModel.findAll({
            raw: true,
            limit: limit
        });
    }

    async getGroupById(id: string) {
        debug(`getGroupById, id: ${id}`);
        return await GroupModel.findOne({where: {group_id: id}});
    }

    async deleteUserById(group_id: string) {
        return await GroupModel.destroy({
            where: {group_id}
        });
    }

    async createGroup(group: Group) {
        debug(`createGroup, group: ${JSON.stringify(group)}`);
        return await GroupModel.create({
            ...group
        });
    }

    async updateGroup(group: Group) {
        debug(`updateGroup, group: ${JSON.stringify(group)}`);
        return await GroupModel.update({...group}, {
            where: {
                group_id: group.group_id
            }
        })
    }
}
