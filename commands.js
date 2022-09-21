import dotenv from 'dotenv'
dotenv.config()
import { REST, Routes, SlashCommandBuilder } from 'discord.js'

const commands = [
    {
        name: 'genart',
        description: 'Responds with generative art, processed in real-time.'
    }
];

const genartCommand = new SlashCommandBuilder()
    .setName('genart')
    .setDescription('Responds with generative art, processed in real-time.')
    .addStringOption(option => option.setName('seed')
                    .setDescription('Text used to generate your art')
                    .setRequired(false)
                    )
    .addStringOption(option => option.setName('engine')
                    .setDescription('The method and style used to generate your art')
                    .setRequired(false)
                    .addChoices({name: 'Alpha', value: 'alpha'}, {name: 'Beta', value: 'beta'}, {name: 'Gamma', value: 'gamma'})
                    )

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), { body: [genartCommand] });

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
})();