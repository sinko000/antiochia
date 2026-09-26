const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yardim')
		.setDescription('Botun tüm komutlarını ve kullanım detaylarını gösterir.'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(0x2F3136)
			.setTitle('🤖 Bot Komut Menüsü')
			.setDescription('Aşağıda kullanabileceğiniz aktif Slash komutları listelenmiştir:')
			.addFields(
				{ name: '🛠️ Moderasyon Komutları', value: '`/sil` - Mesajları toplu siler.\n`/kick` - Kullanıcıyı sunucudan atar.\n`/ban` - Kullanıcıyı yasaklar.' },
				{ name: '📊 Bilgi Komutları', value: '`/ping` - Bot gecikmesini ölçer.\n`/kullanici-bilgi` - Profil bilgilerini gösterir.\n`/sunucu-bilgi` - Sunucu detaylarını gösterir.' },
				{ name: '❓ Yardım', value: '`/yardim` - Bu menüyü gösterir.' }
			)
			.setFooter({ text: `${interaction.client.user.username} Yardım Sistemi` })
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
