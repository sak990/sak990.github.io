

class GameSpotNode {
  constructor(type, location, name, churchValue) {
    this.name = name;
    this.type = type;
    this.location = location;
    this.churchValue = churchValue;
    this.connections = [];

    this.element = document.createElement("figure");
    if(undefined != churchValue)
    {
      this.element.innerText = "(" + churchValue + ")" + name;
    }
    this.element.className =  type + " " + name;
    this.element.id = "node" + name;
    let _this = this;
    this.element.addEventListener('click', function() { spotClicked(_this); });

    this.style = "." + name + " { top: " + location[0] + "px; left: " + location[1] + "px; } \n";
  }
}

class PlayerInfo {
  constructor(id) {
    this.id = id;
    
    let styleNode = document.getElementById("styleDefinitions");
    let startPos = styleNode.innerText.indexOf("player-" + id);
    let endPos = styleNode.innerText.indexOf("}", startPos);
    this.style = styleNode.innerText.substr(startPos, endPos - startPos + 1);
    
    let playerNode = document.createElement("div");
    playerNode.id = "player" + id;
    playerNode.className = "player-marker player-" + id;
    document.getElementById("gameSpots").appendChild(playerNode);
    
    moveMarker(this, startPosition);
  }
}

const root = new GameSpotNode("city", [310, 200], "Rome", 6);
let players = [];
let startPosition = null;
let currentPlayer = 0;
let diceRoll = 0;
let currentSet = null;

function spotClicked(node) {

  document.getElementById("seaTravel").innerText = "Sea travel succeed: ";

  currentSet = new Set();
  if(!canMove(node, diceRoll))
  {
    return;
  }

  if(!isSea(node) || checkForSeaTravel())
  {
    moveMarker(players[currentPlayer], node);

    if(isCity(node)){
      plantChurch();
    }
  }

  updatePlayer();
  rollDice();  
}

function isCity(gameSpot){
  return gameSpot.type == "city";
}

function isSea(gameSpot){
  return -1 != gameSpot.type.indexOf("sea-marker");
}

function checkForSeaTravel(){
  let success = 0 == Math.trunc(Math.random() * 3);
  
  document.getElementById("seaTravel").innerText = "Sea travel succeed: " + success;
  return success;
}

function updatePlayer(){
  currentPlayer = (currentPlayer + 1) % players.length;
  document.getElementById("currentPlayer").innerText = "Current player: " + (currentPlayer + 1);
}

function rollDice() {
  diceRoll = Math.trunc((Math.random() * 6) + 1);
  document.getElementById("diceRoll").innerText = "Current dice roll: " + diceRoll;
}

function canMove(node, depth){
  if(0 >= depth)
  {
    return false;
  }
  
  if(currentSet.has(node.element.id)) 
  { return false; }

  
  for(let child of node.connections) {
    if(players[currentPlayer].gameSpot.element.id == child.element.id)
    {
      return true;
    }

    currentSet.add(node.element.id);
    if(canMove(child, depth - 1)) { return true; }
    currentSet.delete(node.element.id);
  }

  return false;
}

function plantChurch(){

}

function createGraph(){
  const rome = root;
  const thessalonica = new GameSpotNode("city", [290, 620], "Thessalonica", 3);
  const berea = new GameSpotNode("city", [300, 560], "Berea", 2);
  const corinth = new GameSpotNode("city", [430, 650], "Corinth", 3);
  const philippi = new GameSpotNode("city", [245, 675], "Philippi", 3);
  const ephesus = new GameSpotNode("city", [370, 840], "Ephesus", 2);
  const cyprus = new GameSpotNode("city", [435, 1145], "Cyprus", 3);
  const ichonium = new GameSpotNode("city", [330, 1060], "Ichonium", 3);
  const antioch = new GameSpotNode("city", [370, 1260], "Antioch", 3);
  const damascus = new GameSpotNode("city", [450, 1350], "Damascus", 3);
  const jerusalem = new GameSpotNode("city", [550, 1330], "Jerusalem", 2);
  const sidon = new GameSpotNode("city", [460, 1275], "Sidon", 2);
  const caesarea = new GameSpotNode("city", [520, 1280], "Caesarea", 1);
  const colossae = new GameSpotNode("city", [380, 940], "Colossae", 3);
  const philadelphia = new GameSpotNode("city", [330, 890], "Philadelphia", 4);
  startPosition = jerusalem;
  
  connectCities(rome, philippi, "land", [[270, 200], [200, 300], [200, 400], [200, 450], [200, 500], [200, 600]]);
  connectCities(rome, caesarea, "sea", [[370, 200], [450, 300], [500, 400], [600, 550], [600, 700], [600, 800]]);
  connectCities(rome, corinth, "sea", [[370, 220], [450, 320], [500, 420], [500, 500]]);
  connectCities(philippi, corinth, "sea", [[350, 670]]);
  connectCities(corinth, ephesus, "sea", [[400, 750]]);
  connectCities(corinth, cyprus, "sea", [[450, 770], [460, 1000]]);
  connectCities(ephesus, cyprus, "sea", [[430, 1000]]);
  connectCities(ephesus, antioch, "sea", [[410, 1000]]);
  connectCities(cyprus, antioch, "sea", [[410, 1200]]);
  connectCities(cyprus, caesarea, "sea", [[500, 1200]]);
  connectCities(antioch, caesarea, "sea", [[460, 1250]]);
  connectCities(philippi, thessalonica, "land", [[270, 650]]);
  connectCities(thessalonica, berea, "land", []);
  connectCities(berea, corinth, "land", [[350, 590], [390, 600]]);
  connectCities(thessalonica, corinth, "land", [[340, 610], [380, 620], [420, 630]]);
  connectCities(philippi, ephesus, "land", [[250, 730], [270, 780], [310, 810], [340, 830]]);
  connectCities(philippi, philadelphia, "land", [[235, 730], [255, 785], [290, 840], [320, 870]]);
  connectCities(ephesus, colossae, "land", [[380, 900]]);
  connectCities(colossae, ichonium, "land", [[370, 990], [350, 1020]]);
  connectCities(philadelphia, ichonium, "land", [[340, 940], [340, 1000]]);
  connectCities(ichonium, antioch, "land", [[310, 1140], [300, 1230], [340, 1260]]);
  connectCities(antioch, sidon, "land", [[410, 1270], [440, 1275]]);
  connectCities(sidon, caesarea, "land", [[500, 1280]] );
  connectCities(caesarea, jerusalem, "land", []);
  connectCities(sidon, damascus, "land", [[460, 1320]]);
  connectCities(damascus, jerusalem, "land", [[500, 1350], [530, 1340]]);
}

function connectCities(city1, city2, pathType, path) {
  let index = 0;
  let lastNode = city1;
  for(let entry of path)
  {
    const newNode = new GameSpotNode(
      "movement-marker " + pathType + "-marker",
      entry,
      city1.name + city2.name + index
    );
    connectNodes(lastNode, newNode);
    index++;
  }
  connectNodes(lastNode, city2);
}

function connectNodes(node1, node2){
  node1.connections.push(node2);
  node2.connections.push(node1);
}

let drawnNodes;
function draw(){
  drawnNodes = new Set();
  drawNode(root);
}

function drawNode(node, connectsFromNode){

  let styleElement = document.getElementById("styleDefinitions");
  let gameSpots = document.getElementById("gameSpots");
  
  if(null != connectsFromNode)
  {
    const lineWidth = 2;
    let x1 = node.location[1];
    let x2 = connectsFromNode.location[1];
    let y1 = node.location[0];
    let y2 = connectsFromNode.location[0];
    if(x1 > x2)
    {
      let temp = x2;
      x2 = x1;
      x1 = temp;
    }
    if(x2 - x1 < lineWidth)
    {
      x2 = x1 + lineWidth;
    }
    if(y1 > y2)
    {
      let temp = y2;
      y2 = y1;
      y1 = temp;
    }
    if(y2 - y1 < lineWidth)
    {
      y2 = y1 + lineWidth;
    }

    let routeArea = connectsFromNode.name + "-" + node.name + "-area";
    let routeName = connectsFromNode.name + "-" + node.name + "-route";
    let lineStyle = "." + routeArea + " { position: absolute; top: " + y1 + "px; left: " + x1 + "px; width: " + (x2 - x1) + "px; height: " + (y2 - y1) + "px; } \n." + routeName + " { position: absolute; top: 0px; left: 0px; width: " + (x2 - x1) + "px; height: " + (y2 - y1) + "px; } \n";
    styleElement.innerText = styleElement.innerText + lineStyle;
    
    
    lineElement = document.createElement("svg");
    lineElement.className = routeArea;
    lineInner = document.createElement("line");
    lineInner.className =  routeName;
    lineInner.id = "line" + routeName;
    lineInner.setAttribute("x1", 0);
    lineInner.setAttribute("y1", 0);
    lineInner.setAttribute("x2", (x2 - x1) - lineWidth);
    lineInner.setAttribute("y2", (y2 - y1) - lineWidth);
    lineInner.style = "stroke: brown; stroke-width: " + lineWidth + ";";
    lineElement.appendChild(lineInner);
    gameSpots.appendChild(lineElement);
  }
  if(drawnNodes.has(node.element.id)) 
  { return; }

  drawnNodes.add(node.element.id);
  gameSpots.appendChild(node.element);
  styleElement.innerText = styleElement.innerText + node.style;

  for(let child of node.connections) drawNode(child, node);
}

function moveMarker(player, location){
  let styleNode = document.getElementById("styleDefinitions");
  let newStyle = player.style.substr(0, player.style.length - 1) + "position: absolute; top: " + (location.location[0]) + "px; left: " + (location.location[1] + 40) + "px; }";
  styleNode.innerText = styleNode.innerText.replace(player.style, newStyle);
  player.style = newStyle;
  player.gameSpot = location;
}

function createMarkers(){
  players.push(new PlayerInfo(1));
  players.push(new PlayerInfo(2));
  players.push(new PlayerInfo(3));
  players.push(new PlayerInfo(4));
}

function initialLoad(){
  createGraph();
  draw();
  createMarkers();
  rollDice();
}