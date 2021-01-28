const { usrLeft } = require('../../functions/welcomeMsg.js');

module.exports = async (client, member) => {
    usrLeft(client, member);
};