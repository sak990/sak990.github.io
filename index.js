

function draw(){
    var img = document.getElementById("gameMap");
    var board = document.getElementById("gameBoard");
    
    board.style.position = "absolute";
    board.style.left = img.offsetLeft + "px";
    board.style.top = img.offsetTop + "px";
    
    var ctx = board.getContext("2d");
    
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillCirc(10, 10, 50, 50);

  }

  