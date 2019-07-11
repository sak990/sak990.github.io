

function spotClicked(node) {
  moveMarker(players[0], node)
}

class GameSpotNode {
  constructor(type, location, name, printTitle) {
    this.name = name;
    this.type = type;
    this.location = location;
    this.connections = [];

    this.element = document.createElement("figure");
    if(printTitle)
    {
      this.element.innerText = name;
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
  }
}

const root = new GameSpotNode("city", [310, 200], "Rome", true);
let players = [];
let startPosition = null;

function createGraph(){
  const rome = root;
  const thessalonica = new GameSpotNode("city", [290, 620], "Thessalonica", true);
  const berea = new GameSpotNode("city", [300, 560], "Berea", true);
  const corinth = new GameSpotNode("city", [430, 650], "Corinth", true);
  const philippi = new GameSpotNode("city", [245, 675], "Philippi", true);
  const ephesus = new GameSpotNode("city", [370, 840], "Ephesus", true);
  const cyprus = new GameSpotNode("city", [435, 1145], "Cyprus", true);
  const ichonium = new GameSpotNode("city", [330, 1060], "Ichonium", true);
  const antioch = new GameSpotNode("city", [370, 1260], "Antioch", true);
  const damascus = new GameSpotNode("city", [450, 1350], "Damascus", true);
  const jerusalem = new GameSpotNode("city", [550, 1330], "Jerusalem", true);
  const sidon = new GameSpotNode("city", [460, 1275], "Sidon", true);
  const caesarea = new GameSpotNode("city", [520, 1280], "Caesarea", true);
  const colossae = new GameSpotNode("city", [380, 940], "Colossae", true);
  const philadelphia = new GameSpotNode("city", [330, 890], "Philadelphia", true);
  startPosition = jerusalem;
  
  const romePhilippi0 = new GameSpotNode("movement-marker land-marker", [270, 200], "RomePhilippi0");
  connectNodes(rome, romePhilippi0);
  const romePhilippi1 = new GameSpotNode("movement-marker land-marker", [200, 300], "RomePhilippi1");
  connectNodes(romePhilippi0, romePhilippi1);
  const romePhilippi2 = new GameSpotNode("movement-marker land-marker", [200, 400], "RomePhilippi2");
  connectNodes(romePhilippi1, romePhilippi2);
  const romePhilippi3 = new GameSpotNode("movement-marker land-marker", [200, 450], "RomePhilippi3");
  connectNodes(romePhilippi2, romePhilippi3);
  const romePhilippi4 = new GameSpotNode("movement-marker land-marker", [200, 500], "RomePhilippi4");
  connectNodes(romePhilippi3, romePhilippi4);
  const romePhilippi5 = new GameSpotNode("movement-marker land-marker", [200, 600], "RomePhilippi5");
  connectNodes(romePhilippi4, romePhilippi5);
  connectNodes(romePhilippi5, philippi);
  
  const romeCaesarea0 = new GameSpotNode("movement-marker sea-marker", [370, 200], "RomeCaesarea0");
  connectNodes(rome, romeCaesarea0);
  const romeCaesarea1 = new GameSpotNode("movement-marker sea-marker", [450, 300], "RomeCaesarea1");
  connectNodes(romeCaesarea0, romeCaesarea1);
  const romeCaesarea2 = new GameSpotNode("movement-marker sea-marker", [500, 400], "RomeCaesarea2");
  connectNodes(romeCaesarea1, romeCaesarea2);
  const romeCaesarea3 = new GameSpotNode("movement-marker sea-marker", [600, 550], "RomeCaesarea3");
  connectNodes(romeCaesarea2, romeCaesarea3);
  const romeCaesarea4 = new GameSpotNode("movement-marker sea-marker", [600, 700], "RomeCaesarea4");
  connectNodes(romeCaesarea3, romeCaesarea4);
  const romeCaesarea5 = new GameSpotNode("movement-marker sea-marker", [600, 800], "RomeCaesarea5");
  connectNodes(romeCaesarea4, romeCaesarea5);
  connectNodes(romeCaesarea5, caesarea);

  const romeCorinth0 = new GameSpotNode("movement-marker sea-marker", [370, 220], "RomeCorinth0");
  connectNodes(rome, romeCorinth0);
  const romeCorinth1 = new GameSpotNode("movement-marker sea-marker", [450, 320], "RomeCorinth1");
  connectNodes(romeCaesarea0, romeCorinth1);
  const romeCorinth2 = new GameSpotNode("movement-marker sea-marker", [500, 420], "RomeCorinth2");
  connectNodes(romeCaesarea1, romeCorinth2);
  const romeCorinth3 = new GameSpotNode("movement-marker sea-marker", [500, 500], "RomeCorinth3");
  connectNodes(romeCorinth2, romeCorinth3);
  connectNodes(romeCorinth3, corinth);

  const philippiCorinth0 = new GameSpotNode("movement-marker sea-marker", [350, 670], "PhilippiCorinth0");
  connectNodes(philippi, philippiCorinth0);
  connectNodes(philippiCorinth0, corinth);


  const corinthEphesus0 = new GameSpotNode("movement-marker sea-marker", [400, 750], "CorinthEphesus0");
  connectNodes(corinth, corinthEphesus0);
  connectNodes(corinthEphesus0, ephesus);


  const corinthCyprus0 = new GameSpotNode("movement-marker sea-marker", [450, 770], "CorinthCyprus0");
  connectNodes(corinth, corinthCyprus0);
  const corinthCyprus1 = new GameSpotNode("movement-marker sea-marker", [460, 1000], "CorinthCyprus1");
  connectNodes(corinthCyprus0, corinthCyprus1);
  connectNodes(corinthCyprus1, cyprus);

  const ephesusCyprus0 = new GameSpotNode("movement-marker sea-marker", [430, 1000], "EphesusCyprus0");
  connectNodes(ephesus, ephesusCyprus0);
  connectNodes(ephesusCyprus0, cyprus);

  const ephesusAntioch0 = new GameSpotNode("movement-marker sea-marker", [410, 1000], "EphesusAntioch0");
  connectNodes(ephesus, ephesusAntioch0);
  const ephesusAntioch1 = new GameSpotNode("movement-marker sea-marker", [390, 1200], "EphesusAntioch1");
  connectNodes(ephesusAntioch0, ephesusAntioch1);
  connectNodes(ephesusAntioch0, antioch);

  const cyprusAntioch0 = new GameSpotNode("movement-marker sea-marker", [410, 1200], "CyprusAntioch0");
  connectNodes(cyprus, cyprusAntioch0);
  connectNodes(cyprusAntioch0, antioch);

  const cyprusCaesarea0 = new GameSpotNode("movement-marker sea-marker", [500, 1200], "CyprusCaesarea0");
  connectNodes(cyprus, cyprusCaesarea0);
  connectNodes(cyprusCaesarea0, caesarea);

  const antiochCaesarea0 = new GameSpotNode("movement-marker sea-marker", [460, 1250], "AntiochCaesarea0");
  connectNodes(antioch, antiochCaesarea0);
  connectNodes(antiochCaesarea0, caesarea);

  const philippiThessalonica0 = new GameSpotNode("movement-marker land-marker", [270, 650], "PhilippiThessalonica0");
  connectNodes(philippi, philippiThessalonica0);
  connectNodes(philippiThessalonica0, thessalonica);

  connectNodes(thessalonica, berea);

  const bereaCorinth0 = new GameSpotNode("movement-marker land-marker", [350, 590], "BereaCorinth0");
  connectNodes(berea, bereaCorinth0);
  const bereaCorinth1 = new GameSpotNode("movement-marker land-marker", [390, 600], "BereaCorinth1");
  connectNodes(bereaCorinth0, bereaCorinth1);
  connectNodes(bereaCorinth1, corinth);

  const thessalonicaCorinth0 = new GameSpotNode("movement-marker land-marker", [340, 610], "ThessalonicaCorinth0");
  connectNodes(thessalonica, thessalonicaCorinth0);
  const thessalonicaCorinth1 = new GameSpotNode("movement-marker land-marker", [380, 620], "ThessalonicaCorinth1");
  connectNodes(thessalonicaCorinth0, thessalonicaCorinth1);
  const thessalonicaCorinth2 = new GameSpotNode("movement-marker land-marker", [420, 630], "ThessalonicaCorinth2");
  connectNodes(thessalonicaCorinth1, thessalonicaCorinth2);
  connectNodes(thessalonicaCorinth2, corinth);

  const philippiEphesus0 = new GameSpotNode("movement-marker land-marker", [250, 730], "PhilippiEphesus0");
  connectNodes(philippi, philippiEphesus0);
  const philippiEphesus1 = new GameSpotNode("movement-marker land-marker", [270, 780], "PhilippiEphesus1");
  connectNodes(philippiEphesus0, philippiEphesus1);
  const philippiEphesus2 = new GameSpotNode("movement-marker land-marker", [310, 810], "PhilippiEphesus2");
  connectNodes(philippiEphesus1, philippiEphesus2);
  const philippiEphesus3 = new GameSpotNode("movement-marker land-marker", [340, 830], "PhilippiEphesus3");
  connectNodes(philippiEphesus2, philippiEphesus3);
  connectNodes(philippiEphesus3, ephesus);

  const philippiPhiladelphia0 = new GameSpotNode("movement-marker land-marker", [235, 730], "PhilippiPhiladelphia0");
  connectNodes(philippi, philippiPhiladelphia0);
  const philippiPhiladelphia1 = new GameSpotNode("movement-marker land-marker", [255, 785], "PhilippiPhiladelphia1");
  connectNodes(philippiEphesus0, philippiPhiladelphia1);
  const philippiPhiladelphia2 = new GameSpotNode("movement-marker land-marker", [290, 840], "PhilippiPhiladelphia2");
  connectNodes(philippiEphesus1, philippiPhiladelphia2);
  const philippiPhiladelphia3 = new GameSpotNode("movement-marker land-marker", [320, 870], "PhilippiPhiladelphia3");
  connectNodes(philippiPhiladelphia2, philippiPhiladelphia3);
  connectNodes(philippiPhiladelphia3, philadelphia);

  const ephesusColossae0 = new GameSpotNode("movement-marker land-marker", [380, 900], "EphesusColossae0");
  connectNodes(ephesus, ephesusColossae0);
  connectNodes(ephesusColossae0, colossae);

  const colossaeIchonium0 = new GameSpotNode("movement-marker land-marker", [370, 990], "ColossaeIchonium0");
  connectNodes(colossae, colossaeIchonium0);
  const colossaeIchonium1 = new GameSpotNode("movement-marker land-marker", [350, 1020], "ColossaeIchonium1");
  connectNodes(colossaeIchonium0, colossaeIchonium1);
  connectNodes(colossaeIchonium1, ichonium);

  const philadelphiaIchonium0 = new GameSpotNode("movement-marker land-marker", [340, 940], "PhiladelphiaIchonium0");
  connectNodes(philadelphia, philadelphiaIchonium0);
  const philadelphiaIchonium1 = new GameSpotNode("movement-marker land-marker", [340, 1000], "PhiladelphiaIchonium1");
  connectNodes(philadelphiaIchonium0, philadelphiaIchonium1);
  connectNodes(philadelphiaIchonium1, ichonium);

  const ichoniumAntioch0 = new GameSpotNode("movement-marker land-marker", [310, 1140], "IchoniumAntioch0");
  connectNodes(ichonium, ichoniumAntioch0);
  const ichoniumAntioch1 = new GameSpotNode("movement-marker land-marker", [300, 1230], "IchoniumAntioch1");
  connectNodes(ichoniumAntioch0, ichoniumAntioch1);
  const ichoniumAntioch2 = new GameSpotNode("movement-marker land-marker", [340, 1260], "IchoniumAntioch2");
  connectNodes(ichoniumAntioch1, ichoniumAntioch2);
  connectNodes(ichoniumAntioch1, antioch);

  const antiochSidon0 = new GameSpotNode("movement-marker land-marker", [410, 1270], "AntiochSidon0");
  connectNodes(antioch, antiochSidon0);
  const antiochSidon1 = new GameSpotNode("movement-marker land-marker", [440, 1275], "AntiochSidon1");
  connectNodes(antiochSidon0, antiochSidon1);
  connectNodes(antiochSidon1, sidon);

  const sidonCaesarea0 = new GameSpotNode("movement-marker land-marker", [500, 1280], "SidonCaesarea0");
  connectNodes(sidon, sidonCaesarea0);
  connectNodes(sidonCaesarea0, caesarea);

  connectNodes(caesarea, jerusalem);
  
  const sidonDamascus0 = new GameSpotNode("movement-marker land-marker", [460, 1320], "SidonDamascus0");
  connectNodes(sidon, sidonDamascus0);
  connectNodes(sidonDamascus0, damascus);

  const damascusJerusalem0 = new GameSpotNode("movement-marker land-marker", [500, 1350], "DamascusJerusalem0");
  connectNodes(damascus, damascusJerusalem0);
  const damascusJerusalem1 = new GameSpotNode("movement-marker land-marker", [530, 1340], "DamascusJerusalem1");
  connectNodes(damascusJerusalem0, damascusJerusalem1);
  connectNodes(damascusJerusalem1, jerusalem);

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
}

function createMarkers(){
  players.push(new PlayerInfo(1));
  moveMarker(players[0], startPosition);
}

function initialLoad(){
  createGraph();
  draw();
  createMarkers();
}