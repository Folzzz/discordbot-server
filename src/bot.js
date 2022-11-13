require('dotenv').config();
const mongoose = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

// const { Guilds, GuildMessages, } = GatewayIntentBits;

// create an instance of the client class - 32767 accepts all intents
const client = new Client({ intents: 32767 });

// new collection
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];
// client.colour = 0x18e1ee;

// function folders - get js files and pass client to each file
const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {

    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

// interaction event
// client.on('interactionCreate', async (interaction) => {
//     if (interaction.commandName === 'hello') {
//         await interaction.reply('hi, how are you');
//     }
// })

// call events
client.handleEvents();
client.handleCommands();
client.handleComponents();

// make bot online
client.login(process.env.DISCORDJS_BOT_TOKEN);

//connect mongoose to db and execute func
(async () => {
    await mongoose.connect(process.env.databaseToken).catch(console.error);
})();