let cvs=document.getElementById('canvas')
let ctx=cvs.getContext('2d')

let bird=new Image()
let background=new Image()
let foreground=new Image()
let upperPipe=new Image()
let bottomPipe=new Image()

bird.src='./img/bird.png'
background.src='./img/bg.png'
foreground.src='./img/fg.png'
upperPipe.src='./img/pipeNorth.png'
bottomPipe.src='./img/pipeSouth.png'

let fly=new Audio()
let scoreAudio=new Audio()

fly.src='./audio/sounds_fly.mp3'
scoreAudio.src='./audio/sounds_score.mp3'

let gap=90
let xPos=10
let yPos=150
let gravity=1.5
let willAnimate=true

document.addEventListener('keydown', moveUp)

function moveUp(){
    yPos=yPos-30
}

function stop(){
    willAnimate=false
}

function reset(){
    pipes=[]
    pipes[0]={
        x: cvs.width,
        y: 0
    }
    xPos=10
    yPos=150
}

let pipes=[]
pipes[0]={
    x: cvs.width,
    y: 0
}

function draw(){
    ctx.drawImage(background, 0, 0)
    
    for(i=0;i<pipes.length;i++){
        ctx.drawImage(upperPipe, pipes[i].x, pipes[i].y)
        ctx.drawImage(bottomPipe, pipes[i].x, pipes[i].y+upperPipe.height+gap)
        pipes[i].x--
        if(pipes[i].x==125){
            pipes.push({
                x: cvs.width,
                y: Math.floor(Math.random()*upperPipe.height)-upperPipe.height
            })
        }
        if(xPos+bird.width>=pipes[i].x
            && xPos<=pipes[i].x+upperPipe.width
            &&(yPos<=pipes[i].y+upperPipe.height
                || yPos+bird.height>=pipes[i].y+upperPipe.height+gap)){
                    stop()
                    alert('Game over')
                }
    }
    ctx.drawImage(foreground, 0, 0+background.height-foreground.height)
    ctx.drawImage(bird, xPos, yPos)

    yPos=yPos+gravity

    if(willAnimate){
        requestAnimationFrame(draw)
    } else {
        // reset()
        location.reload()
    }
}
// bottomPipe.onload=draw()

let start=document.getElementById('start')
let bot=document.getElementById('bot')

start.onclick=draw


