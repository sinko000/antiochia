const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const { Player } = require('discord-player');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// 1. Müzik Oynatıcısını Tanımla
const player = new Player(client);

client.commands = new Collection();

// 2. Komutları Yükle
const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }
    }
}

// 3. Etkinlikleri Yükle
const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath)) {
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
}

// 4. Ana Başlatıcı
async function init() {
    try {
        // Varsayılan ayıklayıcıları (Default Extractors) yükle
        await player.extractors.loadDefault();
        console.log('Müzik ayıklayıcıları başarıyla yüklendi.');

        // Slash Komutlarını Kaydet
        const config = require('./config.json');
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

        const commands = Array.from(client.commands.values()).map(c => c.data.toJSON());
        console.log('Slash komutları Discord API\'sine yükleniyor...');
        
        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commands }
        );
        console.log('Slash komutları başarıyla kaydedildi!');

        // Bota Giriş Yap
        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        console.error('Bot başlatılırken bir hata oluştu:', error);
    }
}

init();
