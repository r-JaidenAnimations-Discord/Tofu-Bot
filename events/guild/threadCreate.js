module.exports = async (client, thread) => {
	if (thread.joinable) await thread.join(); // Auto join threads so tofu can be used in threads
};
