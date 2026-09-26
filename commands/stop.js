const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Müziği durdurur ve kanaldan ayrılır.'),
	async execute(interaction) {
		const queue = useQueue(interaction.guild.id);

		if (!queue || !queue.isPlaying()) {
			return interaction.reply({ content: '❌ Şu anda çalan bir müzik yok.', ephemeral: true });
		}

		queue.delete();

		const embed = new EmbedBuilder()
			.setColor(0xED4245)
			.setTitle('⏹️ Müzik Durduruldu')
			.setDescription('Çalma listesi temizlendi ve bot ses kanalından ayrıldı.')
			.setTimestamp();

		return interaction.reply({ embeds: [embed] });
	},
};
