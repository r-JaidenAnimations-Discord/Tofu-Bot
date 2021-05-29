//const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');

module.exports = {
	name: 'ping',
	helpTitle: 'Ping',
	category: 'Bot',
	usage: 'ping',
	description: 'Ping!',
	isDMAllowed: true,
	isDeprecated: false,
	isDangerous: false,
	aliases: ['delay', 'latency'],
	cooldown: 5,
	execute: async function(client, message, args) {
		try {
			const msg = await message.channel.send('Pinging...');
			try {
				msg.edit(`Pong!\nLatency: ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency (Bot): ${client.ws.ping}ms`);
			} catch (e) {
				new Tantrum(client, 'ping.js', 'Error on editing ping message', e);

			}
		} catch (e) {
			new Tantrum(client, 'ping.js', 'Error on sending ping message', e);
		}
	},
};
