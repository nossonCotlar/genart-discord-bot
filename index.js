import dotenv from 'dotenv'
dotenv.config()

import { Client, GatewayIntentBits } from 'discord.js'
import './commands.js';
import { commandHandler, defaultHandler } from './handlers.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.login(process.env.DISCORD_TOKEN);

client.on('ready', _ => console.log(`Client ready - Logged in as ${client.user.tag}`));

client.on('interactionCreate', commandHandler);