const buttonColors = ["red","green","blue","yellow"];


let gamePattern = [];//system gen colour
let userClickPattern = [];

let started = false;
let level = 0;

document.addEventListener("keypress",()=>{
    if(!started){
        document.getElementById('level-title').innerHTML = `Level ${level}`;
        started = true;
        nextSequence();
    }
});

document.querySelectorAll('.btn').forEach((item)=>{
    item.addEventListener('click',(event)=>{
        let clickColor = event.target.id;
        console.log(clickColor);
        userClickPattern.push(clickColor);
        clickStlye(clickColor);
        playAudio(clickColor);
        checkAnswer(userClickPattern.length - 1);
    });
})

function checkAnswer(len){
    if(gamePattern[len] === userClickPattern[len]){
        if(gamePattern.length === userClickPattern.length){
            setTimeout(()=>{
                nextSequence();
            },2000);
        }
    }
    else{
        playAudio("wrong");
        errorStyle();
        document.getElementById('level-title').innerHTML = 'Game Over!!!!   Press Any Key to Restart';
        statOver();
    }
}

function fadeIn(time,id){
    let fade = document.getElementById(id);
    setTimeout(()=>{
        fade.style.opacity = 0.1;
    },time)
}

function fadeOut(time,id){
    let fade = document.getElementById(id);
    setTimeout(()=>{
        fade.style.opacity = 1;
    },time)
}

function nextSequence(){
    userClickPattern = [];
    level++;
    document.getElementById('level-title').innerHTML = `Level ${level}`;
    let randomNo = Math.floor((Math.random())*4);
    let randColor = buttonColors[randomNo];
    gamePattern.push(randColor)
    playAudio(randColor);
    fadeIn(100,randColor);
    fadeOut(400,randColor);
}

function playAudio(name){
    let audio = new Audio("audios/"+name+".mp3");
    audio.play();
}

function clickStlye(name){
    document.getElementById(name).classList.add("clickStyles");
    setTimeout(()=>{
       document.getElementById(name).classList.remove("clickStyles");
    },200);
}

function errorStyle(){
    document.querySelector('body').classList.add("Error");
    setTimeout(()=>{
        document.querySelector('body').classList.remove("Error");
    },1000)
}

function statOver(){
    level = 0;
    gamePattern = [];
    started = false;
}