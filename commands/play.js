const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('İstenen şarkıyı veya playlist\'i sesli kanalda çalar.')
		.addStringOption(option =>
			option.setName('sarki')
				.setDescription('Şarkı adı veya YouTube URL adresi')
				.setRequired(true)),
	async execute(interaction) {
		const player = useMainPlayer();
		const channel = interaction.member.voice.channel;

		if (!channel) {
			return interaction.reply({ content: '❌ Müzik çalmak için önce bir ses kanalına girmelisiniz!', ephemeral: true });
		}

		await interaction.deferReply();

		const query = interaction.options.getString('sarki');
		
		try {
			const searchResult = await player.search(query, {
				requestedBy: interaction.user
			});

			if (!searchResult || !searchResult.tracks.length) {
				return interaction.followUp('❌ Arama sonucu bulunamadı!');
			}

			const { queue } = await player.play(channel, searchResult, {
				nodeOptions: {
					metadata: interaction.channel
				}
			});

			const track = searchResult.tracks[0];

			const embed = new EmbedBuilder()
				.setColor(0x57F287)
				.setTitle('🎵 Müzik Listeye Eklendi')
				.setDescription(`[**${track.title}**](${track.url})`)
				.setThumbnail(track.thumbnail)
				.addFields(
					{ name: '⏱️ Süre', value: track.duration, inline: true },
					{ name: '👤 Ekleyen', value: `${interaction.user.username}`, inline: true }
				)
				.setTimestamp();

			return interaction.followUp({ embeds: [embed] });
		} catch (error) {
			console.error(error);
			return interaction.followUp('⚠️ Şarkı çalınırken bir hata oluştu.');
		}
	},
};
