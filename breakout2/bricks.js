let keysBeingPressed = [];
let theGame;
let lives;
let backgroundMusic;

document.onkeydown = function (e) {
  let commands = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
  if (commands.includes(e.key)) {
    e.preventDefault();
  }
  if (!keysBeingPressed.includes(e.key)) {
    keysBeingPressed.push(e.key);
  }

}
document.onkeyup = function (e) {
  let theIndex = keysBeingPressed.indexOf(e.key)
  // console.log(theIndex)
  if (theIndex != -1) {
    keysBeingPressed.splice(theIndex, 1)
  }
}

document.getElementById("game-start").onclick  = function() {
   $(this).addClass('move');
  theGame = new Game();
  
  // playerLife.innerHTML = lives
 
}

class Game{
  constructor(){
    let playerLife = document.getElementById("playerBalls");
    let playerScore = document.getElementById("bricksDestroyed")
    // console.log(playerLife.innerHTML)
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.ball1 = new Ball("white");
    this.ball2 = new Ball2("yellow")
    this.Paddle = new Paddle();
    this.bricks = new Brick();
    this.paddleSound = new Audio("4389__noisecollector__pongblipf-3.wav");
    this.brickSound = new Audio("Explosion 2-SoundBible.com-1641389556.wav")
    this.loseLifeSound = new Audio("Cat Meow-SoundBible.com-1977450526.wav")
    this.score = 0;
    this.score = Number(playerScore.innerHTML)
    this.healthPoints = 3;
    this.healthPoints = playerLife.innerHTML;
    let win = new Audio("bensound-summer.mp3");
    let backsound = new Audio("tubebackr-fresh-up.mp3");
    // /////////// sprites tryout /////////////;
    this.explodingBricks = [];
    // ////////////////////////////////////////////
    this.arrayOfBricks = [];

    this.shifter = 0;
    // console.log(shifter);
    
    let blah = setInterval(()=>{
      
      playerLife.innerHTML = this.healthPoints;
      playerScore.innerHTML = this.score;
      setTimeout(() => {
        
        if(this.healthPoints < 0 ){
          clearInterval(blah)
          alert("You lose! Visit my Github for more information!");
          win.play();
          document.location.reload()
        }
        if(this.score > 7999){
          clearInterval(blah)
          alert("you win! Visit my Linkedin to see more of my Work!");
          win.play();

          document.location.reload()
        }
      }, 10);
        this.drawEverything();
        backsound.play()
      
      

    },10)
    this.spawnObstacle();
    // this.score.youLose();
    // this.score.youWin();
    // console.log(this.arrayOfBricks);
  }
  spawnObstacle() {
    let rowSpacing = 6;
    let columnSpacig = 20;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 8; c++) {
        // bricks[r][c] = { x: 0, y: 0, health: 1 };
        this.arrayOfBricks.push(new Brick(rowSpacing, columnSpacig, 1))
        columnSpacig += 30;
        if(r<2){
          this.bricks.ctx.fillStyle = "red"
        }
      }
      rowSpacing += 90;
      columnSpacig = 20;
 
    }
    
  }
  
  

  drawEverything() {
    let ctx = this.ctx
    let canvas = this.canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ball1.drawBall();

    // if(this.shifter === 1){
    //   this.ball2.drawBall();
      
    // }
    
    this.Paddle.drawPaddle();

    this.arrayOfBricks.forEach((block) => {
      block.drawBrick();
    })



   this.explodingBricks.forEach((block) => {
    // console.log("second forEach working")
    // console.log(block);
      block.drawBrick();
    })

  
  
}
}
    
class Ball{
  constructor(m){
    let ballRadius;
   
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.ballRadius = ballRadius;
    // this.ballStartingPosX = ballStartingPosX;
    // this.ballStartingPosY = ballStartingPosY;


    // -==--==-=-=-=-=-=-
    this.ballRadius = 10;
    this.startingPositionX = this.canvas.width / 2;
    this.startingPositionY = this.canvas.height - 30;
    this.dx = Math.round(Math.random()) * 6 - 1;
    this.dy = -2;
    this.addX = this.startingPositionX;
    this.addY = this.startingPositionY;
    this.color = m;
  }

  drawBall() {
  
    let startingPositionX = this.startingPositionX;
    let startingPositionY = this.startingPositionY;
    let dx = this.dx;
    let dy = this.dy;
    let ctx = this.ctx
    let canvas = this.canvas
    
    ctx.beginPath();
    ctx.arc(this.startingPositionX, this.startingPositionY, this.ballRadius, 0, Math.PI * 2); /* the ballradius letiable will make it easier to guarantee the same radius everytime */
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    
    // console.log(this.regularBallCollision())
    // -------------

    // this.regularBallCollision();

    // the following lines of code make the ball move =-=- BALL MOVEMENT HERE -=-=-=-=-==-=--=
     
      if(this.canMove() === 0){
        // console.log("---=-==-=-=--=-=WHAT IS GOING ON!?-=-=-=-=-=")
        this.startingPositionY += this.dy;
        this.startingPositionX += this.dx;

      }
        
    
    if( this.canMove() === 1){
      // console.log("=-=--=-=-=-=-=CAN MOVE IS === 1 0-0-0-0-0-0-0-")
      this.dx = -this.dx * 1.001;
    }
    if(this.canMove() === 2 ){
      this.dy = -this.dy;
      // this.startingPositionX -= this.dx;
      // this.startingPositionY -= this.dy;

    }
    if(this.canMove() === 3){
      this.dy = Math.random() *3 - Math.random() * 4;
      this.dx = Math.random() *3; - Math.random()*4
    }
    if (this.commandCenter()=== 2){
      console.log("gravity changed")
      this.dy = -this.dy
    }
  // =--=-==-=-=-=-=-=-=-=-=-=-=-=-=-==-=--=-=-=-=-==-END OF BALL MOVEMENT -=-=-=-=-=-=-=-=-==-=-=-=-=-=--=-=


  }
  
  regularBallCollision() {
    let ballRadius = this.ballRadius;
    let startingPositionX = this.startingPositionX;
    let startingPositionY = this.startingPositionY;
    let dx = this.dx;
    let dy = this.dy;
    let canvas = this.canvas;
    this.gravity === 0;

    // console.log(this.canMove(this.ballStartingPosX, this.ballStartingPosY));

    this.canMove(this.ballStartingPosX,this.ballStartingPosY)

  }
  canMove() {
    
    // this.commandCenter()
    // console.log(this.commandCenter())
    
    let result = 0;


   
    // console.log("foreach array is being acessed")
    //  -==-==-=-=-=-=-=-=-=-=-=- ball bounce off side walls =--=-=-=-==--==-=-
    if (this.startingPositionX + this.dx < 0 || this.startingPositionX + this.dx > this.canvas.width) {
        // console.log('scenario 1')
      result = 1;
    }
    // =--=-=-==--=-=-==-ball bounce off top wall -==--==-=-=-=-=-=-
    if (this.startingPositionY + this.dy < 0){
      // console.log("hello2")
      result = 2;
    }
    if (this.startingPositionY + this.dy > this.canvas.height - 5){
      result = 2;
      setTimeout(() => {
        theGame.healthPoints = theGame.healthPoints - 0.5 ;
        theGame.loseLifeSound.play();
        
      }, 2);
    }

    if (this.startingPositionY + this.dy > 570 && this.startingPositionX + this.dx > theGame.Paddle.paddleX && this.startingPositionX + this.dx < theGame.Paddle.paddleX + theGame.Paddle.paddleWidth) {
      // console.log("-00-0--0-00--00--00--0-0-0-0-0--0-00--00-0--0", this.startingPositionY)
      // this.startingPositionY -= 10;
      // console.log("scenario 4");
      result = 2;
      theGame.paddleSound.play()
    } 
    

   
      theGame.arrayOfBricks.forEach((brick, i) => {

        // console.log(this.startingPositionX + this.ballRadius + this.dx, brick.x);
        
          // if(brick.health>0){

            if (this.startingPositionX + this.dx < brick.x + brick.brickWidth && this.startingPositionX + this.ballRadius + this.dx > brick.x && this.startingPositionY + this.dy < brick.y + brick.brickHeight && this.startingPositionY + this.ballRadius + this.dy > brick.y) {
              result = 2
              if (brick.health > 0) {
                brick.health--;
              }else{
                setTimeout(()=>{
                  if(theGame.lastBrickDeleted !== i){
                    
                   theGame.explodingBricks.push( ...theGame.arrayOfBricks.splice(i,1) )

                      setTimeout(() => {
                        theGame.explodingBricks.shift()
                      }, 200);
                   //setTimeout and wait 2 second and then do theGame.explodingBricks.shift


                    theGame.score += 100;
                    theGame.brickSound.play();
                    theGame.lastBrickDeleted = i;
                  }

                },10)


              }
            }

      // }

     
    })

    // if (this.commandCenter() === 3) {
    //   // console.log("heeeeeeey")
    //   result = 3
    // }
    return result;
  }

  commandCenter(){
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler);
    let result = 0
 
    // document.addEventListener("mousemove", mouseMoveHandler, false);

    // -=-=-=-checking if the keys are being pressed-=-=-=-
    // the key down handler will make the boolean variable turn true, while the uphandler will turn them back off.

    function keyDownHandler(e) {

   
      if (e.keyCode == 32) {
        // space
      }
        if (e.keyCode == 16) {
      //  shift
      if (e.keyCode == 84) {
        // T
      }

      if (e.keyCode == 82) {
        // R
      }


      }

    }

    function keyUpHandler(e) {
      if (e.keyCode == 32) {
      
        theGame.ball1.dy = -Math.random()*5;
        
        
      }
      if (e.keyCode == 16) {
        // console.log("hello")
        // theGame.shifter === 1;
        // console.log(theGame.shifter)
      // shift
      }
      if (e.keyCode == 84) {
        
        theGame.ball1.dx += 0.01;
        theGame.ball1.dy += 0.01;
      // T
      }
      if (e.keyCode == 82) {
        
        theGame.ball1.ballRadius = Math.random() * 20 + 5
        // redBallRadius = Math.random() * 19 + 5;
      }
      this.gravity === 0
    }

    // function mouseMoveHandler(e) {
    //   var relativeX = e.clientX - canvas.offsetLeft;
    //   if (relativeX > 0 && relativeX < canvas.width) {
    //     paddleX = relativeX - paddleWidth / 2;
    //   }
    // }
    return result
  }

    // if (this.startingPositionX + this.dx < 0 || this.startingPositionX + this.dx > this.canvas.width ) 
}

class Paddle {
  constructor() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    
    this.paddleHeight = 20;
    this.paddleWidth = 150;
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2; /*starting position */
    this.rightPressed = false; /* is false bcause will only be true when clicked(called) */
    this.leftPressed = false;

    let paddleHeight = this.paddleHeight;
    let paddleWidth = this.paddleWidth;
    let paddleX = this.paddleX;
    let rightPressed = this.rightPressed;
    let leftPressed = this.leftPressed;
    let ctx = this.ctx;
    let canvas = this.canvas;
   
 
  }

  drawPaddle() {
    let paddleHeight = this.paddleHeight;
    let paddleWidth = this.paddleWidth;
    let paddleX = this.paddleX;
    let rightPressed = this.rightPressed;
    let leftPressed = this.leftPressed;
    let ctx = this.ctx;
    let canvas = this.canvas;

    // this.paddleMovement();
    this.movePaddle();
    

  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle =`rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}`;
  ctx.fill();
  ctx.closePath();

}
  movePaddle() {
   

    if (keysBeingPressed.includes("ArrowLeft")) {
      if (this.canMove(this.x - 10)) {
        if(this.paddleX > 0){

          this.paddleX -= 10;
        }
      }
    }

    if (keysBeingPressed.includes("ArrowRight")) {
      if (this.canMove(this.x + 10 )) {
        if(this.paddleX + this.paddleWidth < 900){
        this.paddleX += 10;
        }
      }
    }
  }

  canMove(paddleX) {
    let result = true;

    if (paddleX < 0 || paddleX > this.canvas.width) {
      // Console.log("limit here")
      result = false;
    }

    return result;
  }

}
class Brick{
  constructor(x, y, health) {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.brickRowCount = 8;
    this.brickColumnCount = 10;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.x = x
    this.y = y;
    this.health = health
    this.imgsrc = "5a3717af06d292.813223331513559983028.png";


  }


  drawBrick() {
    if(this.health > 0){

      this.ctx.fillStyle = "green"
      if (this.y == 20) {

        this.ctx.fillStyle = "white";
      }
      if (this.y == 50) {
        this.ctx.fillStyle = "grey";
      }
      if (this.y == 80) {
        this.ctx.fillStyle = "purple";
      }
      if (this.y == 110) {
        this.ctx.fillStyle = "red";
      }
      if (this.y == 140) {
        this.ctx.fillStyle = "lightBlue";
      }
      if (this.y == 170) {
        this.ctx.fillStyle = "pink";
      }
      if (this.y == 200) {
        this.ctx.fillStyle = "yellow";
      }
      this.ctx.fillRect(this.x, this.y, this.brickWidth, this.brickHeight);
      
      
    } else {
      let theImage = new Image();
      theImage.src = this.imgsrc;
      theImage.onload = ()=>{
        
        this.ctx.drawImage(theImage, this.x, this.y, 75, 40)
      }

    }
    // else ctx.drawimage and drw the explosion instead of fillrect
  }



}

class Ball2 extends Ball{}
