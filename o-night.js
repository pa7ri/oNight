var countStart = 50;
var totalStars= 25;
var totalBrightStars= 6;
let posXstars = [];
let posYstars = [];

var countHeart = 0;
var countUfo = 2;
var movOvni = -100;

var isIncreasing=true;
var isIncreasingHeart=true;

let imgUfo = [];
let imgCity;
let imgBackground;
let imgHeart;

function setup () {
  // el tamaño es de 192x157 y se ajusta automaticamente
  createCanvas(windowWidth, windowHeight);
  
  imgHeart = loadImage('/media/heart.png');
  
  imgUfo[0] = loadImage('/media/ovni0.png');
  imgUfo[1] = loadImage('/media/ovni1.png');
  //ufo abduction
  imgUfo[2] = loadImage('/media/ovni2.png');
  imgUfo[3] = loadImage('/media/ovni3.png');
  imgUfo[4] = loadImage('/media/ovni4.png');
  imgUfo[5] = loadImage('/media/ovni5.png');

  imgBackground = loadImage('/media/back.png');
  
  imgCity = loadImage('/media/city.png');
  
  frameRate(40);
  api.tracking.connect();
}

function draw() {
  background(43,40, 60);
  initcity();
  
  var blobs = api.tracking.getBlobs();
  if(blobs.length == 2) {
    heart();
  } else {
    dragon();
  }
}

function initcity(){
  image(imgBackground, 0, 0, 192, 157);
  stars();
  image(imgCity, 0, 93, 192, 65);
}

function heart(){
  if(isIncreasingHeart && countHeart<=50) {
    countHeart++;
    image(imgHeart, 192/2 - countHeart/2, 157/2 - countHeart/2 - 48, countHeart, countHeart);
    if(countHeart == 50) {
      isIncreasingHeart=false;
    }
    
  } else if(!isIncreasingHeart && countHeart >= 30) {
    countHeart--;
    image(imgHeart, 192/2 - countHeart/2, 157/2 - countHeart/2 - 48, countHeart, countHeart);
    if(countHeart == 30) {
      isIncreasingHeart=true;
    }
  }
}

function dragon(){
  if(movOvni==250) {movOvni= -100;}
  movOvni++;

   if(countUfo>=0 && countUfo < 5) {
    image(imgUfo[0], movOvni, 70, 40, 55);
    directionCount();
    if(countUfo==2) {
      isIncreasing=true;
    }
  }
  else if(countUfo>=5 && countUfo < 10) {
    image(imgUfo[1], movOvni, 70, 40, 55);
    directionCount();
  }
  else if(countUfo>=10 && countUfo < 15) {
    image(imgUfo[2], movOvni, 70, 40, 55);
    directionCount();
  }
  else if(countUfo>=15 && countUfo < 20) {
    image(imgUfo[3], movOvni, 70, 40, 55);
    directionCount();
  }
  else if(countUfo>=20 && countUfo < 25) {
    image(imgUfo[4], movOvni, 70, 40, 55);
    directionCount();
  } else {
    image(imgUfo[5], movOvni, 70, 40, 55);
    directionCount();
    if(countUfo==27) {
      isIncreasing=false;
    }
  }
}

function directionCount(){
  if(isIncreasing) {
    countUfo++;
  } else {
    countUfo--;
  }
}

function stars() {
  stroke(255);
  for(var i=0; i < totalStars; i++) {
    if(countStart == 50 || countStart == 0) {
      posXstars[i]=random(192);
      posYstars[i]=random(157);
      countStart = 0;
    }
    if(countStart > 15 && countStart < 35) {
      //bright 5 points
      for(var j=0; j < totalBrightStars; j++) {
        point(posXstars[j]+1, posYstars[j]);
        point(posXstars[j]-1, posYstars[j]);
        point(posXstars[j], posYstars[j]+1);
        point(posXstars[j], posYstars[j]-1);
      }
    }
    //paint rest
      point(posXstars[i], posYstars[i]);
    }
    if(countStart!= 50) {
      countStart++;
    }
}