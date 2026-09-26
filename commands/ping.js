const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Botun çalışıp çalışmadığını kontrol eder ve gecikmeyi ölçer.'),
	async execute(interaction) {
		await interaction.reply(`Pong! Bot gecikmesi: ${interaction.client.ws.ping}ms`);
	},
};
