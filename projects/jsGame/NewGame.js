window.onload = function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const characterWidth = 100;
  const characterHeight = 100;
  let xPosition = canvasWidth / 2 - characterWidth / 2;
  let yPosition = canvasHeight / 2 - characterHeight / 2;

  let coinXPosition = Math.round(Math.random() * (canvasWidth - 50)); // Subtract 50 (the width of the coin) from the canvasWidth to prevent the coin from going outside the canvas
  let coinYPosition = Math.round(Math.random() * (canvasHeight - 50)); // Subtract 50 (the height of the coin) from the canvasHeight to prevent the coin from going outside the canvas

  let score = 0;
  let direction = 0;

  const keyMap = {
    ArrowDown: 1,
    ArrowUp: 2,
    ArrowRight: 3,
    ArrowLeft: 4,
    ArrowUpRight: 5,
    ArrowUpLeft: 6,
    ArrowDownRight: 7,
    ArrowDownLeft: 8,
  };

  const pressedKeys = {};

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (keyMap.hasOwnProperty(key)) {
      pressedKeys[keyMap[key]] = true;
      if (pressedKeys[2] && pressedKeys[3]) {
        direction = keyMap["ArrowUpRight"];
      } else if (pressedKeys[2] && pressedKeys[4]) {
        direction = keyMap["ArrowUpLeft"];
      } else if (pressedKeys[1] && pressedKeys[3]) {
        direction = keyMap["ArrowDownRight"];
      } else if (pressedKeys[1] && pressedKeys[4]) {
        direction = keyMap["ArrowDownLeft"];
      } else {
        direction = keyMap[key];
      }
    }
  });

  document.addEventListener("keyup", (event) => {
    const key = event.key;
    if (keyMap.hasOwnProperty(key)) {
      pressedKeys[keyMap[key]] = false;
      if (pressedKeys[2] && pressedKeys[3]) {
        direction = keyMap["ArrowUpRight"];
      } else if (pressedKeys[2] && pressedKeys[4]) {
        direction = keyMap["ArrowUpLeft"];
      } else if (pressedKeys[1] && pressedKeys[3]) {
        direction = keyMap["ArrowDownRight"];
      } else if (pressedKeys[1] && pressedKeys[4]) {
        direction = keyMap["ArrowDownLeft"];
      } else if (pressedKeys[2]) {
        direction = keyMap["ArrowUp"];
      } else if (pressedKeys[3]) {
        direction = keyMap["ArrowRight"];
      } else if (pressedKeys[1]) {
        direction = keyMap["ArrowDown"];
      } else if (pressedKeys[4]) {
        direction = keyMap["ArrowLeft"];
      } else {
        direction = 0;
      }
    }
  });

  function draw() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    //Draw character
    context.beginPath();
    context.rect(xPosition, yPosition, characterWidth, characterHeight);
    context.fillStyle = "#005000";
    context.fill();

    // Draw coins
    context.beginPath();
    context.ellipse(
      coinXPosition + 20,
      coinYPosition + 20,
      20,
      15,
      (90 * Math.PI) / 180.0,
      0,
      2 * Math.PI
    );
    context.fillStyle = "#E4D00A";
    context.fill();

    const speed = (500 * (Date.now() - draw.lastTime)) / 1000;
    draw.lastTime = Date.now();

    const movements = [
      [0, 1, speed], // down
      [0, -1, speed], // up
      [1, 0, speed], // right
      [-1, 0, speed], // left
      [1, -1, speed / 1.2], // up-right
      [-1, -1, speed / 1.2], // up-left
      [1, 1, speed / 1.2], // down-right
      [-1, 1, speed / 1.2], // down-left
    ];

    if (direction) {
      const [dx, dy, s] = movements[direction - 1];
      xPosition = Math.min(
        Math.max(xPosition + dx * s, 0),
        canvasWidth - characterWidth
      );
      yPosition = Math.min(
        Math.max(yPosition + dy * s, 0),
        canvasHeight - characterHeight
      );
    }

    // Collision detection
    if (
      coinXPosition < xPosition + characterWidth &&
      coinXPosition + 40 > xPosition &&
      coinYPosition < yPosition + characterHeight &&
      coinYPosition + 40 > yPosition
    ) {
      coinXPosition = Math.round(Math.random() * (canvasWidth - 50)); // Subtract 50 (the width of the coin) from the canvasWidth to prevent the coin from going outside the canvas
      coinYPosition = Math.round(Math.random() * (canvasHeight - 50)); // Subtract 50 (the height of the coin) from the canvasHeight to prevent the coin from going outside the canvas
      score++;
    }

    // Draw Score
    context.font = "30px Arial";
    context.fillStyle = "black";
    context.fillText(`Score: ${score}`, 20, 30);

    requestAnimationFrame(draw);
  }

  draw.lastTime = Date.now();
  requestAnimationFrame(draw);
};
