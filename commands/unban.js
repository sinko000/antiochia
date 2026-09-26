const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Bir kullanıcının sunucu yasaklamasını kaldırır.')
		.addStringOption(option =>
			option.setName('id')
				.setDescription('Yasağı kaldırılacak kullanıcının ID adresi')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const userId = interaction.options.getString('id');

		try {
			await interaction.guild.members.unban(userId);

			const embed = new EmbedBuilder()
				.setColor(0x57F287)
				.setTitle('🔓 Yasak Kaldırıldı')
				.setDescription(`<@${userId}> (\`${userId}\`) id'li kullanıcının sunucu yasağı kaldırıldı.`)
				.setFooter({ text: `Yetkili: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
				.setTimestamp();

			return interaction.reply({ embeds: [embed] });
		} catch (error) {
			return interaction.reply({ content: '❌ Belirtilen ID adresine sahip yasaklı bir kullanıcı bulunamadı.', ephemeral: true });
		}
	},
};
