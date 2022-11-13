const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('permission')
    .setDescription('This command requires a permission')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const { roles } = interaction.member;
        // get admin id from server settings
        const role = await interaction.guild.roles.fetch(`1040856331285958656`)
        .catch(err => console.error(err));

        const testRole = await interaction.guild.roles.create({
            name: 'Test',
            permissions: [PermissionsBitField.Flags.KickMembers]
        })
        .catch(console.error);

        //for checking if someone have a role
        if (roles.cache.has(`1040856331285958656`)) {
            await interaction.deferReply({
                fetchReply: true
            });

            await roles.remove(role).catch(console.error);
            await interaction.editReply({
                content: `Removed: ${role.name} role from you`
            });
        }
        else {
            await interaction.reply({
                content: `You do not have the ${role.name} role`
            });
        }

        await roles.add(testRole).catch(console.error);

        await testRole.setPermissions([PermissionsBitField.Flags.BanMembers]).catch(console.error);

        const channel = await interaction.guild.channels.create({
            name: 'Test',
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: testRole.id,
                    allow: [PermissionsBitField.Flags.ViewChannel]
                }
            ]
        });

        await channel.permissionOverwrites.edit(testRole.id, { SendMessages: false}).catch(console.error);
    }
}