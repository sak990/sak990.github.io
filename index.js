
function spotClicked(game, node) {
  game.gameSpotClicked(node);
}

class GameSpotNode {
  constructor(game, type, location, name, churchValue) {
    this.name = name;
    this.type = type;
    this.location = location;
    this.churchValue = churchValue;
    this.connections = [];

    this.element = document.createElement('figure');
    if (undefined !== churchValue) {
      this.element.innerText = `(${churchValue})${name}`;
    }
    this.element.className = `${type} ${name}`;
    this.element.id = `node${name}`;
    this.element.addEventListener('click', () => { spotClicked(game, this); });

    this.style = `.${name} { top: ${location[0]}px; left: ${location[1]}px; } \n`;
  }

  isCity() {
    return this.type === 'city';
  }

  isSea() {
    return this.type.indexOf('sea-marker') !== -1;
  }
}

class PlayerInfo {
  constructor(id, startPosition) {
    this.id = id;
    this.score = 0;

    const styleNode = document.getElementById('styleDefinitions');
    const startPos = styleNode.innerText.indexOf(`player-${id}{`);
    const endPos = styleNode.innerText.indexOf('}', startPos);
    this.baseStyle = styleNode.innerText.substr(startPos, endPos - startPos + 1);
    this.style = this.baseStyle;

    const playerNode = document.createElement('div');
    playerNode.id = `player${id}`;
    playerNode.className = `player-marker player-${id}`;
    document.getElementById('gameSpots').appendChild(playerNode);

    this.moveMarker(startPosition);
  }

  moveMarker(location) {
    const styleNode = document.getElementById('styleDefinitions');
    const newStyle = `${this.baseStyle.substr(0, this.baseStyle.length - 1)}position: absolute; top: ${location.location[0]}px; left: ${location.location[1] + 40}px; }`;
    styleNode.innerText = styleNode.innerText.replace(this.style, newStyle);
    this.style = newStyle;
    this.gameSpot = location;
  }
}

class ChurchInfo {
  constructor(player, city) {
    this.value = city.churchValue;
    this.player = player.id - 1;

    const styleNode = document.getElementById('styleDefinitions');

    const newStyle = `.church-player-${player.id}${city.name}{ position: absolute; top: ${city.location[0] + 15}px; left: ${city.location[1] + 45 + (player.id * 5)}px; }`;
    styleNode.innerText += newStyle;
    this.style = newStyle;

    const churchMarker = document.createElement('div');
    churchMarker.id = `churchPlayer${player.id}${city.name}`;
    churchMarker.className = `church-marker player-${player.id}-church church-player-${player.id}${city.name}`;
    churchMarker.innerText = city.churchValue;
    document.getElementById('gameSpots').appendChild(churchMarker);

    this.id = churchMarker.id;
  }
}

class Game {
  constructor(numPlayers) {
    this.root = new GameSpotNode(this, 'city', [310, 200], 'Rome', 6);
    this.players = [];
    this.startPosition = null;
    this.currentPlayer = 0;
    this.diceRoll = 0;
    this.currentSet = null;
    this.activeChurches = new Set();
    this.currentRound = 1;

    this.createGraph();
    this.draw();
    this.createMarkers(numPlayers);
    this.rollDice();
  }

  createGraph() {
    const rome = this.root;
    const thessalonica = new GameSpotNode(this, 'city', [290, 620], 'Thessalonica', 3);
    const berea = new GameSpotNode(this, 'city', [300, 560], 'Berea', 2);
    const corinth = new GameSpotNode(this, 'city', [430, 650], 'Corinth', 3);
    const philippi = new GameSpotNode(this, 'city', [245, 675], 'Philippi', 3);
    const ephesus = new GameSpotNode(this, 'city', [370, 840], 'Ephesus', 2);
    const cyprus = new GameSpotNode(this, 'city', [435, 1145], 'Cyprus', 3);
    const ichonium = new GameSpotNode(this, 'city', [330, 1060], 'Ichonium', 3);
    const antioch = new GameSpotNode(this, 'city', [370, 1260], 'Antioch', 3);
    const damascus = new GameSpotNode(this, 'city', [450, 1350], 'Damascus', 3);
    const jerusalem = new GameSpotNode(this, 'city', [550, 1330], 'Jerusalem', 2);
    const sidon = new GameSpotNode(this, 'city', [460, 1275], 'Sidon', 2);
    const caesarea = new GameSpotNode(this, 'city', [520, 1280], 'Caesarea', 1);
    const colossae = new GameSpotNode(this, 'city', [380, 940], 'Colossae', 3);
    const philadelphia = new GameSpotNode(this, 'city', [330, 890], 'Philadelphia', 4);
    this.startPosition = jerusalem;

    this.connectCities(rome, philippi, 'land', [[180, 120], [80, 160], [100, 300], [140, 400], [170, 500], [200, 600]]);
    this.connectCities(rome, caesarea, 'sea', [[420, 270], [520, 370], [570, 550], [600, 730], [600, 910], [570, 1090]]);
    this.connectCities(rome, corinth, 'sea', [[420, 290], [510, 380], [530, 540], [520, 700]]);
    this.connectCities(philippi, corinth, 'sea', [[350, 670]]);
    this.connectCities(corinth, ephesus, 'sea', [[400, 750]]);
    this.connectCities(corinth, cyprus, 'sea', [[510, 770], [510, 1000]]);
    this.connectCities(ephesus, cyprus, 'sea', [[470, 830]]);
    this.connectCities(ephesus, antioch, 'sea', [[440, 850], [440, 1000]]);
    this.connectCities(cyprus, antioch, 'sea', [[410, 1200]]);
    this.connectCities(cyprus, caesarea, 'sea', [[480, 1200]]);
    this.connectCities(antioch, caesarea, 'sea', [[450, 1230]]);
    this.connectCities(philippi, thessalonica, 'land', [[270, 650]]);
    this.connectCities(thessalonica, berea, 'land', []);
    this.connectCities(berea, corinth, 'land', [[350, 570], [390, 580]]);
    this.connectCities(thessalonica, corinth, 'land', [[310, 590], [350, 595], [390, 600]]);
    this.connectCities(philippi, ephesus, 'land', [[250, 730], [270, 780], [310, 810], [340, 830]]);
    this.connectCities(philippi, philadelphia, 'land', [[235, 730], [255, 785], [290, 840], [320, 870]]);
    this.connectCities(ephesus, colossae, 'land', [[380, 900]]);
    this.connectCities(colossae, ichonium, 'land', [[370, 990], [350, 1020]]);
    this.connectCities(philadelphia, ichonium, 'land', [[340, 940], [340, 1000]]);
    this.connectCities(ichonium, antioch, 'land', [[310, 1140], [300, 1230], [340, 1260]]);
    this.connectCities(antioch, sidon, 'land', [[410, 1270], [440, 1275]]);
    this.connectCities(sidon, caesarea, 'land', [[500, 1280]]);
    this.connectCities(caesarea, jerusalem, 'land', []);
    this.connectCities(sidon, damascus, 'land', [[460, 1320]]);
    this.connectCities(damascus, jerusalem, 'land', [[500, 1350], [530, 1340]]);
  }

  connectCities(city1, city2, pathType, path) {
    let index = 0;
    let lastNode = city1;
    for (const entry of path) {
      const newNode = new GameSpotNode(
        this,
        `movement-marker ${pathType}-marker`,
        entry,
        city1.name + city2.name + index,
      );
      Game.connectNodes(lastNode, newNode);
      index += 1;
      lastNode = newNode;
    }
    Game.connectNodes(lastNode, city2);
  }

  static connectNodes(node1, node2) {
    node1.connections.push(node2);
    node2.connections.push(node1);
  }

  rollDice() {
    this.diceRoll = Math.trunc((Math.random() * 6) + 1);
    document.getElementById('diceRoll').innerText = `Current dice roll: ${this.diceRoll}`;
  }

  draw() {
    this.drawnNodes = new Set();
    this.drawNode(this.root);
  }

  drawNode(node) {
    const styleElement = document.getElementById('styleDefinitions');
    const gameSpots = document.getElementById('gameSpots');

    if (this.drawnNodes.has(node.element.id)) { return; }

    this.drawnNodes.add(node.element.id);
    gameSpots.appendChild(node.element);
    styleElement.innerText += node.style;

    for (const child of node.connections) {
      if (!this.drawnNodes.has(child.element.id)) {
        const lineWidth = 2;
        const x1 = node.location[1];
        const x2 = child.location[1];
        const y1 = node.location[0];
        const y2 = child.location[0];

        const routeArea = `${child.name}-${node.name}-area`;

        const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineElement.setAttribute('id', `line${routeArea}`);
        lineElement.setAttribute('x1', x1);
        lineElement.setAttribute('y1', y1);
        lineElement.setAttribute('x2', x2);
        lineElement.setAttribute('y2', y2);
        if (child.element.className.indexOf('sea') !== -1 || node.element.className.indexOf('sea') !== -1) {
          lineElement.setAttribute('stroke', 'white');
        } else {
          lineElement.setAttribute('stroke', 'brown');
        }
        lineElement.setAttribute('stroke-width', lineWidth);
        document.getElementById('svgNode').appendChild(lineElement);
      }
    }
    node.connections.forEach((child) => {
      if (!this.drawnNodes.has(child.element.id)) {
        this.drawNode(child);
      }
    });
  }

  createMarkers(numPlayers) {
    let i = 0;
    for (; i < numPlayers; i += 1) {
      this.players.push(new PlayerInfo(i + 1, this.startPosition));
    }
  }

  gameSpotClicked(node) {
    document.getElementById('seaTravel').innerText = 'Sea travel succeed: ';

    this.currentSet = new Set();
    if (!this.canMove(node, this.diceRoll)) {
      return;
    }

    if (!node.isSea() || Game.checkForSeaTravel()) {
      this.players[this.currentPlayer].moveMarker(node);

      if (node.isCity()) {
        this.plantChurch(this.players[this.currentPlayer], node);
      }
    }

    this.updatePlayer();
    this.rollDice();
  }

  static checkForSeaTravel() {
    const success = Math.trunc(Math.random() * 3) === 0;

    document.getElementById('seaTravel').innerText = `Sea travel succeed: ${success}`;
    return success;
  }

  updatePlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer % this.players.length === 0) {
      this.startNewRound();
    }
    this.currentPlayer %= this.players.length;
    document.getElementById('currentPlayer').innerText = `Current player: ${this.currentPlayer + 1}`;
  }

  startNewRound() {
    this.updateScore();
    this.currentRound += 1;
    document.getElementById('currentRound').innerText = `Current round: ${this.currentRound}`;
  }

  updateScore() {
    for (const church of this.activeChurches) {
      this.players[church.player].score += church.value;
      church.value -= 1;
      if (church.value === 0) {
        const churchElement = document.getElementById(church.id);
        churchElement.parentNode.removeChild(churchElement);
        this.activeChurches.delete(church);
      } else {
        document.getElementById(church.id).innerText = church.value;
      }
    }
  }

  plantChurch(player, city) {
    this.activeChurches.add(new ChurchInfo(player, city));
  }

  canMove(node, depth) {
    if (depth <= 0) {
      return false;
    }

    if (this.currentSet.has(node.element.id)) { return false; }

    for (const child of node.connections) {
      if (this.players[this.currentPlayer].gameSpot.element.id === child.element.id) {
        return true;
      }

      this.currentSet.add(node.element.id);
      if (this.canMove(child, depth - 1)) { return true; }
      this.currentSet.delete(node.element.id);
    }

    return false;
  }
}

const currentGame = new Game(4);
