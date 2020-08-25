import {User} from './type';

const {v1: uuidv4} = require('uuid');
const express = require('express');
const app = express();
const router = express.Router();
const _ = require('lodash');
const userStore: User[] = [];
const scheme = require('./validation.scheme');

function sortListByLogin(a: User, b: User) {
    if (a.login > b.login) {
        return 1;
    }
    if (a.login < b.login) {
        return -1;
    }
    return 0;
}

// get auto-suggest list from limit users, sorted by login property and filtered by loginSubstringin the login property
function getAutoSuggestUsers(loginSubstring: string, limit: number, store: User[]) {
    const newStore = store.sort(sortListByLogin).filter((user: User) => user.login.includes(loginSubstring));
    return newStore.splice(0, limit - 1);
}

function errorResponse(schemaErrors: any) {
    const errors = schemaErrors.map((error: any) => {
        let {path, message} = error;
        return {path, message};
    });
    return {
        status: 'error',
        errors
    }
}

function validationSchema(schema: any) {
    return (req: any, res: any, next: any) => {
        const result = schema.validate(req.body);
        console.log('result', result);
        if (result.error) {
            res.status(400).json(errorResponse(result.error.details))
        } else {
            next();
        }
    }
}

app.listen(3000);

app.use(express.json());

router.route('/user/:id')
    .get(function (req: any, res: any, next: any) {
        const user: User = _.find(userStore, {id: req.params.id});
        Boolean(user && !user.isDeleted)
            ? res.json(user)
            : res.status(404).json({message: `User with id ${req.params.id} is not found`});
    })
    .delete(function (req: any, res: any) {
        const index: number = _.findIndex(userStore, {id: req.params.id});
        if ((index + 1) && !userStore[index].isDeleted) {
            userStore[index] = {...userStore[index], isDeleted: true};
            res.json({message: `User with id ${req.params.id} was deleted`})
        } else {
            res.status(404).json({message: `User with id ${req.params.id} is not found`});
        }
    })
    .put(function (req: any, res: any) {
        res.set('Content-Type', 'application/json');
        const index: number = _.findIndex(userStore, {id: req.params.id});
        if (index + 1) {
            if (!userStore[index].isDeleted) {
                userStore[index] = {
                    id: req.params.id,
                    isDeleted: false,
                    login: req.body.login,
                    password: req.body.password,
                    age: req.body.age
                };
            } else {
                res.status(404).json({message: `User with id ${req.params.id} is not found`})
            }
        } else {
            const newUser: User = {...req.body, id: uuidv4(req.body), isDeleted: false};
            userStore.push(newUser);
        }

        res.status(204).send();
    });

router.route('/user')
    .post(validationSchema(scheme), function (req: any, res: any) {
        res.set('Content-Type', 'application/json');

        const user: User = {...req.body, id: uuidv4(req.body), isDeleted: false};
        userStore.push(user);

        res.status(204).location(`User id ${user.id} was created`).send();
    })
    .get(function (req: any, res: any) {
        const limit = req.query.limit;
        const loginSubstr = req.query.search;
        const userListBySearch = getAutoSuggestUsers(loginSubstr, limit, userStore);

        res.json(userListBySearch);
    });

app.use('/', router);


