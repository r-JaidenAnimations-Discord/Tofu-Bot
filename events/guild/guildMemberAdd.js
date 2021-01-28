const { usrJoin } = require('../../functions/welcomeMsg.js');

module.exports = async (client, member) => {
    usrJoin(client, member);
};