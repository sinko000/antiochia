const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sil')
		.setDescription('Belirtilen miktarda mesajı kanaldan siler.')
		.addIntegerOption(option =>
			option.setName('miktar')
				.setDescription('Silinecek mesaj sayısı (1-100)')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(100))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
		const miktar = interaction.options.getInteger('miktar');

		await interaction.channel.bulkDelete(miktar, true).catch(err => {
			console.error(err);
			return interaction.reply({ content: 'Mesajlar silinirken bir hata oluştu (14 günden eski mesajlar silinemez).', ephemeral: true });
		});

		return interaction.reply({ content: `Başarıyla **${miktar}** adet mesaj silindi!`, ephemeral: true });
	},
};
