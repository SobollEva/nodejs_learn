import {User} from '../types/user.type';
import UserService from "../core/services/user.sevice";

const {v1: uuidv4} = require('uuid');

const getAutoSuggestUsers = require('../core/utils/utils');
const createUser = require('../core/utils/utils');
const validationSchema = require('../core/utils/validation/validation');
const express = require('express');
const userRouter = express.Router();
const _ = require('lodash');
const scheme = require('../core/utils/validation/user.scheme');
const userService = new UserService();
const debug = require('debug')('app:router:user');
const error_handler = require('../core/middlewares/error-handling')

userRouter.route('/user/:id')
    .get(async function (req: any, res: any, next: any) {
        error_handler(req, res);
        const user: User = await userService.getUserById(req.params.id);
        Boolean(user && !user.isDeleted)
            ? res.json(user)
            : res.status(404).json({message: `User with id ${req.params.id} is not found`});
    })
    .delete(async function (req: any, res: any) {
        const user: User = await userService.getUserById(req.params.id);
        if (user && !user.isDeleted) {
            const deletedUser = await userService.deleteUserById(user.user_id);
            res.status(204).json({message: `User with id ${deletedUser.user_id} was deleted`})
        } else {
            res.status(404).json({message: `User with id ${req.params.id} is not found`});
        }
        res.status(204).json({message: `Done`})
    })
    .put(async function (req: any, res: any) {
        const user: User = await userService.getUserById(req.params.id);

        if (user) {
            if (!user.isDeleted) {
                const updatedUser = {
                    user_id: req.params.id,
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
        const user: User = {...req.body, user_id: uuidv4(req.body), isDeleted: false};
        const newUser = await userService.createUser(user);
        console.log(`User id ${user.user_id} was created`);
        res.status(204).send({user: newUser.user_id});
    })
    .get(async function (req: any, res: any) {
        const limit = req.query.limit;
        const loginSubstr = req.query.search;
        const userList = await userService.getUserList(limit);
        res.json(userList);
    });

module.exports = userRouter;
