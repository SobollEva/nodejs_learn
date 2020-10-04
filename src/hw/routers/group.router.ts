import GroupService from '../core/services/group.sevice';
import {Group} from '../types/group.type';
import {UserGroupModel, db} from "../models";

const createGroup = require('../core/utils/utils');
const validationSchema = require('../core/utils/validation/validation');
const express = require('express');
const groupRouter = express.Router();
const _ = require('lodash');
const scheme = require('../core/utils/validation/group.scheme');
const groupService = new GroupService();
const debug = require('debug')('app:router:group');

groupRouter.route('/group/:id')
    .get(async function (req: any, res: any, next: any) {
        const group: Group = await groupService.getGroupById(req.params.id);
        group
            ? res.json(group)
            : res.status(404).json({message: `Group with id ${req.params.id} is not found`});
    })
    .delete(async function (req: any, res: any) {
        const deletedGroup = await groupService.deleteUserById(req.params.id);
        deletedGroup
            ? res.status(204).json({message: `Group with id ${deletedGroup.group_id} was deleted`})
            : res.status(404).json({message: `Group with id ${req.params.id} is not found`});
    })
    .put(async function (req: any, res: any) {
        if (!req.body) {
            res.status(404).json({message: `No any to change`});
            return;
        }
        const newGroup = {
            group_id: req.params.id,
            name: req.body.name,
            permission: req.body.permission
        };
        const updatedGroup = await groupService.updateGroup(newGroup);
        updatedGroup
            ? res.status(204).send(updatedGroup)
            : res.status(404).json({message: `Group with id ${req.params.id} is not found`})
    })
    .post(async function (req: any, res: any) {
        if (!req.body) {
            res.status(404).json({message: `No any to change`});
            return;
        }
        const groupId: string = req.params.id;
        const userIdList: string[] = req.body.users;
        db.transaction(function (t: any) {
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
        }).then(() => {
            res.status(204).send();
        }).catch((err: any) => {
            res.status(404).json({message: `Promise FAILURE!!!`});
        });

    });

groupRouter.route('/group')
    .post(async function (req: any, res: any) {
        if (!req.body) {
            res.status(404).json({message: `No any to change`});
            return;
        }
        const group: Group = createGroup(req.body);
        const newGroup = await groupService.createGroup(group);
        console.log(`Group ${newGroup.group_id} was created`);
        res.status(204).send({group: newGroup.group_id});
    })
    .get(async function (req: any, res: any) {
        const limit = req.query.limit;
        const groupList = await groupService.getGroupList(limit);
        res.json(groupList);
    });

module.exports = groupRouter;
