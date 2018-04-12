var delta = 18; //偏移量 ，因为虫子其实位置有点向下
var width = 101;//因 canvas 定义宽度
var height = 80;//因 canvas 定义高度

// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y,z) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y; //减去偏移量 纠正位置
    this.speed = z; //敌人初始移动速度
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png'
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x + dt * this.speed;

    if (this.x > width * 4) {
        this.x = 0;
    } 
    Enemy.prototype.checkCollisions();
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//此为玩家与虫子对撞时玩家复位功能,未成功～～
Enemy.prototype.checkCollisions = function () {
    // debugger
    allEnemies.forEach(function () {
        if (this.y === player.y) {
            // debugger
            console.log(`bang!`)
            // console.log(`checkCollision() is working, player :${player.x},${player.y}`)
        }
    })
}

// Enemy.prototype.checkCollision = function (player) {
//      if (this.y === player.y) {
//     console.log(`collision happened!! enemy.x: ${this.x}, player.x: ${player.x}`)
//     } else {
//     console.log(`player's safe!! enemy.x: ${this.x}, player.x: ${player.x}`)
//     }
// }
// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png'
}

//此为Player 能上、下、左、右移动不出图边界
Player.prototype.update = function () {
    if (this.y > height * 5) {
        this.y = height * 5 - delta;
    } else if (this.y < height * 0) {
        this.y = height * 0 + delta;
    } else if (this.x > width * 4) {
        this.x = width * 4;
    } else if (this.x < width * 0) {
        this.x = width * 0;
    }
}


//当玩家到了河就算赢得游戏，屏幕打印‘胜利’，并充值玩家起始位置，未成功～～～
Player.prototype.win = function() {
   if (this.y < 62) {
       alert("You Win");
      this.x = width * 3;
      this.y = height * 4 - delta;
   }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//此为Player 能上、下、左、右移动
Player.prototype.handleInput = function(movement){
    switch (movement) {
        case 'left':
            this.x = this.x - width;
            break;
        case 'right':
            this.x = this.x + width;
            break;
        case 'up':
            this.y = this.y - height;
            break;
        case 'down':
            this.y = this.y + height;
            break;
    }
}
// let Player = class Player{
//     constructor(){

//     }
// }

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
allEnemies.push(new Enemy(0, height - delta, 200));//第一个虫子，在第一行石子路
allEnemies.push(new Enemy(0, 2 * height - delta, 150));//第二个虫子，在第二行石子路
allEnemies.push(new Enemy(0 , 3 * height - delta, 250));//第三个虫子，在第三行石子路
var player = new Player(width * 3, height * 4 - delta);



// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
