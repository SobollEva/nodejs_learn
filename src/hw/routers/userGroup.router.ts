import UserGroupService from '../core/services/userGroup.sevice';

const express = require('express');
const userGroupRouter = express.Router();
const userGroupService = new UserGroupService();
const debug = require('debug')('app:router:user_group');

userGroupRouter.route('/group_users')
    .post(async function (req: any, res: any) {
        if (!req.body) {
            res.status(404).json({message: `No any to change`});
            return;
        }
        userGroupService.addUsersToGroup(req.body.group_id, req.body.users)
            .then(() => {
                res.status(204).send();
            }).catch((err: any) => {
            res.status(404).json({message: `Promise FAILURE!!!`});
        });

    });

module.exports = userGroupRouter;
