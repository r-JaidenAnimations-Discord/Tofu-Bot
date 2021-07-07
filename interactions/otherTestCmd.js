module.exports = {
    data: {
        name: 'no',
        description: 'Is that a yes or a no?'
    },
    execute: async (client, interaction) => {
        await interaction.reply('I said no');
    }
};
