const { maxID } = require('#memberIDs');

module.exports = async (client, oldMember, newMember) => {
	const { staffChatID } = client.config;

	if (newMember.roles.cache.get('851198783975194674') && newMember.id === maxID) {
		newMember.roles.remove('851198783975194674');
		client.channels.cache.get(staffChatID).send('<@640369291220353053> I SWEAR TO F*CKING GOD DO NOT EVER GIVE ME YOUR STUPID ROLE AGAIN. DON\'T EVEN TRY. ALLRIGHT.\n GOD F*CKING DAMMIT.');
	}
};
