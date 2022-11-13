const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout the provided member')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member you\'d like to timeout')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName('time')
                .setDescription('The amount of minute to timeout a member for')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Reason for timing out the provided member')
        ),
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        let reason = interaction.options.getString('reason');
        const time = interaction.options.getInteger('time');
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

        if (!reason) {
            reason = "No reason provided";
        }
        // if (!time) {
        //     time = null;
        // }

        await user.send({
            content: `You are timedout from: ${interaction.guild.name}\nReason: ${reason}`
        }).catch(console.log('user\'s DM\'s are off'));

        await member.timeout(time * 60 * 1000, reason).catch(console.error) //time is in milliseconds

        await interaction.reply({
            content: `Timed out ${user.tag} successfully`
        });
    }
}