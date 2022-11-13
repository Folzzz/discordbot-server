const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync('./src/commands');

        for (const folder of commandFolders) {

            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} has been registered and pass thru the handler`);
            }
        }

        // bot id
        const clientId = '1039975609784348783';
        // to make bot work only in your server - server id
        const guildId = '1040094867730210876';
        const rest = new REST({version: '9'}).setToken(process.env.DISCORDJS_BOT_TOKEN);
        // to register commands that we put
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: client.commandArray
            });

            console.log("Successfully reloaded application (/) commands...");
        }
        catch (error) {
            console.error(error);
        }
    }
}