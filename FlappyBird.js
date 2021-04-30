var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");



//load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bg.src = "Images/bg.png";//nền
bird.src = "Images/bird.png";
fg.src = "Images/fg.png";
pipeNorth.src = "Images/pipeNorth.png";//ống nằm trên
pipeSouth.src = "Images/pipeSouth.png";//ống nằm dưới

//pipe coordinates

var pipe = [];

pipe[0] = {
    x: cvs.width,
    y : 0
};

//some variables
var gap = 335;
var constant = pipeNorth.height + gap;

var bX = 10;
var bY = 150;

var gravity = 1.5;
var score = 0;

//audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "Sounds/fly.mp3";
scor.src = "Sounds/score.mp3"

//on key down

document.addEventListener("keydown",moveUp);
function moveUp(){
    //độ cao tăng mỗi lần nhấn nút
    bY -= 30;
    fly.play();
}

// draw images

function draw(){
    ctx.drawImage(bg,0,0);

    for(var i =0; i<pipe.length; i++){

        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y + constant);

        pipe[i].x--;

        //tạo ra loạt các chướng ngại vật
        if(pipe[i].x == 100){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*pipeNorth.height)- pipeNorth.height
            });
        }

        // phân biệt va chạm
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width 
            && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant)
            || bY + bird.height >= cvs.height - fg.height ){
                location.reload();
            }
        if(pipe[i].x == 5){
            score ++;
            scor.play();
        }
    }
    

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bX,bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

draw()