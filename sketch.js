// data visualization

let data;
let dragging = false;
let offsetX, offsetY; // mouse X and Y offset from the ellipse center
let ellipseX;
let ellipseY;
let CreditToggle = false;
let AssistToggle = false;
let dAssist, dCredit;

let assistX;
let assistY;
let creditX;
let creditY;
let rectW;
let rectH;

let ellipseSize;
let fillColor;
let barColors;

let infoX;
let infoY;
let infoSize;
let showInfo = false;

let funFactNum;
let currentFact;
let starX;
let starY;
let starSize;
let showFunFact = false;
let starPos; // The star's position
let starVel; // The star's velocity
let resetTimer = 0;

function preload() {
  data = loadTable("data.csv", "csv", "header");
  background = loadImage("Assets/background.png"); // Load the bg image
  funFact1 = loadImage("Assets/ff1.PNG");
  funFact2 = loadImage("Assets/ff2.PNG");
  funFact3 = loadImage("Assets/ff3.PNG");
  funFact4 = loadImage("Assets/ff4.PNG");
  funFact5 = loadImage("Assets/ff5.PNG");
  star = loadImage("Assets/star.png");
  infoIcon = loadImage("Assets/infoIcon.png");
  infoPage = loadImage("Assets/info.png");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  assistX = width * 0.6;
  assistY = height * 0.9;
  creditX = width * 0.4;
  creditY = height * 0.9;
  rectW = width * 0.18;
  rectH = height * 0.17;
  ellipseX = width * 0.205;
  ellipseY = height * 0.76;
  fillColor = 255;
  funFactNum = 1;
  barColors = Array(39).fill(255);

  infoX = width * 0.2;
  infoY = height * 0.2;
  infoSize = width * 0.02;

  starPos = createVector(width / 2, height / 2); // Start the star in the middle of the canvas
  starVel = p5.Vector.random2D(); // Create a random 2D vector
  starVel.mult(5); // Slow down the star
}

function draw() {
  image(background, 0, 0, windowWidth, windowHeight);
  let numRows = data.getRowCount();
  let Title = data.getColumn(0);
  let Year = data.getColumn(1);
  let NumWomen = data.getColumn(2);
  let NumUncredit = data.getColumn(3);
  let NumAssist = data.getColumn(4);
  let NumDirect = data.getColumn(5);

  let maxNumWomen = max(NumWomen); // get the maximum number of women

  //Assist button -----------------------------------------------------------
  push();
  rectMode(CENTER);
  dAssist = dist(mouseX, mouseY, assistX, assistY);

  fill(149, 184, 204);
  noFill();
  noStroke();
  rect(assistX, assistY, rectW, rectH);

  // Credit button -----------------------------------------------------------
  dCredit = dist(mouseX, mouseY, creditX, creditY);

  fill(206, 66, 87);
  noFill();
  noStroke();
  rect(creditX, creditY, rectW, rectH);
  pop();

  // Display bar chart ---------------------------------------------------------
  for (let i = 0; i < numRows; i++) {
    let y = height - width * 0.17;
    let rectWidth = width * 0.01;
    let rectHeight = map(NumWomen[i], 0, maxNumWomen, 0, height * 0.4); // map from 0 to maxNumWomen
    let x = i * (rectWidth + width * 0.005);

    fill(255); // Use the color from the array
    rect(x + width * 0.2, y - rectHeight, rectWidth, rectHeight); //x, y, w, h

    // Display the year
    fill(0); // Change the color of the text
    push(); // Save the current transformation matrix
    translate(x + width * 0.208, y + width * 0.03); // Move the origin to the point where the text is drawn
    rotate(-HALF_PI); // Rotate 90 degrees counterclockwise
    text(Year[i], 0, 0); // Display the year at the new origin
    pop(); // Restore the transformation matrix
  }

  // Display credit chart ---------------------------------------------------------
  if (CreditToggle) {
    // if the user toggles the credit button
    // display the credit percentages
    for (let i = 0; i < numRows; i++) {
      fill(246, 66, 87);
      finalCreditNum = NumUncredit[i] * NumWomen[i] * 0.01;
      let y = height - width * 0.17;
      let rectWidth = width * 0.01;
      let rectHeight = map(finalCreditNum, 0, maxNumWomen, 0, height * 0.4); // map from 0 to maxNumWomen
      let x = i * (rectWidth + width * 0.005);

      rect(x + width * 0.2, y - rectHeight, rectWidth, rectHeight); //x, y, w, h
    }
  }

  // Display assistant chart ---------------------------------------------------------
  if (AssistToggle) {
    // if the user toggles the assist button
    // display the assistant percentages
    for (let i = 0; i < numRows; i++) {
      // AssistToggle rectangles
      fill(49, 84, 244);
      finalAssistNum = NumAssist[i] * NumWomen[i] * 0.01;
      let y = height - width * 0.17;
      let rectWidth = width * 0.01;
      let rectHeight = map(finalAssistNum, 0, maxNumWomen, 0, height * 0.4); // map from 0 to maxNumWomen
      let x = i * (rectWidth + width * 0.005);

      rect(x + width * 0.2, y - rectHeight, rectWidth, rectHeight); //x, y, w, h
    }
  }

  if (AssistToggle) {
    // for displaying Directing data
    for (let i = 0; i < numRows; i++) {
      // coordinates will be numwomen's height - numdirect's height and size
      // will be numdirect's height
      fill(242, 197, 124);
      finalDirectNum = NumDirect[i] * NumWomen[i] * 0.01;
      let rectWidth = width * 0.01;
      let rectHeight = map(finalDirectNum, 0, maxNumWomen, 0, height * 0.4); // map from 0 to maxNumWomen
      let x = i * (rectWidth + width * 0.005);
      let y =
        height -
        width * 0.17 -
        map(NumWomen[i], 0, maxNumWomen, 0, height * 0.4); // map from 0 to maxNumWomen

      rect(x + width * 0.2, y + rectHeight, rectWidth, -rectHeight); //x, y, w, h
    }
  }

  //noLoop();

  // Display bar chart ---------------------------------------------------------
  for (let i = 0; i < numRows; i++) {
    let y = height - width * 0.17;
    let rectWidth = width * 0.01;
    let rectHeight = map(NumWomen[i], 0, maxNumWomen, 0, height * 0.4); // map from 0 to maxNumWomen
    let x = i * (rectWidth + width * 0.005);

    if (
      ellipseX >= x + width * 0.197 &&
      ellipseX <= x + width * 0.202 + rectWidth
    ) {
      barColors[i] = 0; // Change the color of the bar to black
      push();
      textSize(15);
      fill(0);
      text("Title of Film: " + Title[i], width * 0.2, width * 0.15);
      text(
        "Number of Female Animators: " + NumWomen[i],
        width * 0.2,
        width * 0.17
      );
      fill(200, 40, 20);
      text("Percent Uncredited: " + NumUncredit[i], width * 0.2, width * 0.19);
      fill(40, 20, 200);
      text(
        "Percent in Assistant Animator roles: " + NumAssist[i],
        width * 0.2,
        width * 0.21
      );
      fill(126, 84, 17);
      text(
        "Percent in Directing/Supervising Animator roles: " + NumDirect[i],
        width * 0.2,
        width * 0.23
      );
      pop();
      image(infoIcon, infoX, infoY, infoSize, infoSize);
    } else if (barColors[i] < 255) {
      barColors[i] += 5; // Gradually change the color back to white only if it's not already white
    }

    fill(barColors[i], barColors[i], barColors[i], 140); // Use the color from the array
    rect(x + width * 0.2, y - rectHeight, rectWidth, rectHeight); //x, y, w, h
    triangle(
      x + width * 0.2,
      y - rectHeight,
      x + width * 0.21,
      y - rectHeight,
      x + width * 0.205,
      y - rectHeight - 20
    );
    // Create a smaller black triangle at the top tip of each triangle
    push();
    fill(0);
    triangle(
      x + width * 0.203,
      y - rectHeight - 10,
      x + width * 0.207,
      y - rectHeight - 10,
      x + width * 0.2055,
      y - rectHeight - 19
    );
    pop();

    // Display the year
    fill(0); // Change the color of the text
    push(); // Save the current transformation matrix
    translate(x + width * 0.208, y + width * 0.03); // Move the origin to the point where the text is drawn
    rotate(-HALF_PI); // Rotate 90 degrees counterclockwise
    text(Year[i], 0, 0); // Display the year at the new origin

    pop(); // Restore the transformation matrix
  }

  fill(200); // Set the fill color to a light gray
  //noStroke(); // No border
  rect(width * 0.2, height * 0.75, width * 0.565, height * 0.017, 10);
  fill(0);
  ellipseSize = width * 0.02;
  ellipse(ellipseX, ellipseY, ellipseSize, ellipseSize);

  if (showFunFact) {
    if (funFactNum == 1) {
      image(funFact1, 0, 0, windowWidth, windowHeight);
    }
    if (funFactNum == 2) {
      image(funFact2, 0, 0, windowWidth, windowHeight);
    }
    if (funFactNum == 3) {
      image(funFact3, 0, 0, windowWidth, windowHeight);
    }
    if (funFactNum == 4) {
      image(funFact4, 0, 0, windowWidth, windowHeight);
    }
    if (funFactNum == 5) {
      image(funFact5, 0, 0, windowWidth, windowHeight);
    }
  }

  if (showInfo) {
    image(infoPage, 0, 0, windowWidth, windowHeight);
  }

  // Display the star
  starSize = width * 0.07;
  fill(0, 255, 0);

  starPos.add(starVel);
  image(star, starPos.x, starPos.y, starSize, starSize);

  // If the star is off the canvas, start the timer
  if (
    starPos.x < 0 ||
    starPos.x > width ||
    starPos.y < 0 ||
    starPos.y > height
  ) {
    if (resetTimer == 0) {
      resetTimer = 10 * frameRate(); // Start the timer (5 seconds * frames per second)
    }
  }

  // If the timer is running, count down
  if (resetTimer > 0) {
    resetTimer--;
  

    // If the timer has finished, reset the star's position and velocity
    if (resetTimer < 1) {
      let newX;
      randomV = random(0, 1);
      if (randomV == 0) {
        newX = 0 - width * 0.1;
      }
      if (randomV == 1) {
        newX = width * 1.1;
      }
      starPos = createVector(newX, random(0, height));
      starVel = p5.Vector.random2D();
      starVel.mult(5);
      resetTimer = 0;
    }
  }
}
function mousePressed() {
  // credit button:
  // if (mouseX > width * 0.37 && mouseX < width * 0.44 && mouseY > height * 0.85 && mouseY < height * 0.88) {
  //   CreditToggle = !CreditToggle;
  //   redraw();
  // }

  //assistant button:
  // if (mouseX > width * 0.57 && mouseX < width * 0.64 && mouseY > height * 0.85 && mouseY < height * 0.88) {
  //   AssistToggle = !AssistToggle;
  //   redraw();
  // }

  if (dAssist < rectW / 2 || dAssist < rectH / 2) {
    AssistToggle = !AssistToggle;
    if (AssistToggle) {
      CreditToggle = false;
    }
    redraw();

  }
  if (dCredit < rectW / 2 || dCredit < rectH / 2) {
    CreditToggle = !CreditToggle;
    if (CreditToggle) {
      AssistToggle = false;
    }

  }

  // making the slider ellipse draggable
  let d = dist(mouseX, mouseY, ellipseX, ellipseY);
  if (d < ellipseSize / 2) {
    // if the mouse is within the ellipse
    dragging = true;
    offsetX = mouseX - ellipseX;
    //offsetY = mouseY - ellipseY;
  }
}

function mouseDragged() {
  if (dragging) {
    let newX = mouseX - offsetX;
    // Define the range
    let minX = width * 0.2; // Replace with the minimum x-coordinate
    let maxX = width * 0.765; // Replace with the maximum x-coordinate

    // Check if the new x-coordinate is within the range
    if (newX >= minX && newX <= maxX) {
      ellipseX = newX;
    }
  }
}

function mouseReleased() {
  dragging = false;
}

function mouseClicked() {

  if (showFunFact) {
    showFunFact = false;
    return;
  }

  if(showInfo) {  
    showInfo = false;
    return;
  }

  let dStar = dist(mouseX, mouseY, starPos.x, starPos.y);
  if (dStar < starSize) {
    showFunFact = true;
    funFactNum++;
    if (funFactNum > 5) {
      funFactNum = 1;
    }
  }

  if (mouseX > infoX && mouseX < infoX + infoSize && mouseY > infoY && mouseY < infoY + infoSize) {
    showInfo = true;
    console.log("info clicked");
  }
}

/*


if(starX > 0 && star X < width && starY > 0 && starY < height) {
  move star
} else {
  randomV = random(0,1)
  if (V == 0) {
  starx = 0 - width*0.1 }
if(V == 1) {
  starx = width*1.1
}
  starY = random(0, height);
}

moveStar()
random direction
move in that direction

startStar()
random(0,1)
if 0
  starx = 0 - width*0.1
  stary = random(0, height)
if 1
  starx = width*1.1
  stary = random(0, height)

if(starclicked)
  image of fun fact(funfactnumber)
  funfact number++


















*/
