#!/usr/bin/env nodejs

require('dotenv').config();
const Discord = require('discord.js');
const seedrandom = require('seedrandom');
//const p5 = require('p5');

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const client = new Discord.Client();
const funcArray = [
    putLines, 
    putOvals, 
    putText
];
const fontArray = [
    'Arial', 
    'Times', 
    'Courier', 
    'Palatino', 
    'Garamond', 
    'Bookman', 
    'Avant Garde'
];
let words = fs.readFileSync('bank.txt', 'utf8').split('\n');

client.once('ready', () => {
    console.log('LETS FUCKING GOOOOOOO');
    client.user.setPresence({ activity: { name: 'with random numbers' }, status: 'active' });
});

client.login(process.env.TOKEN);
//client.setActivity("testing"); 

client.on('message', message => {
    
    if(message.content.startsWith("-genart ")){
        let seed = message.content.substring(8);
        seedrandom(seed, { global: true });
        genArt(message, seed);
    }
});

function genArt(message, seed){
    let canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    funcArray[2](canvas, ctx);
    funcArray[0](canvas, ctx);
    
    let out = fs.createWriteStream(`./art/${seed}.png`);
    let stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => sendArt(message, 'Generated with seed: ' + seed, `./art/${seed}.png`));
}



function putLines(canvas, ctx){
    ctx.lineWidth = map(Math.random(), 0, 1, 2, 7);
    
    let amt = map(Math.random(), 0, 1, 1, 30);
    let hueStart = Math.random() * 360;
    let hueStop = Math.random() * 360;
    let hue = hueStart;
    let hueInc = (hueStop - hueStart) / amt;
    console.log(hueInc);
    
    for(let i = 0; i < amt; i++){
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 100)`;
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, 100)`;
        hue += hueInc;

        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        let lineType = Math.floor(Math.random() * 4);
        switch(lineType){
            case 1:
                ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height); 
                break;
            case 2:
                ctx.bezierCurveTo(Math.random() * canvas.width, 
                Math.random() * canvas.height, 
                Math.random() * canvas.width, 
                Math.random() * canvas.height, 
                Math.random() * canvas.width, 
                Math.random() * canvas.height);
                break;
            case 3:
                ctx.quadraticCurveTo(Math.random() * canvas.width, 
                Math.random() * canvas.height, 
                Math.random() * canvas.width, 
                Math.random() * canvas.height);
                break;
            case 4:
                ctx.arcTo(Math.random() * canvas.width, 
                Math.random() * canvas.height, 
                Math.random() * canvas.width, 
                Math.random() * canvas.height, 
                Math.random() * 100);
                break;
        }
        
        if(Math.random() > 0.8) ctx.fill();
        else ctx.stroke();
    }
}

function putOvals(ctx, seed){

}

function putText(canvas, ctx){
    ctx.font = `${Math.floor(Math.random() * 300 + 100)}px ${fontArray[Math.floor(Math.random() * fontArray.length)]}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = `hsla(${Math.random() * 360}, 100%, 50%, 100)`;
    ctx.fillText(words[Math.floor(Math.random() * words.length)], Math.random() * canvas.width, Math.random() * canvas.height);
}

function map(value, start1, stop1, start2, stop2){
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function sendArt(message, caption, path){
    message.channel.send(caption, {files: [path]});
}
