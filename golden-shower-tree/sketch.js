let scal = 2;
let cwidth,cheight;
let wid = 256, hei = 362;
let imwidth,imheight;
let org_x = 5*scal,org_y = 7*scal;

let starx0=145*scal,stary0=168*scal;
let stvel=8;

let currentTime;

let noisex = 1, noisey = 2;


function preload () {
  nightsky = loadImage("nightsky.png");
  bk_grad = loadImage("back-gradation.png");
  bk_road = loadImage("back-road.png");
  road = loadImage("road.png");
  fl_floor = loadImage("flowers_floor.png");
  
  fl_bk = loadImage("flowers_back_dark.png");
  theflower2x = loadImage("flower-2x.png");
  flowers2x = loadImage("flowers-2x.png");
  fl_rf = loadImage("flowers_roof.png");
  fl_base = loadImage("flowers_00.png");
  fl_base_01 = loadImage("flowers_01.png");
  fl_bs_mv = loadImage("flowers_02.png");
  fl_pt=loadImage("petals.gif");
  fl_fr_01 = loadImage("flowers_front_01.png");
  fl_fr_02 = loadImage("flowers_front_02.png");
  fl_fr = fl_fr_01;
  
  light = loadImage("signal.gif");
  petal = loadImage("gst-toppetal.gif");
  fallingpetal = loadImage("fallingpetal.png");
  
  kidgif = loadImage("kid5.gif");

  roadfishes = loadImage("roadfishes.gif");
  roadfish = loadImage("roadfish-noloop.gif");
  skyfish = loadImage("skyfish-noloop.gif");
  
}

function setup() {
  cwidth = wid*scal;
  cheight = hei*scal;
  imwidth = wid*scal+org_x*2;
  imheight = hei*scal+org_y*2;
  createCanvas(cwidth, cheight);
  background(0,33,54);
  fill(0,5,10);
  noStroke();
  rect(0,0,cwidth,212*scal);
  frameRate(40);
  
  starx = starx0;
  
  petal_scal = 3;
  petal_x = -org_x-fallingpetal.width*petal_scal;
  
  // initialize mouse position
  mouseX = 171;//246;
  mouseY = 98;//222;

}

function draw() {
  noStroke();
  currentTime = new Date();
  currentMillisec = currentTime.getMilliseconds();
  currentSec = currentTime.getSeconds();
  
  // for the back brightness
  
  // FLOWERS ON THE ROAD
  flrh_x = int(random(0,wid))*scal;
  flrh_y = int(random(262, hei))*scal;
  flrh_r = int(random(2,3)/scal)*scal;
  if( (flrh_x/scal)%2===0){
    fill(255,249,22,20);// fill with light yellow
    flrh_cl=[255,249,22,255];
  } else {
    fill(150,124,3,50);// fill with dark yellow
    flrh_cl = [150,124,3,255];
    flrh_r = flrh_r*2;
  }
  makeRhombus(flrh_x, flrh_y, flrh_r, flrh_cl);
  
  // for colorizing sky with rhombus
  flrh_x = int(random(-30,wid))*scal;
  flrh_y = int(random(144,164))*scal;
  flrh_r =int(random(3,10))*scal;
  if(flrh_y%4===0) {
    flrh_cl=[255,249,22,50];
  } else {
    flrh_cl=[150,124,3,100];
  }
  makeRhombus(flrh_x, flrh_y, flrh_r,flrh_cl);
  
  
  // STARS
  stary = (145/(42*stvel))*(starx - starx0-60*scal) + stary0;
  
  fill(255,255,255,10);
  mouseradius = int(random(30,90)/scal)*scal;
  makeCircleAvec(starx, stary, mouseradius);
  //makeCircleAvec(mouseX, mouseY, mouseradius);
  
  starx -= stvel/2;// adjust velocity of commet
  // RESET THE POSITION OF THE COMET
  if(starx < -10 && starx%10===0) {
    dice = int(random()*20);
    if(dice%3===0){
      starx = starx0;
      stvel = int(random(3,9));
      stary = (145/(42*stvel))*(starx - starx0-60*scal) + stary0;
      roadfish.reset();
      if(dice%12===0) {
        skyfish.reset();
      }
    }
  }
  
  sky_x = noise(noisex)*3;
  sky_y = noise(noisey)*3;
  
  // brightness on cursor _bottom
  fill(255,255,255,5);
  noStroke();
  if(mouseY < 600) {
    mouseradius = int( map(noise(noisex*10),0,1,8,20))*scal;
  }
    
  
  image(nightsky, -org_x+sky_x, -org_y+sky_y, imwidth,imheight);
  
  image(bk_grad, -org_x, -org_y, imwidth,imheight);
  
  
  // brightness on cursor _middle
  mouseradius = int( map(noise(noisex*10),0,1,4,8))*scal;
  if(mouseY < 600){
    makeCircleAvec(mouseX, mouseY, mouseradius);
  }
  
  
  
  image(bk_road, -org_x, -org_y, imwidth,imheight);
  
  // draw starfish 
  int_starx = int(starx/scal)*scal;
  int_stary = int(stary/scal)*scal;
  fill(255,255,255);
  //rect(int_starx, int_stary, scal,scal);
  
  x = int_starx+scal;
  
  for(let i=0;i<13;i++) {// DRAW COMET
    fill(255,255,255,255-20*i);
    y = (145/(42*stvel))*(x - starx0-60*scal) + stary0
    rect(x, int(y/scal)*scal, scal,scal);
    x = x+scal;
  }
  

  image(fl_bk, -org_x, -org_y, imwidth, imheight);
  image(road, -org_x, -org_y, imwidth, imheight);
  image(roadfishes, cwidth+org_x-roadfishes.width/4*scal, cheight+org_y-roadfishes.height/4*scal, roadfishes.width/4*scal, roadfishes.height/4*scal);
  image(fl_floor, -org_x, -org_y, imwidth, imheight);
  tint_d = map(noise(noisey*16), 0,1,160,255);
  tint(255,255,255,tint_d);
  image(light, 137*scal, 288*scal, light.width/4*scal, light.height/4*scal);
  tint(255,255,255,255);
  
  
  // DRAW FLOWER TREE

  rf_x = noise(noisey)*10;
  rf_y = noise(noisex*2)*10;
  
  bs_x = noise(noisex-0.15)*10;
  bs_y = noise(noisey-0.1)*10;
  
  bs0_x = noise(noisex-0.05)*10;
  bs0_y = noise(noisey-0.05)*10;
  
  bs1_x = noise(noisex-0.1)*10;
  bs1_y = noise(noisey-0.1)*10;
  
  fl_x = noise(noisex-0.2)*10;
  fl_y = noise(noisey-0.2)*10;
  dfl_x = noise(noisex-0.4)-noise(noisex-0.6);
  dfl_y = noise(noisey-0.4)- noise(noisey-0.6);
  //console.log(dfl_x+dfl_y);
 
  image(fl_rf, -org_x+rf_x, -org_y+rf_y/2, imwidth, imheight);
  image(petal, -org_x+rf_x, -org_y+rf_y/2, petal.width/4*scal,petal.height/4*scal);
  image(fl_base, -org_x, -org_y, imwidth, imheight);
  image(fl_base_01, -org_x+bs1_x, -org_y+bs1_y, imwidth,imheight);
  image(fl_bs_mv, -org_x+bs_x, -org_y+bs_y/2, imwidth, imheight);
  image(fl_pt, -org_x+143*scal, -org_y+173*scal, fl_pt.width/4*scal, fl_pt.height/4*scal);
  //image(fl_fr_01, -org_x+fl_x, -org_y+fl_y, imwidth, imheight);
  if(dfl_x+dfl_y > 0.06){
    //image(fl_fr_01, -org_x+fl_x, -org_y+fl_y, imwidth, imheight);
    fl_fr = fl_fr_01;
  } else if(dfl_x+dfl_y < -0.06) {
    //image(fl_fr_02, -org_x+fl_x, -org_y+fl_y, imwidth, imheight);
    fl_fr = fl_fr_02;
  }
  image(fl_fr, -org_x+fl_x, -org_y+fl_y, imwidth, imheight);
  
  
  
  // brightness on cursor _front
  /*
  fill(255,249,22,20);
  //stroke(150,124,3,50);
  mouseradius = int( map(noise(noisey*20),0,1,1,2));
  makeCircleAvec(mouseX, mouseY, mouseradius);
  */
 
  
  
  
  // KID
  
  //image(kid, -org_x, -org_y, imwidth, imheight);
  
  image(kidgif, 82*scal, 251*scal, kidgif.width/4*scal, kidgif.height/4*scal);
  
  // FISHES
  image(roadfish, cwidth+org_x-roadfishes.width/4*scal, cheight+org_y-roadfishes.height/4*scal, roadfishes.width/4*scal, roadfishes.height/4*scal);
  image(skyfish, -org_x, -org_y, skyfish.width/4*scal,skyfish.height/4*scal);
  
  fl_int_x = int(fl_x/2)*scal;
  fl_int_y =int(fl_y/2)*scal;
  image(flowers2x, -org_x+fl_int_x, -org_y, imwidth, imheight);
  
  thefl_int_x = int(fl_x)*scal;
  thefl_int_y = int(fl_y)*scal;
  image(theflower2x, -org_x+thefl_int_x, -org_y+thefl_int_y, imwidth, imheight);
  
  // FALLING PETAL
  /*
  petal_y = (376-248)/90*petal_x+308*scal+noise(noisey)*100;
  petal_dice = int(random(100));
  if(petal_y > cheight && petal_dice === 1){
    petal_x = -org_x-fallingpetal.width*petal_scal;
  }
  
  tint(255,255,255,100);
  image(fallingpetal, petal_x, petal_y, fallingpetal.width*scal*petal_scal, fallingpetal.height*scal*petal_scal);
  tint(255,255,255,255);
  petal_x +=scal*2;
  */
  
  noisex +=0.01;
  noisey +=0.02;
  
}


function makeCircleAvec (x0,y0,radius) {
  // plot circles
  // with larger scaling
  scal_ord = scal;
  scal = scal*2;
  for (let theta = 0; theta < 360; theta++) {
    relativex = radius*cos(radians(theta));// 極座標→デカルト座標：x軸
    relativey = radius*sin(radians(theta));// 極座標→デカルト座標：y軸
    x = relativex + x0;
    y = relativey + y0;
    intx = int(x/scal)*scal;
    inty = int(y/scal)*scal;

    for (let k = 0; k < abs(relativey)/scal; k++){
      if(relativey <= 0) { rect(intx, inty + k*scal, scal, scal); }
      else { rect(intx, inty - k*scal, scal, scal); }
    }
  }  
  scal = scal_ord;// reset scal
}


function makeRhombus (x, y, r, color) {// xyは左上、rは大きさ、colorは透過色込み
  //rectr = int(random(2, 15))*2-1;// 奇数で出力
  for (i = 0; i < r; i++) {
      ii = i*2+1;
      j = (r - ii)/2;
      l = r - j*2;
      noStroke();
      fill(color[0],color[1],color[2], color[3]);
      for (k = 0; k<l; k++) {
          rect(x+j*scal+k*scal, y+i*scal, scal, scal);
          if(i!=r-1){
              rect(x+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
          }
      }
    }
}
