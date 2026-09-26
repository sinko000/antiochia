const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Bot başarıyla aktif oldu! Giriş yapılan hesap: ${client.user.tag}`);
	},
};
