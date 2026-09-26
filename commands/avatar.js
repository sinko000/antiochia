const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Bir kullanıcının profil fotoğrafını büyük boyutta görüntüler.')
		.addUserOption(option =>
			option.setName('kullanici')
				.setDescription('Avatarı görüntülenecek kişi')),
	async execute(interaction) {
		const user = interaction.options.getUser('kullanici') || interaction.user;
		const avatarUrl = user.displayAvatarURL({ size: 1024, dynamic: true });

		const embed = new EmbedBuilder()
			.setColor(0x5865F2)
			.setTitle(`🖼️ ${user.username} Profil Fotoğrafı`)
			.setImage(avatarUrl)
			.setFooter({ text: `İsteyen: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
			.setTimestamp();

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setLabel('Görseli Aç / İndir')
				.setStyle(ButtonStyle.Link)
				.setURL(avatarUrl)
		);

		await interaction.reply({ embeds: [embed], components: [row] });
	},
};
