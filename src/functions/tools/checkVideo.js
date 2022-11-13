const { EmbedBuilder } = require('discord.js');
const Parser = require('rss-parser');
const parser = new Parser();
const fs = require('fs');

module.exports = (client) => {
    client.checkVideo = async () => {
        const data = await parser.parseURL(`https://youtube.com/feeds/videos.xml?channel_id=UCdOJwFEb2442Ff5v8zvdXNQ`);

        const rawData = fs.readFileSync(`${__dirname}/../../json/video.json`);
        const jsonData = JSON.parse(rawData);
        
        //meaning their is a new video or data not sent
        if (jsonData.id !== data.items[0].id) {
            fs.writeFileSync(`${__dirname}/../../json/video.json`, JSON.stringify({ id: data.items[0].id }));

            const guild = await client.guilds.fetch("1040094867730210876").catch(console.error);
            const channel = await guild.channels.fetch("1041225982402641950").catch(console.error);

            //get some details from the actual video
            const { title, link, id, author } = data.items[0];
            const embed = new EmbedBuilder({
                title,
                url: link,
                timestamp: Date.now(),
                image: {
                    url: `https://img.youtube.com/v1/${id.slice(9)}/maxresdefault.jpg`
                },
                author: {
                    name: author,
                    iconURL: `https://yt3.ggpht.com/yti/AJo0G0nEjcSO0mFT0yI-AVZvNfLrC96RS_nHKeWvOChFxQ=s108-c-k-c0x00ffffff-no-rj`,
                    url: `https://youtube.com/folusoolaniyan/?sub_confirmation=1`
                },
                footer: {
                    text: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                }
            });

            console.log(`Embed Channel sends video: ${id}`);
            if (!channel) console.log("could not find channel");
            await channel.send({ 
                embeds: [embed], 
                content: `Hey @everyone check out my new video`
            }).catch(console.error)
        } 
    }
}