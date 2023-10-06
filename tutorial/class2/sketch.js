let collection=[];
let Xoffset=0;
let Yoffset=0;
let cptTime=0;
let ObjCircle=[];
let HistogramX=[];
let HistogramY=[];
let DivInfo=[];
function setup() 
{
   createCanvas(1500, 1500);
   let DivInfo = createDiv('Double click to add a cell');
   DivInfo.style('font-size', '16px');
   DivInfo.position(300, 150);
   let tmpObj =new Object2D(-50,-50,50,50);
   ObjCircle.push(tmpObj);
   collection= new ball(200,200,400,1000);
   HistogramX = new Hist(200,700,400,100)
   HistogramX.dMin=-3;
   HistogramX.dMax=3;
  
   HistogramY = new Hist(700,600,400,100)
   HistogramY.dMin=-3;
   HistogramY.dMax=3;
  
}

function draw() {
  background(255);
  cptTime++;
  collection.show(3e-3);
  if (cptTime>5)
  {
    HistogramX.addData(collection.dx);
    HistogramY.addData(collection.dx);
    cptTime=0;
  }
  for(let cpt=0;cpt<ObjCircle.length;cpt++)
  {  
     ObjCircle[cpt].show();
  }
  HistogramX.show(0);
  
  HistogramY.show(-90);
}
function mousePressed() 
{
   for(let cpt=0;cpt<ObjCircle.length;cpt++)
  {  
    ObjCircle[cpt].isClick(mouseX,mouseY);
    Xoffset = mouseX ;
    Yoffset = mouseY ;
  }
}

function mouseDragged() 
{
  for(let cpt=0;cpt<ObjCircle.length;cpt++)
  {  
    ObjCircle[cpt].dragged(mouseX - Xoffset, mouseY-Yoffset,mouseX,mouseY);
  }
  Xoffset = mouseX ;
  Yoffset = mouseY ;

}
function doubleClicked() 
{
   let tmpObj =new Object2D(mouseX,mouseY,50,50);
   ObjCircle.push(tmpObj);
}
function mouseReleased() 
{
  
}
  