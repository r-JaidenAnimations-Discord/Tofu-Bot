const { usrLeft } = require('../../functions/welcomeMsg.js');
const { jaidenServerID } = require('../../config.json');

module.exports = async (client, member) => {
	if (member.guild.id != jaidenServerID) return console.log('joined but not jaidenserver');
	usrLeft(client, member);
};