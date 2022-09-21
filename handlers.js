import { EmbedBuilder } from "discord.js";
import axios from "axios";
const { GENART_ENDPOINT } = process.env;

const defaultHandler = async message => {
    console.log(JSON.stringify(message, null, 4));
    if(!message?.author.bot){
        message.channel.send(message.content.repeat(20))
    }
}

const commandHandler = async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'genart') {
        const requestedSeed = interaction.options.get('seed')?.value;
        const requestedEngine = interaction.options.get('engine')?.value;
        const embed = await defaultGenartHandler(requestedSeed, requestedEngine);
        await interaction.reply({embeds: [embed]});
    }
}

const defaultGenartHandler = async (reqSeed, reqEngine) => {
    const params = {sync: 'true'}
    if(reqSeed) params.seed = reqSeed;
    if(reqEngine) params.engine = reqEngine;
    console.log(JSON.stringify(params))

    let rData;
    try{
        const r = await axios.get(GENART_ENDPOINT, {params});
        rData = r.data;
    } catch (err) {
        console.log('Something went wrong', JSON.stringify(err));
    }

    if(rData == undefined){
        return new EmbedBuilder()
        .setColor(0xFF69B4)
        .setAuthor({name: 'Genart', iconURL: 'https://storage.googleapis.com/genart-static/logo.png'})
        .setURL('https://webapp.genart.rood.systems')
        .setDescription('Something broke. It\'s probably your fault.')
    }

    const {seed, engine, link} = rData;

    const embed = new EmbedBuilder()
        .setColor(0xFF69B4)
        // .setTitle('Genart')
        .setAuthor({name: 'Genart', iconURL: 'https://storage.googleapis.com/genart-static/logo.png'})
        .addFields(
            {name: 'Seed', value: seed, inline: true},
            {name: 'Engine', value: engine, inline: true}
        )
        .setURL('https://webapp.genart.rood.systems')
        .setImage(link)
     return embed;
}



export { defaultHandler, commandHandler }