class Object2D
{
  constructor(x,y, w,h) 
  {
    this.posX=x;
    this.posY=y;
    this.h = -h;
    this.w = w;
  }
  isClick(moX, moY) 
  {
    
    if (moX >= this.posX  && moX <= this.posX  + this.w) 
    {
      if (moY >= this.posY + this.h && moY <= this.posY ) 
      {
        return true;
      }
    }
    return false;
  }
  dragged(dx, dy,moX,moY)
  {
    if (this.isClick(moX, moY) )
    {
      this.posX+=dx;
      this.posY+=dy;
    }
  }
}
class Axis2D extends Object2D {
  constructor(x,y, w,h) 
  {
    super(x,y, w,h);
    this.vectX=[];
    this.vectY=[];
    this.barX=50;
    this.barY=100;
    this.Xlim=[0, 0];
    this.Ylim=[0, 0];
    this.color=[255,0,0];
    this.labelX='b-value';
    this.labelY='S/S0';
    this.contrast=1;
  }
  addData(vx,vy)
  {
    this.vectX=vx;
    this.vectY=vy;
    this.Xlim=[0, 0];
    this.Ylim=[0, 0];
    for (let cpt=0;cpt<this.vectX.length;cpt++)
    {
      if(this.vectX[cpt]>this.Xlim[1])
      {
          this.Xlim[1]=this.vectX[cpt];
      }
      if(this.vectY[cpt]>this.Ylim[1])
      {
          this.Ylim[1]=this.vectY[cpt];
      }
    }
  }
  
  show()
  {
    
    let tmpx=[];
    let tmpy=[];
    let tmpdx=999999;
    let textY=0;
    let textX=0;
    //push()
    stroke(0);
    strokeWeight(4);
    translate(this.posX, this.posY);
    line(0, 0, 0, this.h);
    line(0, 0, this.w,0);

    textFont(myFont);
    textSize(32);
    fill(0);
    strokeWeight(2);
    stroke(0);
    text(String(this.Xlim[0]),0,30);
    text(String(this.Xlim[1]),this.w,30);
    text(String(this.Ylim[0]),-30,0);
    text(String(this.Ylim[1]),-30,this.h);
    
    noFill();
    stroke(this.color);
    beginShape();
    for (let cpt=0;cpt<this.vectX.length;cpt++)
    {
      tmpx= map(this.vectX[cpt], this.Xlim[0], this.Xlim[1], 0, this.w); // val range min/max new range min/max
      tmpy= map(this.vectY[cpt], this.Ylim[0], this.Ylim[1], 0,  this.h); // val range min/max new range min/max
      if (abs(tmpx-this.barX<tmpdx))
      {
          tmpdx=abs(tmpx-this.barX);
          this.barY=-tmpy;
          textY=round(this.vectY[cpt], 2);
          textX=round(this.vectX[cpt], 2);
          this.contrast=this.vectY[cpt];
      }
     
      vertex(tmpx,tmpy);
    }
   
    endShape();
    stroke(150);
    strokeWeight(4);
    line( this.barX, 0, this.barX,-this.barY);
    strokeWeight(2);
    text(String(textY),this.barX+10,-this.barY-10);
    text(String(textX),this.barX,30);
    
    // Label
    text(this.labelX,this.w/2-40,60);
    angleMode(DEGREES);
    rotate(270);
    text(this.labelY,-this.h/2-40,-20);
    
  }
   dragged(dx, dy,moX,moY)
  {
    if (this.isClick(moX, moY) )
    {
      this.barX+=dx;
      if(this.barX<0)
      {
          this.barX=0;
      }
      if(this.barX>this.w)
      {
          this.barX=this.w;
      }
      for (let cpt=0;cpt<this.vectX.length;cpt++)
      {
      
      }
      //this.barY+=dy;
    }
  }
 

}

