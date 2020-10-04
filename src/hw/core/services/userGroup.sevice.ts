import {db, UserGroupModel} from '../../models';

const debug = require('debug')('app:service:user_group');

export default class UserGroupService {
    async addUsersToGroup(groupId: string, userIdList: string[]) {
        debug(`addUsersToGroup, groupId: ${groupId}, userIdList: ${JSON.stringify(userIdList)}`);
        return await db.transaction(function (t: any) {
            let promises = [];
            promises.push(
                userIdList.map((item: string) => {
                    return UserGroupModel.create(
                        {
                            groupGroupId: groupId,
                            userUserId: item
                        }
                    );
                })
            );
            return Promise.all(promises);
        })
    }
}
// const newGroup: Group = createGroup(req.body);
// let t;
// t = await db.transaction();
// const gr = await GroupModel.create(newGroup, {transaction: t});
// await UserGroupModel.create({
//     groupGroupId: gr.group_id,
//     userUserId: '3d47bb20-ff27-11ea-82a8-9782da79bc4f'
// }, {transaction: t});
// await t.commit();
// res.status(204).send({group: newGroup.group_id});
