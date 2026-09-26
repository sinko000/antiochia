const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Belirtilen kullanıcıyı sunucudan yasaklar.')
		.addUserOption(option =>
			option.setName('kullanici')
				.setDescription('Yasaklanacak kullanıcı')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('sebep')
				.setDescription('Yasaklanma sebebi'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const user = interaction.options.getUser('kullanici');
		const sebep = interaction.options.getString('sebep') || 'Sebep belirtilmedi.';

		await interaction.guild.members.ban(user, { reason: sebep }).catch(err => {
			console.error(err);
			return interaction.reply({ content: 'Bu kullanıcı yasaklanırken bir hata oluştu.', ephemeral: true });
		});

		return interaction.reply({ content: `**${user.tag}** sunucudan yasaklandı. Sebep: ${sebep}` });
	},
};
