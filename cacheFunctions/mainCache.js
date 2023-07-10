const NodeCache = require('node-cache');
const myCache = new NodeCache();
const uf = require('../utils/utilityFunctions');

module.exports = {
    cache : myCache,
    fetchAllUsers : async () => {
        const users = await uf.getUsersList().then((userList) => {
            return userList.map((user) => {
                return {
                    _id : user._id, 
                    employeeId : user.employeeId, 
                    name : user.name,
                    role : user.role
                }
            });
        });
        myCache.set('users', users);
        
        // console.log(users);
    }
};