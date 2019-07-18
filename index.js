

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
    this.score = 0;
    
    let styleNode = document.getElementById("styleDefinitions");
    let startPos = styleNode.innerText.indexOf("player-" + id + "{");
    let endPos = styleNode.innerText.indexOf("}", startPos);
    this.baseStyle = styleNode.innerText.substr(startPos, endPos - startPos + 1);
    this.style = this.baseStyle;
    
    let playerNode = document.createElement("div");
    playerNode.id = "player" + id;
    playerNode.className = "player-marker player-" + id;
    document.getElementById("gameSpots").appendChild(playerNode);
    
    moveMarker(this, startPosition);
  }
}

class ChurchInfo{
  constructor(player, city){
    this.value = city.churchValue;
    this.player = player.id - 1;
    
    let styleNode = document.getElementById("styleDefinitions");
    
    let newStyle = ".church-player-" + player.id + city.name + "{ position: absolute; top: " + (city.location[0] + 15) + "px; left: " + (city.location[1] + 45 + (player.id * 5)) + "px; }";
    styleNode.innerText = styleNode.innerText + newStyle;
    this.style = newStyle;

    let churchMarker = document.createElement("div");
    churchMarker.id = "churchPlayer" + player.id + city.name;
    churchMarker.className = "church-marker player-" + player.id + "-church church-player-" + player.id + city.name;
    churchMarker.innerText = city.churchValue;
    document.getElementById("gameSpots").appendChild(churchMarker);
    
    this.id = churchMarker.id;
  }
}

const root = new GameSpotNode("city", [310, 200], "Rome", 6);
let players = [];
let startPosition = null;
let currentPlayer = 0;
let diceRoll = 0;
let currentSet = null;
let activeChurches = new Set();
let currentRound = 1;

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
      plantChurch(players[currentPlayer], node);
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
  currentPlayer = (currentPlayer + 1);
  if(0 == currentPlayer % players.length)
  {
    startNewRound();
  }
  currentPlayer = currentPlayer % players.length;
  document.getElementById("currentPlayer").innerText = "Current player: " + (currentPlayer + 1);
}

function startNewRound(){
  updateScore();
  currentRound++;
  document.getElementById("currentRound").innerText = "Current round: " + currentRound;
}

function updateScore(){
  for(let church of activeChurches)
  {
    players[church.player].score += church.value;
    church.value--;
    if(0 == church.value)
    {
      let churchElement = document.getElementById(church.id)
      churchElement.parentNode.removeChild(churchElement);
      activeChurches.delete(church);
    }
    else
    {
      document.getElementById(church.id).innerText = church.value;
    }
  }
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

function plantChurch(player, city){
  activeChurches.add(new ChurchInfo(player, city));
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
  
  connectCities(rome, philippi, "land", [[180, 120], [80, 160], [100, 300], [140, 400], [170, 500], [200, 600]]);
  connectCities(rome, caesarea, "sea", [[420, 270], [520, 370], [570, 550], [600, 730], [600, 910], [570, 1090]]);
  connectCities(rome, corinth, "sea", [[420, 290], [510, 380], [530, 540], [520, 700]]);
  connectCities(philippi, corinth, "sea", [[350, 670]]);
  connectCities(corinth, ephesus, "sea", [[400, 750]]);
  connectCities(corinth, cyprus, "sea", [[510, 770], [510, 1000]]);
  connectCities(ephesus, cyprus, "sea", [[470, 830]]);
  connectCities(ephesus, antioch, "sea", [[440, 850], [440, 1000]]);
  connectCities(cyprus, antioch, "sea", [[410, 1200]]);
  connectCities(cyprus, caesarea, "sea", [[480, 1200]]);
  connectCities(antioch, caesarea, "sea", [[450, 1230]]);
  connectCities(philippi, thessalonica, "land", [[270, 650]]);
  connectCities(thessalonica, berea, "land", []);
  connectCities(berea, corinth, "land", [[350, 570], [390, 580]]);
  connectCities(thessalonica, corinth, "land", [[310, 590], [350, 595], [390, 600]]);
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
    lastNode = newNode;
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

function drawNode(node){

  let styleElement = document.getElementById("styleDefinitions");
  let gameSpots = document.getElementById("gameSpots");
  
  if(drawnNodes.has(node.element.id)) 
  { return; }

  drawnNodes.add(node.element.id);
  gameSpots.appendChild(node.element);
  styleElement.innerText = styleElement.innerText + node.style;

  for(let child of node.connections)
  {
    if(!drawnNodes.has(child.element.id)) 
    { 
      const lineWidth = 2;
      let x1 = node.location[1];
      let x2 = child.location[1];
      let y1 = node.location[0];
      let y2 = child.location[0];

      let routeArea = child.name + "-" + node.name + "-area";
      
      let lineElement = document.createElementNS('http://www.w3.org/2000/svg','line');
      lineElement.setAttribute("id", "line" + routeArea);
      lineElement.setAttribute("x1", x1);
      lineElement.setAttribute("y1", y1);
      lineElement.setAttribute("x2", x2);
      lineElement.setAttribute("y2", y2);
      if(-1 != child.element.className.indexOf("sea") || -1 != node.element.className.indexOf("sea"))
      {
        lineElement.setAttribute("stroke", "white");
      }
      else
      {
        lineElement.setAttribute("stroke", "brown");
      }
      lineElement.setAttribute("stroke-width", lineWidth);
      document.getElementById("svgNode").appendChild(lineElement);
    }
  }
  for(let child of node.connections)
  {
    if(!drawnNodes.has(child.element.id)) 
    { 
      drawNode(child);
    }
  }
}

function moveMarker(player, location){
  let styleNode = document.getElementById("styleDefinitions");
  let newStyle = player.baseStyle.substr(0, player.baseStyle.length - 1) + "position: absolute; top: " + (location.location[0]) + "px; left: " + (location.location[1] + 40) + "px; }";
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