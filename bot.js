require('dotenv').config();
const Discord = require('discord.js');
const gen = require('random-seed');
//const p5 = require('p5');

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');



const client = new Discord.Client();
const taunts = [
    'shut the fuck up dude', 
    'yeah nobody cares', 
    'bitch please', 
    'i don\'t remember askin', 
    'stay quiet retard', 
    'just shut the fuck up'
];

client.once('ready', () => {
    console.log('Ready!');
    client.user.setPresence({ activity: { name: 'with jqfdw\'s testicles' }, status: 'active' });
});

client.login(process.env.TOKEN);
//client.setActivity("testing"); 

client.on('message', message => {
    if(message.content.startsWith("-rood ")){
        genArt(message, message.content.substring(6));

    }
	else if(message.member.user.username == 'jqfdw' || message.member.id == '428285732071800843'){
        let shoe = "";
        let tauntLength = Math.min(Math.floor(Math.random() * 10) + 8, message.content.length);
        let tauntIndex = Math.floor(Math.random() * taunts.length);
        for(let i = 0; i < tauntLength; i++){
            let c = message.content.charAt(i);
            if(i % 2 == 0) c = c.toUpperCase();
            else c = c.toLowerCase();
            shoe += c;
        }
        message.channel.send(shoe + ' - ' + taunts[tauntIndex]);
    }
});

function genArt(message, seed){
    let rand = gen.create(seed);
    let amt = rand(40) + 10;

    let canvas = createCanvas(200, 200);
    let ctx = canvas.getContext('2d');
    let w = canvas.width, h = canvas.height;

    
    ctx.lineWidth = 1;
    
    for(let i = 0; i < amt; i++){
        let x = rand(w);
        let y = rand(h);

        ctx.strokeStyle = "rgb(" + 
        Math.floor(map(i, 0, amt, rand(255), rand(255))) + ", " + 
        Math.floor(map(i, 0, amt, rand(255), rand(255))) + ", " + 
        Math.floor(map(i, 0, amt, rand(255), rand(255)))+ ")";
        
        
        let num = rand(10);
        for(let j = 0; j < num; j++){

            
            ctx.beginPath();
            ctx.moveTo(rand(w), rand(h));
            ctx.lineTo(rand(w), rand(h));
            //ctx.bezierCurveTo(rand(w), rand(h));
            ctx.stroke();
        }
        

        

        //console.log(rand(10));
    }


    let out = fs.createWriteStream('./art.png');
    let stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => sendArt(message, 'Generated with seed: ' + seed, './art.png'));
}

function sendArt(message, caption, path){
    message.channel.send(caption, {files: [path]});
}

function map(value, istart, istop, ostart, ostop){
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}