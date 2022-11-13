const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reactor')
    .setDescription('Returns reactions'),
    async execute(interaction, client) {
        const message = await interaction.reply({
            content: `React Here!`,
            fetchReply: true
        });

        // custom emoji
        // const emoji = client.guild.emojis.cache.find(emoji => emoji.id = '1000793300103606343');
        // message.react(emoji);

        // custom emoji from one server to be usable in multiple server
        // const emoji1 = client.emojis.cache.find(emoji => emoji.id == '1000793300103606343');
        // message.react(emoji1);
        

        // emoji
        // message.react('❤️')
        // // reaction collector - if conditions are met pass to collector
        // const filter = (reaction, user) => {
        //     return reaction.emoji.name == '❤️' && user.id == interaction.user.id
        // };
        // const collector = message.createReactionCollector({
        //     filter,
        //     time: 15000
        // });
        
        // collector.on('collect', (reaction, user) => {
        //     console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        // });

        // collector.on('end', collected => {
        //     console.log(`Collected ${collected.size} items`);
        // });

        // using awaitReactionanother way to do the emoji reactor without using collector
        const filter = (reaction, user) => {
            return reaction.emoji.name == '❤️' && user.id == interaction.user.id
        };
        message
            .awaitReactions({ filter, max: 4, time: 10000, errors: ["time"] })
            .then((collected) => console.log(collected.size))
            .catch((collected) => {
                console.log(`After ten seconds, only ${collected.size} out of 4 reacted`);
            });
    }
}