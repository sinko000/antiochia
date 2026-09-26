const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('Kullanıcının susturma (timeout) cezasını kaldırır.')
		.addUserOption(option =>
			option.setName('kullanici')
				.setDescription('Susturması kaldırılacak kullanıcı')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	async execute(interaction) {
		const member = interaction.options.getMember('kullanici');

		if (!member) {
			return interaction.reply({ content: '❌ Kullanıcı bulunamadı.', ephemeral: true });
		}

		if (!member.isCommunicationDisabled()) {
			return interaction.reply({ content: '❌ Bu kullanıcı zaten susturulmamış.', ephemeral: true });
		}

		await member.timeout(null);

		const embed = new EmbedBuilder()
			.setColor(0x57F287)
			.setTitle('🔊 Susturma Kaldırıldı')
			.setDescription(`**${member.user.tag}** kullanıcısının susturma cezası kaldırıldı.`)
			.setFooter({ text: `Yetkili: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
			.setTimestamp();

		return interaction.reply({ embeds: [embed] });
	},
};
