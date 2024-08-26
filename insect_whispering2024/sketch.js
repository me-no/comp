let scal = 2;
let cwidth, cheight, actualwidth, actualheight;
let backcolor = [0,33,54];

let fr = 10;
let currentTime, currentSec, currentMillisec;

function preload() {
  imgkid = loadImage("kid-close-1.png");
  kid_open =loadImage("kid-openeye-1.png");
  imgcross = loadImage("crossing.png");
  cross_right = loadImage("cross-right.png");
  cross_left= loadImage("cross-left.png");
  imgback = loadImage("back_navy.png");
  ins_left = loadImage("ins-left.png");
  ins_right= loadImage("ins-right.png");
  ins_s_down = loadImage("ins-s-down.png");
  ins_s_up = loadImage("ins-s-up.png");
  lin = loadImage("lin.png");
  kang = loadImage("kang.png");
 
  insects = [ins_left, ins_right, ins_s_down, ins_s_up, lin];
  insVoiceLoc=[];
}

function setup() {
  frameRate(fr);
  actualwidth = imgback.width/4;
  actualheight = imgback.height/4;
  cwidth = imgback.width/4*scal;
  cheight = imgback.height/4*scal;
  
  createCanvas(cwidth, cheight);
  background(backcolor[0],backcolor[1],backcolor[2]);
  image(imgback, 0, 0, cwidth, cheight);

  circleradius = 10*scal;
  
  count = 0;
  crosscount = 0;
  countLimit = fr;
}

function draw() {
  currentTime = new Date();
  currentSec = currentTime.getSeconds();
  currentMillisec = currentTime.getMilliseconds();
  // mouse hovering
  fill(255,10);
  mouseradius = int(random(6,33)/scal)*scal;
  makeCircleAvec(mouseX, mouseY, mouseradius);  
  
  if(38*scal < mouseX && mouseX < 105*scal && 
     68*scal < mouseY && mouseY < 104*scal) {
    
    //
    // !! crossing alert !!
    //
    // 踏切が鳴りだすと、虫たちの音が消える
    // 子供は我に返って目を開ける
    // じきに電車が通過するのが分かる
    // 踏切の音がやむと、再び虫たちが現れる
    //
    
    // 虫の聲のリセット
    insVoiceLoc = [];
    
    // alert 中は先に背景を出す
    tint(255,50);
    image(imgback, 0, 0, cwidth, cheight);
    tint(255,255);

    noStroke();
    rhombuscolor = [255,255,255,200];
    rhombusx = int(random(actualwidth))*scal;
    rhombusy = int(random(actualheight))*scal;
    rhombussize = int(random(10,30));

    kangscale = int(random(2));
    //image(kang, rhombusx, rhombusy, kang.width/4*scal*kangscale, kang.height/4*scal*kangscale);
    
    alertcolors = [
      [255,77,100,100],
      [255,219,3,100]
    ];
    alertcoldice = int(random(alertcolors.length));
    alertx = int(mouseX/scal)*scal + int(random(-20,20)/scal)*scal*10;
    alerty = int(mouseY/scal)*scal + int(random(-20,20)/scal)*scal*10;
    makeRhombus(alertx, alerty, rhombussize, alertcolors[alertcoldice]);
    
    // cover image forwarding
    if(currentMillisec < 500) {
      image(cross_right, 0, 0, cwidth, cheight); 
      image(kang, rhombusx, rhombusy, kang.width/4*scal*kangscale, kang.height/4*scal*kangscale);
    } else {
      image(cross_left, 0, 0, cwidth, cheight);
      image(kang, rhombusx, rhombusy, kang.width/4*scal*kangscale, kang.height/4*scal*kangscale);
      if(crosscount == countLimit*2) {
        crosscount = 0;
      }
    }
    image(kid_open, 0, 0, cwidth,cheight);
    
    crosscount++;
    count=0;
  } else {
    tr  = random(100);
    circlex = int(random(actualwidth))*scal;
    circley = int(random(actualheight))*scal;

    noStroke();
    fill(115,167,95,tr);
    circleradius = int(random(1, 20))*scal;
    makeCircle(circlex, circley, circleradius);

    // plot insects randomly
    // 踏切が鳴りやんで、暫くは虫たちの姿は見えない
    // 手をかざしたその近くには虫たちは現れない (plotInsect() 内で定義)
    if(count > 200){
      plotInsect();
    }
    // cover image forwarding
    image(imgback, 0, 0, cwidth, cheight);
    image(imgcross, 0, 0, cwidth, cheight);
    image(imgkid, 0, 0, cwidth,cheight);

  }
  
  if(insVoiceLoc) {
    for(let i=0;i<insVoiceLoc.length;i++) {
      mstotint=map(currentMillisec,0,1000,0,PI);
      tint(255,100*sin(mstotint));
      image(lin, insVoiceLoc[i][0],insVoiceLoc[i][1],lin.width/4*scal, lin.height/4*scal);
      tint(255,255);
    }
  }
  
  count++;
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


function makeCircle (x0,y0,radius) {
  // plot circles     
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
}

function makeCircleAvec (x0,y0,radius) {
  // plot circles
  // with larger scaling
  scal_ord = scal;
  scal = scal*3;
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



function plotInsect() {
  d = int(random(insects.length));
  x = int(random(actualwidth))*scal;
  y = int(random(actualheight))*scal;
  if(abs(x-mouseX) > 60*scal || abs(y-mouseY) > 60*scal){// マウス位置を避ける
    image(insects[d], x,y,insects[d].width/4*scal, insects[d].height/4*scal);
    
    // store the position if d = lin
    if(insects[d]===lin) {
      insVoiceLoc.push([x,y]);
      if(insVoiceLoc.length>5 ) {
        insVoiceLoc.shift();
      }
    }
  }
  
}

