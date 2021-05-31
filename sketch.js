var balloon, background;
var database 
function preload() {
  backgroundImg = loadImage("cityImage.png")
  balloonImage = loadAnimation("hotairballoon1.png", "hotairballoon2.png", "hotairballoon3.png");
}

function setup(){
  createCanvas(1400,700);

  balloon = createSprite (100,600, 30, 30)
  balloon.addAnimation("balloon", balloonImage);
  balloon.scale = 0.4;

  database = firebase.database()//intialzing firebase and database
  var balloonPositionRef=database.ref("balloon/position")
  balloonPositionRef.on("value",readPosition,showError)//reading ball/position


}

function draw(){

    background(backgroundImg);
  
        if(keyDown(LEFT_ARROW)){
            balloon.x = balloon.x - 10;
        }
        else if(keyDown(RIGHT_ARROW)){
            balloon.x = balloon.x + 10;
        }
        else if(keyDown(UP_ARROW)){
            balloon.y = balloon.y - 10;
            balloon.scale=balloon.scale+0.005
        }
        else if(keyDown(DOWN_ARROW)){
             balloon.y = balloon.y + 10;
             balloon.scale=balloon.scale-0.003
        }
        drawSprites();
    }

    function changePosition(x,y){
      balloon.x = balloon.x + x;
      balloon.y = balloon.y + y;
      writePosition(balloon.x,balloon.y)
  }

  function readPosition(data){
    var pos=data.val()
    var x=pos.x
    var y=pos.y
    console.log(x)
    console.log(y)
    balloon.x=x
    balloon.y=y
    }
    
    function showError(){
    
    }
    
    function writePosition(x,y){
        var balloonPositionRef=database.ref("balloon/position")
        balloonPositionRef.set({
            "x":x,
            "y":y
        })
    }
    

