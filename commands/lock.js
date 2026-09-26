const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lock')
		.setDescription('Bulunduğunuz kanalı mesaj gönderimine kilitler.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
	async execute(interaction) {
		await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
			SendMessages: false
		});

		const embed = new EmbedBuilder()
			.setColor(0xED4245)
			.setTitle('🔒 Kanal Kilitlendi')
			.setDescription('Bu kanal yetkililer tarafından mesaj gönderimine kapatılmıştır.')
			.setFooter({ text: `Kilitleyen: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
