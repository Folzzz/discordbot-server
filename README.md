<!-- CREATING A DISCORD BOT -->

//initialize npm - 'npm init -y'

// install discordhs library- 'npm install discord.js
// install dotenv (enables us to use environment variables to store apikeys, tokens)- '
// install discord-api-types, @discordjs/rest, chalk@4.1.2

<!-- project structure -->
//create a folder src (will be the main entry to our project)
//create a file bot.js
// CREATE A .ENV FILE TO SAVE DISCORD TOKEN - you get token from dicord.com/developers/applications, create a bot and generate token
//create a server on discord and authorize bot on the server - https://discord.com/api/oauth2/authorize?client_id={client_id}&scope=bot

<!-- use js code to make bot online -->
//bot has been added but it offline
//get client instance from discord.js and create an instance of the class
// use the login method on the instance to create a connection to the discord gateway - ' client.login(token) '

<!-- basic events -->

<!-- ready events -->
// triggered when the bot is logged in - 'client.on('ready', () =>{})

<!-- message events -->
//message event setup basic responses - '  '

<!-- bot responses -->
// src/commands/tools
//  ping.js - ping builder
// embed.js - embed builder
// button.js - button builder

// button builder
// src/components/buttons/sub_yt.js
// setup a button handler - ha

// make select menu using select menu builders

// modal builder
1). create a new collection in bot.js
2). handle modals in handleComponent.js
3). create modal interaction in interactionCreate.js
4). create customid (fav-color.js) in Modals folder
5). create a command modal.js in ../commands/tools

// context menu builder - eg rightclick on a user and get avatar, and this will run the getAvatar command
1). edit events/client/interactionCreate.js file
2). add a new else if to handle the interaction - interaction.isContextMenuCommand()
3). make a new getAvatar.js command in ../commands/tools

// create reaction - sending emojis on responses
commands/tools/reactor.js

//permission guide - users can only use a command when they have the permission
1). create admin role and get admin id from server settings
2). file - commands/tools/permission.js

// autocomplete guide - 
1). edit events/client/interactionCreate.js file 
2). create autocomplete.js in commands/tools

// mongodb guide - get mongodb configured to your bot
1). create a database on mongodb and copy connection string - mongodb+srv://discordbot:<password>@datacluster.3u8z95e.mongodb.net/?retryWrites=true&w=majority
2). using vscode mongodb extension create a connection
3). make a subfolder in events folder called mongo and then pass some events
4). create 4 files in mongo folder, connected.js, disconnected.js, err.js, connecting.js
5). create handler for mongo folder in handleEvent.js
6). create new folder in the src folder called schemas - an outline of how the store doc will look like
7). create a guild file in the schema
8). create database.js in commands/tools - to store the information we have for the server

// moderation command guide - 
1). create a moderation subfolder in /src/command
2). create a kick.js, ban.js, timeout.js file in the subfolder

// presence guide - allows user to change bot activities and status (idle, dnd, online)
1). we will be working on the ready(.js) event
2). create a new folder 'tools' in the src/functions folder
3). create a file pickPresence.js

// youtube notification guide  -to announce new uploads on a youtube channel
1). install a package - npm i rss-parser
2). go to your youtube channel and get the channel id (UCdOJwFEb2442Ff5v8zvdXNQ) and make it into an actual link - https://youtube.com/feeds/videos.xml?channel_id=UCdOJwFEb2442Ff5v8zvdXNQ
3). make a new function checkVideo.js within the src/functions/tools folder
4). make a json folder in src to store video id and create a new file 'video.json'
5) handle checkVideo in ready(.js) event handler
6) create a video channel in your discord server and copy the channel id '1041225982402641950'
7). make an embed and send it to the video channel