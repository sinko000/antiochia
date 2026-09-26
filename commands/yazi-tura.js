const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yazi-tura')
		.setDescription('Sanal olarak yazı-tura atar.'),
	async execute(interaction) {
		const sonuclar = ['Yazı 🪙', 'Tura 🪙'];
		const kazanan = sonuclar[Math.floor(Math.random() * sonuclar.length)];

		const embed = new EmbedBuilder()
			.setColor(0xFEE75C)
			.setTitle('🪙 Yazı-Tura Atıldı!')
			.setDescription(`Para havaya atıldı ve... **${kazanan}** geldi!`)
			.setFooter({ text: `${interaction.user.username} tarafından atıldı`, iconURL: interaction.user.displayAvatarURL() })
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
