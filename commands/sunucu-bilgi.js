const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sunucu-bilgi')
		.setDescription('Sunucu hakkında genel bilgileri gösterir.'),
	async execute(interaction) {
		const { guild } = interaction;

		const embed = new EmbedBuilder()
			.setColor(0x5865F2)
			.setTitle(`${guild.name} - Sunucu Bilgisi`)
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.addFields(
				{ name: 'Sunucu Sahibi', value: `<@${guild.ownerId}>`, inline: true },
				{ name: 'Toplam Üye', value: `${guild.memberCount}`, inline: true },
				{ name: 'Kanal Sayısı', value: `${guild.channels.cache.size}`, inline: true },
				{ name: 'Rol Sayısı', value: `${guild.roles.cache.size}`, inline: true },
				{ name: 'Oluşturulma Tarihi', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: false }
			)
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
