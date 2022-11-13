
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        setInterval(client.pickPresence, 10 * 1000); //time changes every 10seconds
        console.log(`Ready!!! ${client.user.tag} is logged in`);

        // checkVideo
        setTimeout(client.checkVideo, 5 * 1000); //every 5sec
    }

}