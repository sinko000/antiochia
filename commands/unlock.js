const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('Bulunduğunuz kanalın kilidini açar.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
	async execute(interaction) {
		await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
			SendMessages: true
		});

		const embed = new EmbedBuilder()
			.setColor(0x57F287)
			.setTitle('🔓 Kanal Kilidi Açıldı')
			.setDescription('Bu kanal tekrar mesaj gönderimine açılmıştır.')
			.setFooter({ text: `Kilit Açan: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
