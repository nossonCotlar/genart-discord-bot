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

    ctx.fillStyle = 'pink';
    funcArray[0](ctx, Math.random());
}

function putLines(ctx, seed){
    ctx.lineWidth= map(Math.random(), 0, 1, 2, 7);
    
    let amt = map(Math.random(), 0, 1, 1, 30);
    let hueStart = Math.random() * 360;
    let hueStop = Math.random() * 360;
    let hue = hueStart;
    let hueInc = (hueStop - hueStart) / amt;
    console.log(hueInc);
    
    for(let i = 0; i < amt; i++){
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 100)`;
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
        

        ctx.stroke();
    }
    
    
}

function putOvals(ctx, seed){

}

function map(value, start1, stop1, start2, stop2){
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}
