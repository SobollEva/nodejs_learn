import {User} from '../../types/user.type';
import {Group} from '../../types/group.type';

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
    const arrayLimit = _.isEmpty(limit) ? newStore.length : limit;
    return newStore.splice(0, limit - 1);
}

function createUser(user: User): User {
    console.log('createUser user', user);
    return {...user, user_id: uuidv4(user), isDeleted: false}
}

function createGroup(group: Group): Group {
    return {...group, group_id: uuidv4(group)}
}

module.exports = getAutoSuggestUsers;
module.exports = createUser;
module.exports = createGroup;
