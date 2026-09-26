const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Belirtilen kullanıcıyı sunucudan atar.')
		.addUserOption(option =>
			option.setName('kullanici')
				.setDescription('Atılacak kullanıcı')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('sebep')
				.setDescription('Atılma sebebi'))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(interaction) {
		const member = interaction.options.getMember('kullanici');
		const sebep = interaction.options.getString('sebep') || 'Sebep belirtilmedi.';

		if (!member) {
			return interaction.reply({ content: 'Kullanıcı bu sunucuda bulunamadı.', ephemeral: true });
		}

		if (!member.kickable) {
			return interaction.reply({ content: 'Bu kullanıcıyı atma yetkim yok.', ephemeral: true });
		}

		await member.kick(sebep);
		return interaction.reply({ content: `**${member.user.tag}** sunucudan atıldı. Sebep: ${sebep}` });
	},
};
