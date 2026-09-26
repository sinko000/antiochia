const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor'); // <-- Bu satırı ekledik
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const player = new Player(client);
client.commands = new Collection();

// ... (Komutlar ve Etkinlikler yükleme kısımları aynı kalıyor) ...

async function init() {
    try {
        // Extractor'ları DefaultExtractors ile güvenli şekilde yüklüyoruz:
        await player.extractors.loadMulti(DefaultExtractors);
        console.log('Müzik ayıklayıcıları (YouTube/SoundCloud) başarıyla yüklendi.');

        const config = require('./config.json');
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

        const commands = Array.from(client.commands.values()).map(c => c.data.toJSON());
        console.log('Slash komutları Discord API\'sine aktarılıyor...');
        
        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commands }
        );
        console.log('Slash komutları başarıyla kaydedildi!');

        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        console.error('Bot başlatılırken bir hata oluştu:', error);
    }
}

init();
