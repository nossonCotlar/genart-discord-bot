#!/usr/bin/env node

require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const https = require('https');
const client = new Discord.Client();
const qs = require('qs');


client.once('ready', () => {
    console.log('LETS FUCKING GOOOOOOO');
    client.user.setPresence({ activity: { name: 'with random numbers' }, status: 'active' });
});

client.login(process.env.TOKEN);

client.on('message', message => {
    let msgTokens = message.content.split(' ');
    if(msgTokens[0] != '-genart') return;

    let engine, seed;
    
    if(msgTokens[1] && msgTokens[1].startsWith('-')){
        engine = msgTokens[1].substring(1);
        if(msgTokens[2]) seed = msgTokens.slice(2).join(' ');
    } 
    else if(msgTokens[1]) seed = msgTokens.slice(1).join(' ');


    
    let qPath = qs.stringify({seed: seed, engine: engine, sync: true});
    console.log(qPath);

    let options = {
        hostname: process.env.GENART_ENDPOINT, 
        port: 443, 
        path: '/?' + qPath, 
        method: 'GET'
    };
    console.log(options);
    let req = https.request(options, (res) => {
        let body = '';
        res.on('data', (data) => {
            body += data;
        });
    
        res.on('end', _ => {
            if(res.statusCode != 200){
                message.channel.send("Yikes, didn't like that");
                return;
            } 
            let bodyObj = JSON.parse(body);
            //console.log(bodyObj);
            message.channel.send(`Generated with seed **${bodyObj.seed}** on engine **${bodyObj.engine}**`, {files: [bodyObj.link]});
        });
    }).end();

});

