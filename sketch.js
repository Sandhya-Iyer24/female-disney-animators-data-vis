// data visualization

let data;
let dragging = false;
let offsetX, offsetY; // mouse X and Y offset from the ellipse center
let ellipseX;
let ellipseY;
let CreditToggle = false;
let AssistToggle = false;
let dAssist, dCredit;

let rectX;
let rectY;
let rectW;
let rectH;

let ellipseSize;

function preload() {
  data = loadTable("data.csv", "csv", "header");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  rectX = width * 0.57;
  rectY = height * 0.85;
  rectW = width * 0.07;
  rectH = height * 0.03;
  ellipseX = width * 0.1;
  ellipseY = height * 0.1;
}

function draw() {
  background(220);
  let numRows = data.getRowCount();
  let Title = data.getColumn(0);
  let Year = data.getColumn(1);
  let NumWomen = data.getColumn(2);
  let NumUncredit = data.getColumn(3);
  let NumAssist = data.getColumn(4);
  let NumDirect = data.getColumn(5);

  let maxNumWomen = max(NumWomen); // get the maximum number of women

  fill(206, 66, 87);
  rect(width * 0.37, height * 0.85, width * 0.07, height * 0.03);

  //Assist button ------------------------
  dAssist = dist(mouseX, mouseY, rectW, rectH);
  if(dAssist < rectW/2){
    console.log("assist button hovered");
  }
  fill(149, 184, 204);
  rect(rectX, rectY, rectW, rectH);

  for (let i = 0; i < numRows; i++) {
    // for displaying number of women each year
    fill(255);
    let y = height - width * 0.15;
    let rectWidth = width * 0.01;
    let rectHeight = map(NumWomen[i], 0, maxNumWomen, 0, height * 0.5); // map from 0 to maxNumWomen
    let x = i * (rectWidth + width * 0.005);

    rect(x + width * 0.2, y - rectHeight, rectWidth, rectHeight); //x, y, w, h
  }

  if (CreditToggle) {
    // if the user toggles the credit button
    // display the credit percentages
    for (let i = 0; i < numRows; i++) {
      fill(206, 66, 87);
      finalCreditNum = NumUncredit[i] * NumWomen[i] * 0.01;
      let y = height - width * 0.15;
      let rectWidth = width * 0.01;
      let rectHeight = map(finalCreditNum, 0, maxNumWomen, 0, height * 0.5); // map from 0 to maxNumWomen
      let x = i * (rectWidth + width * 0.005);

      rect(x + width * 0.2, y - rectHeight, rectWidth, rectHeight); //x, y, w, h
    }
  }

  if (AssistToggle) {
    // if the user toggles the assist button
    // display the assistant percentages
    for (let i = 0; i < numRows; i++) {
      // AssistToggle rectangles
      fill(149, 184, 204);
      finalAssistNum = NumAssist[i] * NumWomen[i] * 0.01;
      let y = height - width * 0.15;
      let rectWidth = width * 0.01;
      let rectHeight = map(finalAssistNum, 0, maxNumWomen, 0, height * 0.5); // map from 0 to maxNumWomen
      let x = i * (rectWidth + width * 0.005);

      rect(x + width * 0.2, y - rectHeight, rectWidth, rectHeight); //x, y, w, h
    }
  }

  /*
    // for displaying Directing data
    for (let i = 0; i < numRows; i++) {
      // coordinates will be numwomen's height - numdirect's height and size
      // will be numdirect's height
      fill (242, 197, 124);
      finalDirectNum = NumDirect[i] * NumWomen[i] * 0.01;
      let baseY = height - width*0.15;
      let rectWidth = width * 0.01;
      let rectHeight = map(finalDirectNum, 0, maxNumWomen, 0, height*0.5); // map from 0 to maxNumWomen
      let x = i * (rectWidth + width * 0.005);
      let y = baseY - map(finalCreditNum, 0, maxNumWomen, 0, height*0.5);
    
      rect(x + width * .2, y - rectHeight, rectWidth, rectHeight); //x, y, w, h
    }
    */

  //noLoop();
  fill(0);
  ellipseSize = width * 0.05;
  ellipse(ellipseX, ellipseY, ellipseSize, ellipseSize);
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

  if(dAssist < rectW/2 || dAssist < rectH/2){
    AssistToggle = !AssistToggle;
    redraw();
    console.log("assist button clicked");
  }

  // making the slider ellipse draggable
  let d = dist(mouseX, mouseY, ellipseX, ellipseY);
  if (d < ellipseSize / 2) {
    // if the mouse is within the ellipse
    dragging = true;
    offsetX = mouseX - ellipseX;
    offsetY = mouseY - ellipseY;
  }
}

function mouseDragged() {
  if (dragging) {
    ellipseX = mouseX - offsetX;
    ellipseY = mouseY - offsetY;
  }
}

function mouseReleased() {
  dragging = false;
}
