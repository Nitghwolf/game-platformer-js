const hero = document.getElementById("hero");
const heroContainer = document.getElementById("heroContainer");
const jumpBlock = document.getElementById("jumpBlock");
const hitBlock = document.getElementById("hitBlock");
const canvas = document.getElementById("canvas");

const DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right'
}

let rigthPosition = 0;
let imgBlockPosition = 0;
let timer = null;
let positionX = 0;
let halfWidthWindow = window.screen.width / 2;
let moveDirection = DIRECTION.RIGHT;
let hit = false;
let jump = false;


jumpBlock.style.top = `${window.screen.height/2 - 144/2}px`;
hitBlock.style.top = `${window.screen.height/2 - 144/2}px`;

// move hero
const lifeCycle = () => {
    timer = setInterval(() => {
        if(hit){
            hitHandler();
        }
        else if(jump){
            jumpHandler();
        }
        else{
            idleHandler();
        }
    }, 150);
};

jumpBlock.addEventListener("click", () => {
    jump = true;
});

hitBlock.addEventListener("click", () => {
    hit = true;
});

const onTouchStart = (event) => {
    event.preventDefault();
    clearInterval(timer);
    x = (event.type === "mousedown") ? event.screenX : event.touches[0].screenX;
    timer = setInterval(() => {
        if(x > halfWidthWindow){
            moveDirection = DIRECTION.RIGHT;
            move(1);
        }
        else {
            moveDirection = DIRECTION.LEFT;
            move(-1);
        }
    }, 130);
};

const onTouchEnd = (event) => {
    event.preventDefault();
    clearInterval(timer);
    lifeCycle();
};

hero.addEventListener("click", (event) => {
    event.preventDefault();
});

window.onmousedown = onTouchStart;
window.onmouseup = onTouchEnd;

//mobile
window.ontouchstart = onTouchStart;
window.ontouchend = onTouchEnd;

function move(scaleX){
    hero.style.transform = `scaleX(${-scaleX})`;
    rigthPosition = rigthPosition + 1;
    imgBlockPosition = imgBlockPosition + scaleX;
    if(rigthPosition > 5){
        rigthPosition = 0;
    }
    hero.style.left = `-${rigthPosition * 96}px`;
    hero.style.top = '-192px';
    heroContainer.style.left = `${imgBlockPosition * 20}px`
}

function idleHandler(){
    switch(moveDirection){
        case DIRECTION.RIGHT: {
            hero.style.transform = "scaleX(-1)";
            if(rigthPosition > 4){
                rigthPosition = 1;
            }
            break;
        }
        case DIRECTION.LEFT: {
            hero.style.transform = "scaleX(1)";
            if(rigthPosition > 3){
                rigthPosition = 0;
            }
            break;
        }
        default: break;
    }
    rigthPosition = rigthPosition + 1;
    hero.style.left = `-${rigthPosition * 96}px`;
    hero.style.top = '0px';
};

function hitHandler(){
    switch(moveDirection){
        case DIRECTION.RIGHT: {
            hero.style.transform = "scaleX(-1)";
            if(rigthPosition > 4){
                rigthPosition = 1;
                hit = false;
            }
            break;
        }
        case DIRECTION.LEFT: {
            hero.style.transform = "scaleX(1)";
            if(rigthPosition > 3){
                rigthPosition = 0;
                hit = false;
            }
            break;
        }
        default: break;
    }
    rigthPosition = rigthPosition + 1;
    hero.style.left = `-${rigthPosition * 96}px`;
    hero.style.top = '-288px';
}

function jumpHandler(){
    switch(moveDirection){
        case DIRECTION.RIGHT: {
            hero.style.transform = "scaleX(-1)";
            if(rigthPosition > 4){
                rigthPosition = 1;
                jump = false;
            }
            break;
        }
        case DIRECTION.LEFT: {
            hero.style.transform = "scaleX(1)";
            if(rigthPosition > 3){
                rigthPosition = 0;
                jump = false;
            }
            break;
        }
        default: break;
    }
    rigthPosition = rigthPosition + 1;
    hero.style.left = `-${rigthPosition * 96}px`;
    hero.style.top = '-96px';
}

const createTile = (x, y = 1) => {
    const tile = document.createElement("img");
    tile.src = "src/1 Tiles/Tile_02.png";
    tile.style.position = "absolute";
    tile.style.left = `${x * 32}px`;
    tile.style.bottom = `${y * 32}px`;    
    canvas.appendChild(tile);
};

const createPlatform = (startX, startY, length) => {
    for (let i = 0; i < length; i++) {
        createTile(startX + i, startY);
    }
};

const addTiles = (i) => {
    createTile(i);
    const tileBlack = document.createElement("img");
    tileBlack.src = "src/1 Tiles/Tile_04.png";
    tileBlack.style.position = "absolute";
    tileBlack.style.left = `${i * 32}px`;
    tileBlack.style.bottom = 0;
    canvas.appendChild(tileBlack);
};

function start(){
    lifeCycle();
    for (let i = 0; i < 70; i++) {
        addTiles(i);
    }
    createPlatform(10, 10, 10);
    createPlatform(15, 5, 10);
}

start();