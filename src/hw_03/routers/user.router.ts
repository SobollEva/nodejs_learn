import {User} from '../types/user';
import UserService from "../core/services/userSevice";

const getAutoSuggestUsers = require('../core/utils/utils');
const createUser = require('../core/utils/utils');
const validationSchema = require('../core/utils/validation/validation');
const express = require('express');
const userRouter = express.Router();
const _ = require('lodash');
const scheme = require('../core/utils/validation/validation.scheme');
const userService = new UserService();

userRouter.route('/user/:id')
    .get(async function (req: any, res: any, next: any) {
        const user: User = await userService.getUserById(req.params.id);
        Boolean(user && !user.isDeleted)
            ? res.json(user)
            : res.status(404).json({message: `User with id ${req.params.id} is not found`});
    })
    .delete(async function (req: any, res: any) {
        const user: User = await userService.getUserById(req.params.id);

        if (user && !user.isDeleted) {
            const deletedUser = await userService.deleteUserById(user.id);
            res.status(204).json({message: `User with id ${deletedUser.id} was deleted`})
        } else {
            res.status(404).json({message: `User with id ${req.params.id} is not found`});
        }
    })
    .put(async function (req: any, res: any) {
        const user: User = await userService.getUserById(req.params.id);

        if (user) {
            if (!user.isDeleted) {
                const updatedUser = {
                    id: req.params.id,
                    isDeleted: false,
                    login: req.body.login,
                    password: req.body.password,
                    age: req.body.age
                };
                await userService.updateUser(updatedUser);
            } else {
                res.status(404).json({message: `User with id ${req.params.id} is not found`})
            }
        } else {
            const newUser: User = createUser(req.body);
            await userService.updateUser(newUser);
        }

        res.status(204).send();
    });

userRouter.route('/user')
    .post(validationSchema(scheme), async function (req: any, res: any) {
        const user: User = createUser(req.body);
        const newUser = await userService.createUser(user);
        console.log(`User id ${user.id} was created`);
        res.status(204).send({user: newUser.id});
    })
    .get(async function (req: any, res: any) {
        const limit = req.query.limit;
        const loginSubstr = req.query.search;
        const userList = await userService.getUserList(limit);
        const userListBySearch = getAutoSuggestUsers(loginSubstr, limit, userList);
        res.json(userList);
    });

module.exports = userRouter;
