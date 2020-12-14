const { randomStatus } = require('../../functions/statusFunction.js');

module.exports = client => {
    randomStatus(client)
    console.log(`Alive as ${client.user.tag}`);
}