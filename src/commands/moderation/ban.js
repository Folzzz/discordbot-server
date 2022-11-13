const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans the member provided.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member you\'d like to Ban')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Reason for banning the provided member')
        ),
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        let reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

        if (!reason) {
            reason = "No reason provided";
        }

        await user.send({
            content: `You have been banned from: ${interaction.guild.name}\nReason: ${reason}`
        }).catch(console.log('user\'s DM\'s are off'));

        await member.ban({
            deleteMessageDays: 1, //upto 7
            reason
        }).catch(console.error);

        await interaction.reply({
            content: `Banned ${user.tag} has been banned`
        });
    }
}