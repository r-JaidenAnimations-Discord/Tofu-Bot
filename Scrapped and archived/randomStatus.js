const statusFunc = require('./statusFunction.js');
const Discord = require('discord.js');
const { mxmProfile, infonetSvr, botProfile, infonetBlue, infonetGreen, infonetOrange } = require('../config.json');





/*module.exports = {
    randomStatusEnable: true,
    randomStatus: function() {
        // Random status, no kidding
        if (this.randomStatusEnable === true) {
            const statusses = ['awake', 'asleep', 'busy', /*'gone', /'stream', 'play', 'listen']; //We don't want to have the bot appear offline
            var randomisedStatus = statusses[Math.floor(Math.random() * statusses.length)];
            setSts(client, message, randomisedStatus);
        }
        else {
            // If randomisation is off, just don't do it :]
            console.log(this.randomStatusEnable)
        }
    }
};
*/
let randomStatusEnable = false; //the moment this becomes true, the shit hits the fan

// We don't want to have the bot appear offline
const states = ['awake', 'asleep', 'busy', /*'gone', */'stream', 'play', 'listen'];

const randomStatus = (client, message) => { 
  if(randomStatusEnable) {
    console.log({randomStatusEnable});
    const nextState = states[Math.floor(Math.random() * states.length)];
    statusFunc.setSts(client, message, nextState);
    setInterval(statusFunc.setSts(client, message, nextState), 5 * 1000); // 30 * 60 * 1000 set to this later (wait idk how recursion would work)
  } else {
    console.log({randomStatusEnable});
  }
}

/*
If we set a timeout here, it calls itself after a while, otherwise it stops calling
we can start it again when toggling
*/

      /*  const toggleRandomStatus = (client, message, args) => {
            randomStatusEnable = !randomStatusEnable
            randomStatus();

            const randomStatusEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setAuthor('Infonet bot', botProfile)
                        .setDescription(`Automatic randomised messages have been set to: ${randomStatusEnable}`)
                        .setTimestamp()
                        .setFooter('Made by Maxim Coppieters', mxmProfile);

            message.channel.send(randomStatusEmbed);
            console.log(`Randomoooo set to: ${randomStatusEnable}`)*/

    
    /* won't this s
     no, this will actually start the timer once the command is triggered and then set the timeout for the bot
     but won't this set an interval every time it get's toggled
     yeah, but it just gets toggled if the randomStatusEnable = true, right?
     yes but let's say we send ~status random 10x, we now have 10 intervals running
     didn't you make it so that it doesnt run once it's running? with like a var and such
     it checks if randomStatus is enabled, but the function itself runs every set interval. the interval actually always runs, just nothing happens if randomStatusEnable === false
     as you said, nothing happens if randomStatusEnable == true, so it just won't call?
     the function still gets called though, check line 31
     */
    
//}

/*module.exports = {
  /*randomStatusEnable,*
  randomStatus,
  toggleRandomStatus
}*/