const canvas = document.getElementById('canvas');
const funcArray = [
    putLines, 
    putOvals
];

function generate(){
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    let seed = document.getElementById('seed').value;
    Math.seedrandom(seed);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch(Math.ceil(Math.random() * 4)){
        case 1:
            
    }


    ctx.fillStyle = 'pink';
    funcArray[0](ctx);
}

function putLines(ctx, width, height){
    
    let amt = map(Math.random(), 0, 1, 1, 30);
    let hueStart = Math.random() * 360;
    let hueStop = Math.random() * 360;
    let hue = hueStart;
    let hueInc = (hueStop - hueStart) / amt;
    console.log(hueInc);
    
    for(let i = 0; i < amt; i++){
        ctx.lineWidth = map(Math.random(), 0, 1, 2, 7);
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 100)`;
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, 100)`;
        hue += hueInc;

        ctx.moveTo(Math.random() * width, Math.random() * height);
        let lineType = Math.floor(Math.random() * 4);
        switch(lineType){
            case 1:
                ctx.lineTo(Math.random() * width, Math.random() * height); 
                break;
            case 2:
                ctx.bezierCurveTo(Math.random() * width, 
                Math.random() * height, 
                Math.random() * width, 
                Math.random() * height, 
                Math.random() * width, 
                Math.random() * height);
                break;
            case 3:
                ctx.quadraticCurveTo(Math.random() * width, 
                Math.random() * height, 
                Math.random() * width, 
                Math.random() * height);
                break;
            case 4:
                ctx.arcTo(Math.random() * width, 
                Math.random() * height, 
                Math.random() * width, 
                Math.random() * height, 
                Math.random() * 100);
                break;
        }
        
        if(Math.random() > 0.8) ctx.fill();
        else ctx.stroke();
    }
}

function putOvals(ctx, seed){

}

function map(value, start1, stop1, start2, stop2){
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}
