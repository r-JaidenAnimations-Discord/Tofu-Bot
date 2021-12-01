const LavaManager = require('#handlers/lavaManager.js');

module.exports = (client, queue) => {
	LavaManager.lavaLog('Track ended');
	delete queue.player.skip; // I don't know what it does exactly, but i saw it in a few other repos so
};
