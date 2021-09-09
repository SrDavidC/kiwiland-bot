module.exports = async (client) =>{
    const guild = client.guilds.cache.get('783060970493837333');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('884526114465271858');
        channel.setName(`◜Members◝・${memberCount.toLocaleString()} ・`);
        console.log('Updating Member Count');
    }, 5000);
}
