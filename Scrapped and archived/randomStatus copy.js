const { setStatus } = require('./statusFunction.js');
var randomStatusEnable = false

module.exports = {
    /*randomStatusEnable: true,*/
    randomStatus: function() {
        // Random status, no kidding
        if (/*this.*/randomStatusEnable === true) {
            console.log(/*this.*/randomStatusEnable)
            const statusses = ['awake', 'asleep', 'busy', /*'gone', */'stream', 'play', 'listen']; //We don't want to have the bot appear offline
            var randomisedStatus = statusses[Math.floor(Math.random() * statusses.length)];
            setStatus(client, message, randomisedStatus);
        }
        else {
            // If randomisation is off, just don't do it :]
            console.log(/*this.*/randomStatusEnable)
        }
    }
};
