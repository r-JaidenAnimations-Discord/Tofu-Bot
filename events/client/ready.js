const { botLogChannelId } = require('../../config.json');

module.exports = client => {
    console.log(`Alive as ${client.user.tag}`);
	//client.channels.cache.get(botLogChannelId).send(`Hello, i am alive now`);
}