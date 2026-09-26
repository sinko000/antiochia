const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const { Player } = require('discord.js-player');
require('dotenv').config();

// Ses kanalı yetkilerini (GuildVoiceStates) intent'lere ekledik:
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Player örneği oluşturuyoruz
const player = new Player(client);

// YouTube / SoundCloud vb. kaynak ayıklayıcıları yüklüyoruz
player.extractors.loadDefault();

client.commands = new Collection();

// 1. Komutları Yükle
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
}

// 2. Event'leri Yükle
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// 3. Slash Komutlarını Otomatik Kaydet
const config = require('./config.json');
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        const commands = Array.from(client.commands.values()).map(c => c.data.toJSON());
        console.log('Slash komutları otomatik olarak Discord API\'sine yükleniyor...');
        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commands }
        );
        console.log('Slash komutları başarıyla kaydedildi!');
    } catch (error) {
        console.error('Komutlar yüklenirken hata oluştu:', error);
    }
})();

client.login(process.env.DISCORD_TOKEN);
