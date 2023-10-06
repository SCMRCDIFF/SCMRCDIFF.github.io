
let lManager=[];
let ID_manager=1;
let Xoffset=0;
let Yoffset=0;
ctrl_key=true;
function setup() {
  createCanvas(2000, 1000);
  lManager = new layoutManager(0,150);
 // lManager.addLoop();
 // lManager.addLoop();
 
}

function draw() {
  background(255);
   lManager.show();
}
function plusObject()
{
  
}
function Calculate()
{
  lManager.calculate();
}
function AddLoop()
{
  lManager.addLoop();
}
function AddModule()
{
  lManager.addModule();
}
function AddProbe()
{
  lManager.addProbe();
}
function ExportPulSeq()
{
  lManager.exportPulSeq();
}
function newID()
{
  ID_manager=ID_manager+1;
  return ID_manager;
}
function doubleClicked() 
{

  lManager.isDoubleClick(mouseX,mouseY,0);
}
function mousePressed() 
{

  lManager.isClick(mouseX,mouseY,0);
  Xoffset = mouseX ;
  Yoffset = mouseY ;
  lManager.updateObj2Table();
 // print(Xoffset)
}

function mouseDragged() 
{

  lManager.dragged(mouseX - Xoffset, mouseY-Yoffset,mouseX,mouseY);
  Xoffset = mouseX ;
  Yoffset = mouseY ;
  lManager.updateObj2Table();
}

function mouseReleased() 
{ 
    lManager.unselect();
}
function myInputEvent() {
  //console.log('you are typing: ', this.value());
  //console.log('Object: ', this.value());
  lManager.updateTable2Obj();
}
function keyPressed() 
{
  if (keyCode === CONTROL) 
  {
    ctrl_key=true; 
  }
  if (keyCode== DELETE )
  {
    lManager.deleteSelected();    
  
  }
}
function plusObject()
{
  let nid=this.id();
  let sp=split(nid, '_');
  lManager.eventID(int(sp[0]),int(sp[1]));
}