
let D=1.5;
let f=0.15;
let Dstar=50;
let checkModel=0;
let plt1=[];

let Xoffset=0;
let Yoffset=0;
let MaxB=1000;
let NumB=100;
let Label=[];

let inputIO=[];
let img=[];
let myFont;

function preload() 
{
  myFont = loadFont('OpenSans-Medium.ttf');
  Label = loadTable("Label2.txt", 'csv');
}
function setup() 
{
  createCanvas(1800, 1800);
  
   loadData() ;
  inputIO= new IO(150,700);
  plt1=new Axis2D(150,600,600,400);
  runModel();
 
}


function draw() {
  background(255);
  image(img, 700, 100,300,300);
  plt1.show();
}
// Convert saved Bubble data into Bubble Objects
function loadData() 
{
  let vectRow=Label.getRows();
  // The size of the array of Bubble objects is determined by the total number of rows in the CSV
  img = createImage(151, 151);
  img.loadPixels();
  for (let x=0;x<Label.getRowCount();x++)
  {
        for (let y=0;y<vectRow[x].arr.length;y++)
        {
           //print(Label.getNum(x, y)*50)
            img.set(x, 151-y, [Label.getNum(x, y)*50, Label.getNum(x, y)*50, Label.getNum(x, y)*50, 255]);
          // print(img.get(x, y))
        }
  }
  img.updatePixels();
}
function updateContrast()
  {
    
    img.loadPixels();
    let tmpContrast=1;
   
    for (let x = 0; x < img.width; x++) 
    {
      for (let y = 0; y < img.height; y++) 
      {
       
        if(Label.getNum(x,y)==3)
        {
            tmpContrast=plt1.contrast;
        }
        else
        {
            tmpContrast=1;
        }
       //  print(tmpContrast)
         //tmpContrast=plt1.contrast;
        img.set(x, 151-y, [Label.getNum(x, y)*50*tmpContrast, Label.getNum(x, y)*50*tmpContrast, Label.getNum(x, y)*50*tmpContrast, 255]);       
      }
    }
    img.updatePixels();
  }

function runModel()
{
  let bval=[];
  let tmpV=[];
  if(checkModel)
  {
    for (let cpt=0;cpt<NumB+1;cpt++)
    {
      bval[cpt]=cpt*MaxB/NumB; 
      tmpV[cpt]=f*exp(-bval[cpt]*Dstar*pow(10,-3))+ (1-f)*exp(-bval[cpt]*D*pow(10,-3));
    }
  }
  else
  {
    for (let cpt=0;cpt<NumB+1;cpt++)
    {
      bval[cpt]=cpt*MaxB/NumB; 
      tmpV[cpt]=exp(-bval[cpt]*D*pow(10,-3));
    }
  }
   plt1. addData(bval,tmpV);
  updateContrast();
}
function mousePressed() 
{

  plt1.isClick(mouseX,mouseY);
  Xoffset = mouseX ;
  Yoffset = mouseY ;
  updateContrast();
}

function mouseDragged() 
{
  plt1.dragged(mouseX - Xoffset, mouseY-Yoffset,mouseX,mouseY);
  Xoffset = mouseX ;
  Yoffset = mouseY ;
  updateContrast();
}
function myInputEvent() 
{

  D=inputIO.inpD.value();
  f=inputIO.inpf.value();
  Dstar=inputIO.inpDstar.value();
  if (inputIO.checkbox.checked())
  {
    inputIO.divD.html('D');
    inputIO.divf.show();
    inputIO.divDstar.show();
    inputIO.inpf.show();
    inputIO.inpDstar.show();
    plt1.color=[0,255,0];
    checkModel=1;
  } 
  else
  {
    inputIO.divD.html('ADC');
    inputIO.divf.hide();
    inputIO.divDstar.hide();
    inputIO.inpf.hide();
    inputIO.inpDstar.hide();
    plt1.color=[255,0,0];
    checkModel=0;
  }
  runModel();
}
class IO
{
 constructor(x,y)
  {
    
    
    this.posX=x;
    this.posY=y;
    this.gap=40;
    this.checkbox = createCheckbox('IVIM / ADC ', false);
    this.checkbox.changed(myInputEvent);
    this.checkbox.position(this.posX,this.posY);
    
    this.divD = createDiv('ADC');
    this.divD.position(this.posX+50,this.posY+this.gap);
    this.inpD = createInput(String(D));
    this.inpD.size(30);
    this.inpD.position(this.posX, this.posY+this.gap);
    this.inpD.input(myInputEvent);
  
    
    this.divf = createDiv('f');
    this.divf.position(this.posX+150, this.posY+this.gap);
    this.divf.hide();
    this.inpf = createInput(String(f));
    this.inpf.size(30);
    this.inpf.position(this.posX+100, this.posY+this.gap);
    this.inpf.input(myInputEvent)
    this.inpf.hide();
    
    this.divDstar = createDiv('D*');
    this.divDstar.position(this.posX+250, this.posY+this.gap);
    this.divDstar.hide();
    this.inpDstar = createInput(String(Dstar));
    this.inpDstar.size(30);
    this.inpDstar.position(this.posX+200, this.posY+this.gap);
    this.inpDstar.input(myInputEvent)
    this.inpDstar.hide();

  }
}