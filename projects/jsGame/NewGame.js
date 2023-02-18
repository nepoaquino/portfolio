window.onload = function () {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  let x = 320;
  let y = 200;

  let t = Date.now();
  let speed = 400;
  let dir = 0;
  let score = 0;

  let coinx = Math.round(Math.random() * 710);
  let coiny = Math.round(Math.random() * 460);

  let left = document.getElementById("left");
  let upLeft = document.getElementById("up-left");
  let up = document.getElementById("up");
  let upRight = document.getElementById("up-right");
  let right = document.getElementById("right");
  let downRight = document.getElementById("down-right");
  let down = document.getElementById("down");
  let downLeft = document.getElementById("down-left");

  //up.onmouseover = function() { dir = 4;}
  // down.onmouseover = function() { dir = 3;}
  //left.onmouseover = function() { dir = 2;}
  // right.onmouseover = function() { dir = 1;}

  downRight.onmousedown = function () {
    dir = 8;
  };
  downLeft.onmousedown = function () {
    dir = 7;
  };
  upRight.onmousedown = function () {
    dir = 6;
  };
  upLeft.onmousedown = function () {
    dir = 5;
  };
  up.onmousedown = function () {
    dir = 4;
  };
  down.onmousedown = function () {
    dir = 3;
  };
  left.onmousedown = function () {
    dir = 2;
  };
  right.onmousedown = function () {
    dir = 1;
  };

  downRight.onmouseup = function () {
    dir = 0;
  };
  downLeft.onmouseup = function () {
    dir = 0;
  };
  upRight.onmouseup = function () {
    dir = 0;
  };
  upLeft.onmouseup = function () {
    dir = 0;
  };
  up.onmouseup = function () {
    dir = 0;
  };
  down.onmouseup = function () {
    dir = 0;
  };
  left.onmouseup = function () {
    dir = 0;
  };
  right.onmouseup = function () {
    dir = 0;
  };

  downRight.ontouchstart = function () {
    dir = 8;
  };
  downLeft.ontouchstart = function () {
    dir = 7;
  };
  upRight.ontouchstart = function () {
    dir = 6;
  };
  upLeft.ontouchstart = function () {
    dir = 5;
  };
  up.ontouchstart = function () {
    dir = 4;
  };
  down.ontouchstart = function () {
    dir = 3;
  };
  left.ontouchstart = function () {
    dir = 2;
  };
  right.ontouchstart = function () {
    dir = 1;
  };

  downRight.ontouchend = function () {
    dir = 0;
  };
  downLeft.ontouchend = function () {
    dir = 0;
  };
  upRight.ontouchend = function () {
    dir = 0;
  };
  upLeft.ontouchend = function () {
    dir = 0;
  };
  up.ontouchend = function () {
    dir = 0;
  };
  down.ontouchend = function () {
    dir = 0;
  };
  left.ontouchend = function () {
    dir = 0;
  };
  right.ontouchend = function () {
    dir = 0;
  };

  function draw() {
    var timePassed = (Date.now() - t) / 1000;
    t = Date.now();

    context.clearRect(0, 0, 750, 500);

    context.font = "25px Arial";
    context.fillStyle = "black";
    context.fillText("Score: " + score, 20, 30);

    context.beginPath();
    context.rect(x, y, 100, 100);
    context.fillStyle = "#005000";
    context.fill();

    var deg = 90;
    var rad = deg * (Math.PI / 180.0);

    context.beginPath();
    //context.arc(coinx+20, coiny+20, 20, 0, 2 * Math.PI);
    context.ellipse(
      coinx + 20,
      coiny + 20,
      20,
      15,
      90 * (Math.PI / 180.0),
      0,
      2 * Math.PI
    );
    context.fillStyle = "#E4D00A";
    context.fill();

    if (dir == 1) {
      // right direction
      if (x + 100 < 750) {
        x += speed * timePassed;
      }
    } else if (dir == 2) {
      //  left direction
      if (x > 0) {
        x -= speed * timePassed;
      }
    } else if (dir == 3) {
      // down direction
      if (y + 100 < 500) {
        y += speed * timePassed;
      }
    } else if (dir == 4) {
      // up direction
      if (y > 0) {
        y -= speed * timePassed;
      }
    } else if (dir == 5) {
      // up-left direction
      if (y > 0 && x > 0) {
        y -= (speed - 100) * timePassed;
        x -= (speed - 100) * timePassed;
      } else if (y < 0 && x > 0) {
        x -= speed * timePassed;
      } else if (x < 0 && y > 0) {
        y -= speed * timePassed;
      }
    } else if (dir == 6) {
      // up-right direction
      if (y > 0 && x + 100 < 750) {
        y -= (speed - 100) * timePassed;
        x += (speed - 100) * timePassed;
      } else if (y < 0 && x + 100 < 750) {
        x += speed * timePassed;
      } else if (y > 0 && x + 100 > 750) {
        y -= speed * timePassed;
      }
    } else if (dir == 7) {
      // down-left direction
      if (y + 100 < 500 && x > 0) {
        y += (speed - 100) * timePassed;
        x -= (speed - 100) * timePassed;
      } else if (y + 100 > 500 && x > 0) {
        x -= speed * timePassed;
      } else if (y + 100 < 500 && x < 0) {
        y += speed * timePassed;
      }
    } else if (dir == 8) {
      // down-right direction
      if (y + 100 < 500 && x + 100 < 750) {
        y += (speed - 100) * timePassed;
        x += (speed - 100) * timePassed;
      } else if (y + 100 > 500 && x + 100 < 750) {
        x += speed * timePassed;
      } else if (y + 100 < 500 && x + 100 > 750) {
        y += speed * timePassed;
      }
    }

    if (
      coinx <= x + 90 &&
      x <= coinx + 25 &&
      coiny <= y + 90 &&
      y <= coiny + 25
    ) {
      score++;
      coinx = Math.round(Math.random() * 710);
      coiny = Math.round(Math.random() * 460);
    }

    window.requestAnimationFrame(draw);
  }
  draw();
};
