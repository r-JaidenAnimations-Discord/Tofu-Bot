const Discord = require('discord.js');
const https = require('https');
const { minecraftIP, tofuGreen, botProfile, maxID, tofuError } = require('../../config.json');

module.exports = {
	name: 'minecraft',
	helpTitle: 'Minecraft',
    category: 'Fun',
    usage: 'minecraft',
    description: 'Show info about our minecraft server!',
	isEnabled: true,
	aliases: ['mc', 'minecraff', 'minecrap'],
	cooldown: 5,
	execute: async function(client, message, args) {
        message.channel.startTyping();
		var url = `https://api.mcsrvstat.us/2/${minecraftIP}`;

        https.get(url, function(res) {
            var body = '';
        
            res.on('data', function(chunk) {
                body += chunk;
            });
        
            res.on('end', function() {
                var APIresponse = JSON.parse(body);
                //console.log("Got a response: ", APIresponse.ip);
                //console.log(APIresponse.players.list)
                //console.log(APIresponse)
                var i;
                var playerList = 'No online members';
                var userCount = 0;
                var downStatus = `${APIresponse.online === true ? 'The server is currently working' : '⚠️ **The server is down**'}`

                const attachment = new Discord.MessageAttachment('./commanddata/minecraff.png', 'minecraff.png');
                const minecraftEmbed = new Discord.MessageEmbed()
                    .setColor(tofuGreen)
                    .attachFiles(attachment)
                    .setTitle('Jaiden Animations Minecraft Server'/*, 'attachment://minecraff.png'*/)
                    .setThumbnail('attachment://minecraff.png')
                    .addFields(
                        { name: 'IP Address:', value: `${APIresponse.ip}:${APIresponse.port}` },
                        //{ name: 'Version', value: APIresponse.version },
                        //{ name: `Online Users: ${userCount}`, value: playerList },
                        //{ name: 'Server status:', value: `${downStatus}` },
                    )
                    .setTimestamp();

                if (APIresponse.online === true) {
                    minecraftEmbed.addField('Version:', APIresponse.version)
                }
                if (APIresponse.players.online) {
                    if (APIresponse.online === true) {
                        playerList = '';
                        for (i = 0; i < APIresponse.players.list.length; i++) {
                            playerList += APIresponse.players.list[i] + '\n';
                        }
                    }
                }
                if (APIresponse.online === true) {
                    userCount = `${APIresponse.players.online}/${APIresponse.players.max}`;
                    minecraftEmbed.addField(`Online Users: ${userCount}`, playerList);
                }
            
                minecraftEmbed.addField('Server status:', downStatus);

                try {
                    message.channel.stopTyping();
                    message.channel.send(minecraftEmbed);
                } catch(e) {
                    console.log(`kek ${e}`)
                }
            });
        }).on('error', function(e) {
                try {
                    message.channel.stopTyping();
                    console.log("Got an error: ", e);
                    message.channel.send(new Discord.MessageEmbed().setDescription(`So uh the API doesn't wanna talk rn`).setColor(tofuError));
                    client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`minecraff.js: API did not respond \n \`\`${e}\`\``).setColor(tofuError));
                    return;
                } catch(f) {
                    console.log('========================================================================================================');
                    console.error(`minecraff.js: API did not respond, sending error DM failed: ${e} \n DMError: ${f}`);
                    console.log('========================================================================================================');
                    return;
                }
        });



	},
};