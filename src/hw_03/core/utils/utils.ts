import {User} from "../../types/user";
const {v1: uuidv4} = require('uuid');
const _ = require('lodash');

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
    const newStore = store.filter((user: User) => user.login.includes(loginSubstring)).sort(sortListByLogin);
    const arrayLimit = _.isEmpty(limit) ? newStore.length : limit
    console.log('newStore', newStore);
    return newStore.splice(0, limit - 1);
}

function createUser(user: User): User{
    return {...user, id: uuidv4(user), isDeleted: false}
}
module.exports = getAutoSuggestUsers;
module.exports = createUser;
