const { tofuOrange } = require('../config.json');
const Discord = require('discord.js');
const Tantrum = require('./tantrum.js');
const { musicStrings } = require('../commanddata/strings.json');

let musicCheckEmbed = new Discord.MessageEmbed()
    .setColor(tofuOrange);

const checkMusic = (client, message) => {
    if (!message.member.voice.channel) {
        musicCheckEmbed.setDescription(musicStrings.notInVoiceChannel);
        try {
            message.channel.send(musicCheckEmbed);
        } catch (e) {
            throw new Tantrum(client, 'musicCheck.js', 'Error on sending musicCheckEmbed (notInVoiceChannel)', e);
        }
        return false;
    }

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
        musicCheckEmbed.setDescription(musicStrings.notSameVoiceChannel);
        try {
            message.channel.send(musicCheckEmbed);
        } catch (e) {
            throw new Tantrum(client, 'musicCheck.js', 'Error on sending musicCheckEmbed (notSameVoiceChannel)', e);
        }
        return false;
    }
    return true;
}

const checkQueueExists = (client, message) => {
    if (!client.player.getQueue(message)) {
        musicCheckEmbed.setDescription(musicStrings.noMusicPlaying);
        try {
            message.channel.send(musicCheckEmbed);
        } catch (e) {
            throw new Tantrum(client, 'musicCheck.js', 'Error on sending musicCheckEmbed (noMusicPlaying)', e);
        }
        return false;
    }
    return true;
}

module.exports = {
    checkMusic,
    checkQueueExists
};
