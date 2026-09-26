const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kullanici-bilgi')
		.setDescription('Bir kullanıcının profil bilgilerini gösterir.')
		.addUserOption(option =>
			option.setName('kullanici')
				.setDescription('Bilgisine bakılacak kullanıcı')),
	async execute(interaction) {
		const user = interaction.options.getUser('kullanici') || interaction.user;
		const member = await interaction.guild.members.fetch(user.id);

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(`${user.username} - Kullanıcı Bilgisi`)
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.addFields(
				{ name: 'Kullanıcı Adı', value: user.tag, inline: true },
				{ name: 'ID', value: user.id, inline: true },
				{ name: 'Hesap Oluşturma Tarihi', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: false },
				{ name: 'Sunucuya Katılma Tarihi', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: false },
				{ name: 'Roller', value: member.roles.cache.map(r => r).join(' ') || 'Rol yok', inline: false }
			)
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
