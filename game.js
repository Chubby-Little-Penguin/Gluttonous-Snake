var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

const timeInterval = 100;
const Width = 10;
const Height = 10;

//创建贪吃蛇
var body_x = [];
var body_y = [];
var head_x = Math.floor(Math.random()*canvas.width/Width);
var head_y = Math.floor(Math.random()*canvas.height/Height);
var length = 1;
var direction = [[0, -1], [-1, 0], [0, 1], [1, 0],[0, 0]]; //上左下右，WASD
var dir = 4; //上左下右，0，1，2，3

//食物
var food_x = -1;
var food_y = -1;
var flag = false;

//创建地图数组
const rows = canvas.width/Width+1;
const cols = canvas.height/Height+1;
const matrix = [];
for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
        matrix[i][j] = 0; // 初始值为 0
    }
}

function generate_food() {
    food_x = Math.floor(Math.random()*canvas.width/Width);
    food_y = Math.floor(Math.random()*canvas.height/Height);
    while (food_x*Width <=5 || food_x*Width >=canvas.width-5 || food_y*Height <=5 || food_y*Height >=canvas.height-5){
        generate_food();
    }
    if (matrix[food_x][food_y] != 0) {
        generate_food();
    }
    matrix[food_x][food_y] = 2;
    flag = true;
}

//绘制蛇的位置、食物的出现
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //绘制蛇
    ctx.fillStyle = "green";
    ctx.fillRect(head_x*Width, head_y*Height, Width, Height);
    for (var i=0; i<length; i++){
        ctx.fillRect(body_x[i]*Width, body_y[i]*Height, Width, Height);
    }
    //绘制食物
    const radius = 7;
    ctx.beginPath();
    ctx.arc(food_x*Width, food_y*Height, radius, 0, Math.PI * 2); 
    ctx.closePath();
    ctx.fillStyle = 'red'; 
    ctx.fill();

}

//检测是否吃到食物
function detect_eat(){
    if (head_x <= food_x+1 && head_x>= food_x-1 && head_y <= food_y+1 && head_y >= food_y-1){
        matrix[food_x][food_y] = 0;
        length++;
        generate_food();
    }
}

//移动蛇头和蛇身
function move() {
    console.log("move");
    //移动蛇头
    head_x += direction[dir][0];
    head_y += direction[dir][1];
    //移动蛇身
    if (body_x.length == length){
        matrix[body_x[length-1]][body_y[length-1]] = 0;
    }
    for (var i=length-1; i>0; i--){
        body_x[i] = body_x[i-1];
        body_y[i] = body_y[i-1];
    }
    body_x[0] = head_x;
    body_y[0] = head_y;
    
    detect_eat();
    check_collision();

    matrix[head_x][head_y] = 1;
    
    draw();
}

//判断是否撞墙
function check_collision() {
    if (head_x < 0 || head_x >= canvas.width/Width || head_y < 0 || head_y >= canvas.height/Height){
        alert("Game Over!");
        reset();
    }
    for (var i=length-1; i>0; i--){
        if (head_x == body_x[i] && head_y == body_y[i]){
            alert("Game Over!");
            reset();
        }
    }
}

//初始化
function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generate_food();
    body_x[0] = head_x;
    body_y[0] = head_y;
    draw();
}

function reset(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = 0; // 初始值为 0
        }
    }
    body_x = [];
    body_y = [];
    head_x = Math.floor(Math.random()*canvas.width/Width);
    head_y = Math.floor(Math.random()*canvas.height/Height);
    length = 1;
    dir = 4; //上左下右，0，1，2，3
    time = 0;
}
//主循环
function main() {
    init();
    document.addEventListener("keydown", 
        function(pressedButton) {
            console.log(pressedButton.key);
            if (pressedButton.key == 'w'){
                if (dir != 2){
                    dir = 0;
                }
            }
            if (pressedButton.key == 'a'){
                if (dir != 3){
                    dir = 1;
                }
            }
            if (pressedButton.key == 's'){
                if (dir != 0){
                    dir = 2;
                }
            }
            if (pressedButton.key == 'd'){
                if (dir != 1){
                    dir = 3;
                }
            }
            if (pressedButton.key == 'Escape'){
                alert("Game Stop");
            }
        }
    );
    setInterval(function(){
        move();
        time += 0.1;
    }, timeInterval);
}

    
