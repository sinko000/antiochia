const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('oylama')
		.setDescription('Seçenekli gelişmiş oylama başlatır.')
		.addStringOption(option =>
			option.setName('konu')
				.setDescription('Oylama konusu')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('secenek1')
				.setDescription('1. Seçenek')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('secenek2')
				.setDescription('2. Seçenek')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('secenek3')
				.setDescription('3. Seçenek (İsteğe bağlı)'))
		.addStringOption(option =>
			option.setName('secenek4')
				.setDescription('4. Seçenek (İsteğe bağlı)'))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
		const konu = interaction.options.getString('konu');
		const sec1 = interaction.options.getString('secenek1');
		const sec2 = interaction.options.getString('secenek2');
		const sec3 = interaction.options.getString('secenek3');
		const sec4 = interaction.options.getString('secenek4');

		let aciklama = `**${konu}**\n\n1️⃣ ${sec1}\n2️⃣ ${sec2}`;
		if (sec3) aciklama += `\n3️⃣ ${sec3}`;
		if (sec4) aciklama += `\n4️⃣ ${sec4}`;

		const embed = new EmbedBuilder()
			.setColor(0x5865F2)
			.setTitle('🗳️ RESMİ OYLAMA')
			.setDescription(aciklama)
			.setFooter({ text: `Oylamayı Başlatan: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
			.setTimestamp();

		const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
		
		await msg.react('1️⃣');
		await msg.react('2️⃣');
		if (sec3) await msg.react('3️⃣');
		if (sec4) await msg.react('4️⃣');
	},
};
