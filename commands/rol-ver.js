const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rol-ver')
		.setDescription('Belirtilen kullanıcıya bir rol verir veya rolünü alır.')
		.addUserOption(option =>
			option.setName('kullanici')
				.setDescription('Rol verilecek kullanıcı')
				.setRequired(true))
		.addRoleOption(option =>
			option.setName('rol')
				.setDescription('Eklenecek rol')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
	async execute(interaction) {
		const member = interaction.options.getMember('kullanici');
		const role = interaction.options.getRole('rol');

		if (!member) {
			return interaction.reply({ content: '❌ Kullanıcı bulunamadı.', ephemeral: true });
		}

		if (member.roles.cache.has(role.id)) {
			await member.roles.remove(role);
			const embed = new EmbedBuilder()
				.setColor(0xED4245)
				.setTitle('🎭 Rol Çıkarıldı')
				.setDescription(`**${member.user.tag}** kullanıcısından ${role} rolü alındı.`)
				.setTimestamp();
			return interaction.reply({ embeds: [embed] });
		} else {
			await member.roles.add(role);
			const embed = new EmbedBuilder()
				.setColor(0x57F287)
				.setTitle('🎭 Rol Verildi')
				.setDescription(`**${member.user.tag}** kullanıcısına ${role} rolü eklendi.`)
				.setTimestamp();
			return interaction.reply({ embeds: [embed] });
		}
	},
};
