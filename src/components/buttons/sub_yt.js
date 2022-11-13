
module.exports = {
    data: {
        name: 'sub_yt'
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: 'https://youtube.com'
        });
    }
}