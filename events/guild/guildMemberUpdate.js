const { maxID } = require('#memberIDs');
const Tantrum = require('#tantrum');

module.exports = async (client, oldMember, newMember) => {
    const { staffChatID } = client.config;

    if (newMember.roles.cache.get('839177048173576272') && newMember.id === maxID) {
        try {
            newMember.roles.remove('839177048173576272');
            client.channels.cache.get(staffChatID).send('<@640369291220353053> I SWEAR TO F*CKING GOD DO NOT EVER GIVE ME YOUR STUPID ROLE AGAIN. DON\'T EVEN TRY. ALLRIGHT.\n GOD F*CKING DAMMIT.');
        } catch (e) {
            throw new Tantrum(client, 'guildMemberUpdate.js', 'Error on removing harly role', e);
        }
    }
};
