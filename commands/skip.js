const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Çalan şarkıyı geçer ve bir sonrakine atlar.'),
	async execute(interaction) {
		const queue = useQueue(interaction.guild.id);

		if (!queue || !queue.isPlaying()) {
			return interaction.reply({ content: '❌ Şu anda çalan bir müzik yok.', ephemeral: true });
		}

		const currentTrack = queue.currentTrack;
		queue.node.skip();

		const embed = new EmbedBuilder()
			.setColor(0xFEE75C)
			.setTitle('⏭️ Şarkı Geçildi')
			.setDescription(`**${currentTrack.title}** geçildi.`)
			.setTimestamp();

		return interaction.reply({ embeds: [embed] });
	},
};
