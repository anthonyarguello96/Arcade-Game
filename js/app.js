// Creating enemys
var Enemy = function(x,y, speed) {
    this.x=x;
    this.y=y+55;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x <= 485){
      this.x+=this.speed *dt;
    }else{
      this.x=-83;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {

  constructor(){
    //properties
    this.x = 202;
    this.y =387;
    this.sprite = 'images/char-boy.png';
    this.victory= false;

  }


  //render method
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }


  //handleInput method
  handleInput(input){
    switch (input) {
      case 'left':
       this.x<=-3 ? this.x=401 : this.x-=101;
           //console.log(this.x);
        break;
        case 'right':
          this.x>=401 ? this.x=-3 : this.x+=101;
          //console.log(this.x);
            break;
        case 'up':
          this.y<= 55 ? this.reset(): this.y -= 83;
          console.log(this.y)
          // this.stop();
          //console.log(this.victory);
            break;
        case 'down':
          this.y>=387 ? this.y = 387 : this.y += 83;
          //console.log(this.y);
            break;
      default:
    }
  }


// reset method
 reset(){
   this.x = 202;
   this.y = 387;
 }


  //update() method
  update(){
 for(let enemy of allEnemies){
    if(this.y===enemy.y && this.x-75<enemy.x&& enemy.x < this.x+75){
      collisionCount+=1;
      this.reset();
 }
   if(this.y===55){
     displayModal();
     this.stop();
     this.reset();
   }
  }
 }
}


//                      modal for the Star
let modalBackgroundStart= document.querySelector('.modalBackgroundStart');
let playButtom = document.querySelector(".playButtom");
console.log(playButtom);
//Event Listener for the 'Yes!' buttom
playButtom.addEventListener("click", function(){
  modalBackgroundStart.classList.add('hide');
  player.victory=false;
  collisionCount=0;
  start();
});



//                      timer

// General variables
let seconds = 0;
let minutes = 0;
let displaySeconds = 0;
let displayMinutes
let interval = null;
let status="stopped";


// this fucntion generates the timer
function stopWatch(){
  seconds++;
  if(seconds/60===1){
    seconds=0;
    minutes++;
  }
if(seconds<10){
  displaySeconds= "0"+seconds.toString();
}else{
  displaySeconds=seconds;
}

if(minutes<10){
  displayMinutes="0"+minutes.toString();
}else{
  displayMinutes=minutes;
}
document.getElementById("display_timer").innerHTML =displayMinutes+":"+displaySeconds;
}


//this function starts the timer
     function start(){
       if(status=== "stopped"){
         interval=window.setInterval(stopWatch, 1000);
         status="started";
       }
     };


  //this function stops the timer
     Player.prototype.stop = function(){
       window.clearInterval(interval);
       status="stopped";
     }


 //this function resets the timer
     function resetStopWatch(){
       window.clearInterval(interval);
       seconds=0;
       minutes=0;
       status = 'stopped';
       document.getElementById('display_timer').innerHTML="00:00";
     }

  // this function displays the modal

function displayModal(){
  player.victory=true;
  let modalBackground = document.querySelector('.modalBackground');
  let modalTime= document.querySelector('.modalTime');
  const timer = document.getElementById("display_timer").innerHTML;
  let collisionCountOutput= document.querySelector(".collisionCountOutput");

  // Collisions message for the modal
  switch (true){
    case collisionCount===0:
        collisionCountOutput.innerHTML=`${collisionCount} crashes!`;
      break;


    case collisionCount===1:
      collisionCountOutput.innerHTML=`ONLY ${collisionCount} CRASH! !`;
      break;


     case collisionCount===2:
     collisionCountOutput.innerHTML=`${collisionCount} COLLISIONS, NOT BAD!`;
     break;


     case collisionCount>2 && collisionCount<4:
     collisionCountOutput.innerHTML=`${collisionCount} COLLISIONS, REALLY?!`;
     break;

     case collisionCount>4:
     collisionCountOutput.innerHTML=`${collisionCount} COLLISIONS, YOU'LL NEVER SEE VALHALLA!`;
     break;


  }

  modalTime.innerHTML=`Time: ${timer}`;
  modalBackground.classList.remove('hide');
}

// Creating player and enemies
const player = new Player();
const beattle1= new Enemy(-202,249, 300);
const beattle2= new Enemy(-101,166, 250);
const beattle3= new Enemy(-303, 83, 355);
const beattle4= new Enemy(-101, 0, 45);
let allEnemies=[];
allEnemies.push(beattle1);
allEnemies.push(beattle2);
allEnemies.push(beattle3);
allEnemies.push(beattle4);
let collisionCount = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
