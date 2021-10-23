const { tofuError } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = (client, queue, error, ...args) => {
	switch (error) {
		case 'Status code: 403':
			queue.metadata.channel.send('Status 403, not allowed to get that resource (this is a known issue and will be fixed soon, hopefully');
			break;
		case 'Status code: 404':
			queue.metadata.channel.send('Status 404, resource not found');
			break;
		default:
			const errorEmbed = new Discord.MessageEmbed()
				.setColor(tofuError)
				.setDescription(`Tofu choked :headstone:\n\`${error}\``)
				.setFooter('This error has been automatically reported to the devs')
				.setTimestamp();
			new Tantrum(client, 'error.js', 'Tofu Choked', `${error}`);
			queue.metadata.channel.send({ embeds: [errorEmbed] });
			break;
	}
};
