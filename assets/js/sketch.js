

let canvas;
let xPos = 0;
let yPos = 0;
let easing = 0.01;

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style("z-index", -2);
    rectMode(CENTER);
    angleMode(DEGREES);

    noStroke()    

}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    clear();

    xPos = xPos + ((mouseX - xPos) * easing);
    yPos = yPos + ((mouseY - yPos) * easing);


    Bunny(xPos, yPos);

}


function  Bunny(_x,_y){
    //face
    fill (250);
    ellipse(_x + 0, _y  -10,250, 210);
    rect(_x + 0, _y + 0,250, 200,200);
    rect(_x -56, _y  -50,135, 230,130);
    rect(_x + 56, _y -50,135, 230,130);

    //eyes
    let xEye = 55;
    let yEye = -35;
    fill(120,50,40);
    rect(_x -xEye,  _y - yEye, 40, 45,120);
    rect(_x + xEye,  _y -yEye, 40, 45, 120);
    rect(_x -55,  _y + 15, 15, 20, 120);
    rect(_x + 55, _y +  15, 15, 20, 120);
    rect(_x -55,  _y -38, 30, 12, 200);
    rect(_x + 55, _y -38, 30, 12, 200);
    fill(255);
    let xWhite = 55;
    let yWhite1 = -43;
    let yWhite2 = -27;
    ellipse(_x -xWhite,  _y-yWhite1, 10, 10);
    ellipse(_x + xWhite, _y -yWhite1, 10, 10);
    ellipse(_x -xWhite, _y -yWhite2, 10, 10);
    ellipse(_x + xWhite, _y -yWhite2, 10, 10);
    //nose
    fill (240,120,190);
    ellipse(_x, _y + 45,15,15);
 
    
}