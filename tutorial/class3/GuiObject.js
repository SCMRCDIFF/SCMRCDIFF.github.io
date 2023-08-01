/// UI Object ///
class GUIObject {
  constructor(x, y, dx, dy) {
    this.posX = x;
    this.posY = y;
    this.h = dx;
    this.l = dy;
    this.SeqObj =[];
    this.isSelected = false;
    this.childSelected = false;
    this.isDoubleSelected = false;
    this.isLooper = false;
    this.type=0;
    this.col = [random(0, 255), random(0, 255), random(0, 255)];
    this.dx = 0;
    this.dy = 0;
    this.nID=newID();
    this.name="name";
    this.nameTag = createDiv(this.name);
    this.nameTag.style('font-size', '16px');
    this.nameTag.position(this.posX+20,this.posY+10);
    this.nameTag.hide();
  }
  shapeShow() {
    rect(this.posX + this.dx, this.posY, this.l, this.h);
  }
  getLabel()
  {
    let dat=[];
    dat.type_name='Test';
    dat.l1='Amp';
    dat.l2='Rup';
    dat.l3='Rdw';
    dat.l4='Flat';
    dat.l5='Start time';
    return dat;
  }
  getData()
  {
    let dat=[];
    dat.name=this.name;
    dat.v1=12;
    dat.v2=45;
    dat.v3=12;
    dat.v4=33;
    dat.v5=5;
    return dat;
  }
  setData(dat)
  {
    
  }
  show(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    if (!this.isSelected) {
      this.posY = this.dy;
    }
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    if (this.isDoubleSelected) {
      stroke(255, 0, 0);
      strokeWeight(4);
    } else {
      stroke(0);
      strokeWeight(2);
    }

    this.shapeShow();
    this.nameTag.position(this.posX+dx+20, this.posY+10);
    return this.h;
  }
  showGap(dx, dy) {
    return 0;
  }
 
  
  isClick(moX, moY) {
    if (moX >= this.posX + this.dx && moX <= this.posX + this.dx + this.l) {
      if (moY >= this.posY && moY <= this.posY + this.h) {
        return true;
      }
    }
    return false;
  }

  isDoubleClick(moX, moY)
  {
    return this.isClick(moX, moY);
  }
  createTable()
  {
    
  }
  select_() {
    this.isSelected = true;
  }
  doubleSelect_() {
    this.isDoubleSelected = true; 
  }
  doubleUnselect()
  {
    this.isDoubleSelected=false;
  }
  unselect() {
    this.isSelected = false;
  }
  dragged(dx, dy) {
    this.posY += dy;
  }
  intersect(ob) {
    if (
      this.posX < ob.posX + ob.duration &&
      this.posX + this.duration > ob.posX + ob.duration
    ) {
      return true;
    }
    if (this.posX < ob.posX && this.posX + this.duration > ob.posX) {
      return true;
    }
    return false;
  }
  destruct()
  {
    this.nameTag.remove();
    return true; // We delete the object
  }
  update()
  {
    this.nameTag.html(String(this.name));
  }
  updateID(k)
  {
    this.nID=k;
    this.update();
  }
  eventID(k,n)
  {
  }
  getChild()
  {
    
  }
}

class Probe extends GUIObject {
  constructor(x, y) {
    super(x, y, 80, 100);
    this.r = (3 * this.l) / 6;
    this.isLooper = false;
    this.col = color(random(0, 255), random(0, 255), random(0, 255));
    this.name="Probe_"+String(this.nID);
    this.type=3;
  }
  shapeShow() {
    rect(
      this.posX + this.dx,
      this.posY + this.h / 4,
      this.l,
      (3 * this.h) / 4,
      5
    );
    rect(
      this.posX + this.dx + (2 * this.l) / 6,
      this.posY,
      (2 * this.l) / 6,
      this.h,
      5
    );
    rect(
      this.posX + this.dx,
      this.posY + this.h / 4,
      this.l,
      (3 * this.h) / 4,
      5
    );
    fill(256, 256, 256, 256);
    circle(
      this.posX + this.dx + this.l / 2,
      this.posY + (3 * this.h) / 5,
      this.r
    );
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    circle(
      this.posX + this.dx + this.l / 2,
      this.posY + (3 * this.h) / 5,
      this.r / 2
    );

    fill(255, 0, 0);
    circle(
      this.posX + this.dx + this.l / 2 + this.r / 2,
      this.posY + (3 * this.h) / 5 - this.r / 2 + 5,
      this.r / 10
    );
  }

   getLabel()
  {
    let dat=[];
    dat.type_name=String(this.name);
    dat.l1='';
    dat.l2='';
    dat.l3='Shot';
    dat.l4='';
    dat.l5='';
    return dat;
  }
  getData()
  {
    let dat=[];
    dat.name=String(this.name);
    dat.v1=1;
    dat.v2=2;
    dat.v3=3;
    dat.v4=4;
    dat.v5=5;
    return dat;
  }
  
  showGap(dx, dy) {
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    if (this.isDoubleSelected) {
      stroke(255, 0, 0);
      strokeWeight(4);
    } else {
      stroke(0);
      strokeWeight(2);
    }
    line(
      this.posX + this.dx + 5,
      this.posY + 5 + this.h,
      this.posX + this.dx + 5,
      dy - 5
    );

    rect(this.posX + this.dx, dy + this.h / 4, this.l, (3 * this.h) / 4, 5);
    rect(
      this.posX + this.dx + (2 * this.l) / 6,
      dy,
      (2 * this.l) / 6,
      this.h,
      5
    );
    rect(this.posX + this.dx, dy + this.h / 4, this.l, (3 * this.h) / 4, 5);
    fill(256, 256, 256, 256);
    circle(this.posX + this.dx + this.l / 2, dy + (3 * this.h) / 5, this.r);
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    circle(this.posX + this.dx + this.l / 2, dy + (3 * this.h) / 5, this.r / 2);

    fill(255, 0, 0);
    circle(
      this.posX + this.dx + this.l / 2 + this.r / 2,
      dy + (3 * this.h) / 5 - this.r / 2 + 5,
      this.r / 10
    );
    return this.h;
  }
}

/// LOOPER CLASS ///
class Looper extends GUIObject {
  constructor(x, y) {
    super(x, y, 40, 200);
    this.isLooper = true;
    this.name="Loop_"+String(this.nID);
    this.type=2;
    this.nameTag.html(this.name);
    this.nameTag.show();
    this.st=0;
    this.inc=1;
    this.end=128;
    this.cur=12;
  }

  getLabel()
  {
    let dat=[];
    dat.type_name=(this.name);
    dat.l1='Start';
    dat.l2='Stop';
    dat.l3='Incr';
    dat.l4='';
    dat.l5='Display';
    return dat;
  }
  getData()
  {
    let dat=[];
    dat.name=(this.name);
    dat.v1=this.st;
    dat.v2=this.inc;
    dat.v3=this.end;
    dat.v4="";
    dat.v5=this.cur;
    return dat;
  }
   setData(data)
  {
    this.name= data.name;
    this.st=Number(data.v1);
    this.inc=Number(data.v2);
    this.end=Number(data.v3);
    this.cur=Number(data.v5);
    this.update();
  }
  showGap(dx, dy) {
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    if (this.isDoubleSelected) {
      stroke(255, 0, 0);
      strokeWeight(4);
    } else {
      stroke(0);
      strokeWeight(2);
    }
    line(
      this.posX + this.dx + 5,
      this.posY + 5 + this.h,
      this.posX + this.dx + 5,
      dy - 5
    );
    rect(this.posX + this.dx, dy, this.l, this.h);
    return this.h;
  }
  update()
  {
    super.update();
    this.nameTag.html(String(this.name+"    [ "+this.st+" : "+this.inc+" : "+ this.end +" ] "));
  }
}

/// Module ///
class Module extends GUIObject {
  constructor(x, y) {
    super(x, y, 500, 800);
    
    this.Rf = [];
    this.Gx = [];
    this.Gy = [];
    this.Gz = [];
    this.Eval = [];
    this.axis = [];
    this.spacingX = 20;
    this.spacingY = 100;
    this.col = [256, 256, 256];
    this.axisL=720;
    this.name="Module_"+String(this.nID);
    this.type=1;
    this.childId=0;
    this.nameTag.html(this.name);
    this.nameTag.hide();
    this.sortIdx=[];
    this.isDoubleSelected = true;
    this.calc= new calc(x+this.spacingX,y+this.spacingY);
    // print(this.posX);
    let tmp = new Gradient(250, 0, 1, -50);
    this.SeqObj.push(tmp);
    tmp = new Gradient(750, 0, 1, -50);
    this.SeqObj.push(tmp);
    tmp = new RF(0, 0, 1, -50);
    this.SeqObj.push(tmp);
    
    tmp = new RF(500, 0, 1, -100);
    this.SeqObj.push(tmp);
    
    
  }
  calculate()
  {
    this.calc.addObj(this.SeqObj);
  }
  getLabel()
  {
    let dat=[];
    dat.type_name=(this.name);
    dat.l1='Amp';
    dat.l2='Rup';
    dat.l3='Flat';
    dat.l4='Rdw';
    dat.l5='Start Time';
    return dat;
  }
  getData()
  {
       
    let dat =[];
    let tmp = [];
    for (let p = 0; p < this.SeqObj.length; p++) {
      tmp=this.SeqObj[p].getData();
      dat.push(tmp);
    }
    return dat;
  }
  getChild()
  {
      let dat=this.SeqObj[this.childId].getEq();
     // dat=this.SeqObj[this.childId].name;
     // print(dat);
      return dat;
  }
  setChild(data)
  {
      this.SeqObj[this.childId].setEq(data);
  }
  setData(dat)
  {
    //print('Hello'+String(dat.nID));
     for (let p = 0; p < this.SeqObj.length; p++)
     {
       if(dat.nID==this.SeqObj[p].nID)
       {
         this.SeqObj[p].setData(dat);    
       }    
    }

    this.update();
  }
  update()
  {
    super.update();
    let lMax=720;
    for (let p = 0; p < this.SeqObj.length; p++)
    {
        this.SeqObj[p].update();
         lMax=max(lMax,this.SeqObj[p].posX+this.SeqObj[p].duration);       
    }
  
    this.axisL=lMax;
    this.l=lMax+80;
    this.sortTable();
  }
  sortTable()
  {
    let list=[];
    let idx_test=[];
    this.sortIdx=[];
    for (let p = 0; p < this.SeqObj.length; p++)
    {
      list.push(this.SeqObj[p].start);
      idx_test.push(p); 
    }
  //  print(list[0])
    let mmin=99999999999;
    let tmp_idx=[];
    
    while(idx_test.length>0)
    {
          mmin=99999999999;
          for(let k=0; k<idx_test.length;k++)
          {
              if (list[k]<mmin)
              {
                  
                  mmin=list[k];
                  tmp_idx=k;
              }           
          }
          
          this.sortIdx.push(idx_test[tmp_idx]);
          idx_test.splice(tmp_idx,1);
          list.splice(tmp_idx,1);
    }
    
  }
  updateID(k)
  {
    super.updateID(k);
  
  }
  eventID(n)
  {
    if (n==1)
    {
        this.addObj(0);
    }
    else 
    {
        this.addRf();
    } 
    
  }
  addObj(k)
  {

    let lx=0;
    for (let p = 0; p < this.SeqObj.length; p++) {
      lx=max(this.SeqObj[p].posX+this.SeqObj[p].duration,lx);
    }
    
    /*if(Object.keys(this.SeqObj).length != 0)
    {
     lx=this.SeqObj[this.SeqObj.length-1].posX+this.SeqObj[this.SeqObj.length-1].duration;
    }*/
    
    let tmp = new Gradient(lx+20, 0, k+1, -50);
    this.SeqObj.push(tmp);
    this.update();
    
  }


  addRf()
  {
    
    let lx=0;
    for (let p = 0; p < this.SeqObj.length; p++) {
      lx=max(this.SeqObj[p].posX+this.SeqObj[p].duration,lx);
    }
    
    /*if(Object.keys(this.SeqObj).length != 0)
    {
     lx=this.SeqObj[this.SeqObj.length-1].posX+this.SeqObj[this.SeqObj.length-1].duration;
    }*/
    let tmp = new RF(lx, 0, 1, -50);
    this.SeqObj.push(tmp);
     this.update();
  }
  addEPI()
  {
    let lx=0;
    if(Object.keys(this.SeqObj).length != 0)
    {
     lx=this.SeqObj[this.SeqObj.length-1].posX+this.SeqObj[this.SeqObj.length-1].duration+20;
    } 
    let tmp = new EPI(lx, 0, 1, -50);
    this.SeqObj.push(tmp);
     this.update();
  }
  show(dx, dy) 
  {
  
    this.dx = dx;
    this.dy = dy;
    if (!this.isSelected) {
      this.posY = this.dy;
    }
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    
      stroke(0);
      strokeWeight(2);
    

   
    this.nameTag.position(this.posX+dx+20, this.posY+10);

    for (let p = 0; p < this.SeqObj.length; p++) {
      this.SeqObj[p].show(
        this.posX + this.spacingX + dx,
        this.posY 
      ); //+ this.spacingY * 2
    }

    for (let p = 1; p < 2; p++) {
      stroke(0);
      strokeWeight(2);
      line(
        this.posX + this.dx + this.spacingX,
        this.posY + this.spacingY * p,
        this.posX + this.axisL + this.dx,
        this.posY + this.spacingY * p
      );
    }
    
    this.calc.show(0,0);
   
  }
  showTable(dx,dy)
  {
    if(this.isSelected)
    {
      
    }
  }
  destruct()
  {
     if (!this.childSelected) 
    {
      this.nameTag.remove();
  
      return true;
    }
    else
    {
      for (let p = this.SeqObj.length-1; p >= 0; p--) 
      {
        if (this.SeqObj[p].isDoubleSelected) 
        {
          this.SeqObj.splice(p,1);
        }
      }
    }
    return false;
  }
  isDoubleClick(moX, moY)
  {
    if (this.isDoubleSelected) 
    {
      for (let p = 0; p < this.SeqObj.length; p++) {
        if (this.SeqObj[p].isClick(moX, moY)) {
          this.SeqObj[p].isDoubleSelected = true;
          this.childSelected = true;
          this.childId=p;
        }
      }
    
    }
    
    if (!this.childSelected) 
    {
  
      return super.isDoubleClick(moX, moY); 
    } 
    
    return true;
  }
  isClick(moX, moY) {
    if (this.isDoubleSelected&&!this.isSelected) 
    {
      for (let p = 0; p < this.SeqObj.length; p++) {
        if (this.SeqObj[p].isClick(moX, moY)) {
          this.SeqObj[p].isSelected = true;
          this.childSelected = true;
        }
      }
 
    }
    if (!this.childSelected) 
    {
     
      return super.isClick(moX, moY);
      
    } 
    return false;
  
  }
  
  doubleSelect_()
  {
     super.doubleSelect_();

  }
  doubleUnselect()
  {
    //super.doubleUnselect();
    
    this.isDoubleSelected = true;
    this.childSelected = false;
    for (let p = 0; p < this.SeqObj.length; p++) {
     
      this.SeqObj[p].doubleUnselect();
    }
    
  }
  unselect() {
 
    
    this.isSelected = false;
    this.childSelected = false;
    for (let p = 0; p < this.SeqObj.length; p++) {
      this.SeqObj[p].unselect();
      this.SeqObj[p].doubleUnselect();
    }
   
    
  }
  dragged(dx, dy) {
    if (this.isSelected) {
      this.posY += dy;
    }
   /* if (this.isDoubleSelected) {
      let intersect = false;
      let ob;
      let other;
      for (ob of this.SeqObj) 
      {
        intersect = false;
        for (other of this.SeqObj) 
        {
          if (ob != other) 
          {
            intersect = ob.intersect(other, dx, dy);
            if(intersect)
            {
                break;
            }
          }
        }
        if (!intersect) {
          ob.dragged(dx, dy);
        }
      }
    }*/
      for (let p = 0; p < this.SeqObj.length; p++) 
      {
        if(this.SeqObj[p].isSelected)
        {
            this.SeqObj[p].dragged(dx,dy);
          }
      
      }
     this.update();
  }
}