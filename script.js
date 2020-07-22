document.addEventListener("keydown", start);
let gameActive = false;
let snakeColor = "#7CEA9C"
let previousColorBox = "btn-1";
function start(evnt){
    if(evnt.keyCode == 32 && !gameActive)
        main();
}

function changeSnakeColor(color, id){
    if(!gameActive){
        if(previousColorBox != "")
            document.getElementById(previousColorBox).classList.remove('chosen');

        snakeColor = color;
        document.getElementById(id).classList.add('chosen');
        previousColorBox = id;
    }
}

function main(){
    gameActive = true;
    document.getElementById("score").innerHTML = "Score : 0";
    document.getElementById("gameOver").style.display = "none";

    let snake = [
        {x: 150, y: 150},
        {x: 140, y: 150},
        {x: 130, y: 150}
    ]
    let apple = {x: 100, y: 50};
    let velx = 1, vely = 0, lastkey = 39, appleCreated = false, score = 0;
    
    var gameCanvas = document.getElementById("gameCanvas");
    var ctx = gameCanvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    ctx.clearRect(0, 0, 600, 400);
    let interv = setInterval(game, 1000/15);
    
    function game(){
        if(!gameOver()){
            ctx.clearRect(0, 0, 600, 400);
            if(!appleCreated){
                createApple();
                appleCreated = true;
            }
    
            moveSnake(snake);
            drawApple();
            drawSnake();            
        }else{
            gameActive = false;
            document.getElementById("gameOver").style.display = "block";
            clearInterval(interv);
        }
    }
    
    function gameOver(){
        if(snake[0].x == -10 || snake[0].x == 600 || snake[0].y == -10 || snake[0].y == 600)
            return true;
        else{
            let counter = 0;
            for(i in snake){
                if(i == 0)
                    continue;
                
                if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
                    return true;
            }
        }
        return false;
        
    }
    
    function drawSnake(){
        
        for(element in snake){
            ctx.strokeStyle = "white";
            ctx.strokeRect(snake[element].x, snake[element].y, 10, 10);
            ctx.fillStyle = snakeColor;
            ctx.fillRect(snake[element].x, snake[element].y, 10, 10);
        }
    }

    
    
    function drawApple(){
        ctx.fillStyle = "red";
        ctx.fillRect(apple.x, apple.y, 10, 10);
    }
    
    function createApple(){
        let x = 10 * Math.floor(Math.random() * 29);
        let y = 10 * Math.floor(Math.random() * 29);
    
        for(element in snake){
            if(snake[element].x == x && snake[element].y == y)
                createApple();
        }
        apple = {x: x, y: y};
    }
    
    function keyPush(evt){
        switch(evt.keyCode){
            case 37:
                if(lastkey != 39){
                    velx = -1;
                    vely = 0;
                    lastkey = 37
                }
                break;
            case 38:
                if(lastkey != 40){
                    velx = 0;
                    vely = -1;
                    lastkey = 38;
                }
                break;
            case 39:
                if(lastkey != 37){
                    velx = 1;
                    vely = 0;
                    lastkey = 39;
                }
                break;
            case 40:
                if(lastkey != 38){
                    velx = 0;
                    vely = 1;
                    lastkey = 40;
                }
                break;
            default:
                break;
        }
    }
    
    function moveSnake(snake){
        if(apple.x == snake[0].x && apple.y == snake[0].y){
            score++;
            document.getElementById("score").innerHTML = "Score : " + score;
            AppleCreated = false;
            createApple();
            ctx.clearRect(apple.x, apple.y, 10, 10);
            snake.unshift({x: (snake[0].x + 10 * velx), y: (snake[0].y + 10 * vely)});
        }else{
            snake.unshift({x: (snake[0].x + 10 * velx), y: (snake[0].y + 10 * vely)});
            snake.pop();
        }
        
    }
}

