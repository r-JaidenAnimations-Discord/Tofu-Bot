const { tofuError } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = (client, queue, error, ...args) => {
	const errorEmbed = new Discord.MessageEmbed()
		.setColor(tofuError)
		.setDescription(`Tofu choked :headstone:\n\`${error}\``)
		.setFooter('This error has been automatically reported to the devs')
		.setTimestamp();
	new Tantrum(client, 'error.js', 'Tofu Choked', `${error}`);
	queue.metadata.channel.send({ embeds: [errorEmbed] }).catch(e => {
		new Tantrum(client, 'error.js', 'Error on sending errorEmbed', e);
	});
};
