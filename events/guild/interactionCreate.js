const { tofuRed, tofuError } = require('#colors');
const { banKirito, banAli, maxID } = require('#memberIDs');
const Discord = require('discord.js');
const fs = require('fs');
const Tantrum = require('#tantrum');
const { dangerCommandPrompt } = require('#utils/dangerPrompt.js');
const { humanReadableDuration } = require('#utils/buildTimeString.js');

module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;
    console.log(interaction);
    if (interaction.commandName === 'slash-commands') {
        await interaction.reply('It\'s super effective!');
        client.commands.get('about').execute(client)
    }
}
