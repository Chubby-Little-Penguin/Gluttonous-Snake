var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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



//创建地图数组
const rows = 50;
const cols = 50;
const matrix = [];
for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
        matrix[i][j] = 0; // 初始值为 0
    }
}

//绘制蛇的位置、食物的出现
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fillRect(head_x*Width, head_y*Height, Width, Height);
    for (var i=0; i<length; i++){
        ctx.fillRect(body_x[i]*Width, body_y[i]*Height, Width, Height);
    }

}

//移动蛇头和蛇身
function move() {
    //移动蛇头
    head_x += direction[dir][0];
    head_y += direction[dir][1];
    //移动蛇身
    for (var i=length-1; i>0; i--){
        body_x[i] = body_x[i-1];
        body_y[i] = body_y[i-1];
    }
    body_x[0] = head_x;
    body_y[0] = head_y;

    check_collision();

    draw();
}

//判断是否撞墙
function check_collision() {
    if (head_x < 0 || head_x >= canvas.width/Width || head_y < 0 || head_y >= canvas.height/Height){
        alert("Game Over!");
        location.reload();
    }

}

//初始化
function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}


//主循环
function main() {
    init();
    document.addEventListener("keydown", 
        function(pressedButton) {
            console.log(pressedButton.key);
            if (pressedButton.key == 'w'){
                dir = 0;
            }
            if (pressedButton.key == 'a'){
                dir = 1;
            }
            if (pressedButton.key == 's'){
                dir = 2;
            }
            if (pressedButton.key == 'd'){
                dir = 3;
            }
        }
    );
    setInterval(move, 100);
}

    
