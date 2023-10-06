class Object2D
{
  constructor(x,y,r) 
  {
    this.posX=x;
    this.posY=y;
    this.r=r;
    this.h=-this.r;
    this.w=this.r;
    this.color=[255,0,0];
  }
  
  isClick(moX, moY) 
  {
    
    if (moX >= this.posX- this.r  && moX <= this.posX  + this.r) 
    {
      if (moY >= this.posY - this.r && moY <= this.posY+ this.r ) 
      {
        this.color=[0,255,255];
        return true;
      }
    }
     this.color=[255,0,0];
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
  isCollide(cx,cy,r)
  {
    return abs((this.posX - cx) * (this.posX - cx) + (this.posY - cy) * (this.posY - cy)) < (this.r + r) * (this.r + r);
  }
  bounce(cx,cy,r)
  {
    let dist=sqrt((this.posX - cx) * (this.posX - cx) + (this.posY - cy) * (this.posY - cy))*2;
    let dx=(cx - this.posX) - (this.r + r) ;
    let dy=(cy - this.posY) - (this.r + r) ;
    let midx= (this.posX + cx) / 2; 
    let midy= (this.posY + cy) / 2;
    let newPos=[];
    newPos[0] = (midx + (r+this.r) * (cx - this.posX) / dist); 
    newPos[1]=  (midy + (r+this.r) * (cy - this.posY) / dist);
    return newPos;
  }
  show()
  {
   // fill ( this.color);
    noFill();
    circle(this.posX, this.posY, this.r*2);
  }
}
class ball
{
   constructor(x,y,l,n)
  {
  
    this.posX=x;
    this.posY=y;
    this.len=l;
    this.n=n;
    this.r=10;
    this.check=0;
     // Table of our water molecules coordinates
     this.px=[];
     this.py=[];
     this.dx=[];
     this.dy=[];
     for (let cpt=0;cpt<this.n;cpt++)
     {  
        this.px[cpt]=random(this.posX,this.posX+this.len);
        this.py[cpt]=random(this.posY,this.posY+this.len);
     }
   }
   update(d)
   {
     
     for (let cpt=0;cpt<this.n;cpt++)
     {  
       
        let KD = sqrt(d * 3 * 2 *100 );
        let dx= randomGaussian(0,1)*KD;
        let dy= randomGaussian(0,1)*KD;
       // Memory savy
        this.dx[cpt]=this.px[cpt];
        this.dy[cpt]= this.py[cpt];
        this.px[cpt]-=dx;
        this.py[cpt]-=dy;
        for(let cpt2=0;cpt2<ObjCircle.length;cpt2++)
         {  
         if (ObjCircle[cpt2].isCollide(this.px[cpt],this.py[cpt],this.r))
         {
            let b=ObjCircle[cpt2].bounce(this.px[cpt],this.py[cpt],this.r);
            this.px[cpt]=b[0];
            this.py[cpt]=b[1];
          }
        }
       this.dx[cpt]=this.px[cpt]-this.dx[cpt];
       this.dy[cpt]=this.py[cpt]-this.dy[cpt];
       if(this.px[cpt]>(this.posX[cpt]+this.len))
       {
         this.px[cpt]=this.posX; 
       }

       if(this.px[cpt]<(this.posX[cpt]))
       {
         this.px[cpt]=this.posX+this.len; 
       }

       if(this.py[cpt]>(this.posY+this.len))
       {
         this.py[cpt]=this.posY; 
       }
       if(this.py[cpt]<(this.posY))
       {
         this.py[cpt]=this.posY+this.len; 
       }
       
      
     }
   
   }
  
  show(d)
  {
    this.update(d);
   // print('The value of y is ' + this.py);
   // color(255*this.dv/12,255*this.da,255*this.d/3e-3);
    let c=color(56,255,255);
    fill (0,0,255);
    for (let cpt=0;cpt<this.n;cpt++)
    {  
      circle(this.px[cpt], this.py[cpt], this.r*2);
    }
  }
  
}
class Hist
{
  constructor(x,y,w,h) 
  {
    this.posX =x;
    this.posY =y;
    this.h=-h;
    this.w=w;
    this.nP=20;
    this.data=[];
    this.dMin=0;
    this.dMax=0;
    this.hMax=0;
   }
  addData(data)
  {
    let sq=0;
    //this.data=data;
    //this.dMin=9999999999;
    //this.dMax=0;
    this.hMax=1;
   // for(let cpt=0;cpt<data.length;cpt++)
   // {
     //   if(data[cpt]<this.dMin)
    //    {
    //      this.dMin=data[cpt];    
    //    }
    //    if(data[cpt]>this.dMax)
   //     {
   //       this.dMax=data[cpt];    
   //     }
   // }
   
    sq=(this.dMax-this.dMin)/this.nP;
    
    for(let cpt=0;cpt<this.nP;cpt++)
    {
      this.data[cpt]=0;
    }
    
    for(let cpt=0;cpt<data.length;cpt++)
    {
      let idx=floor((data[cpt]-this.dMin)/sq);
      this.data[idx]++;
      if (this.data[idx]>this.hMax)
      {
        this.hMax=this.data[idx];
       
      }
    }
  }
  show(angle)
  {
    let ph=-this.h/this.nP;
    let pw=this.w/this.nP;
    push();
    angleMode(DEGREES)   
    translate(this.posX,this.posY);
    rotate(angle)
   print(this.hMax)
    for(let cpt=0;cpt<this.nP;cpt++)
    {
      //print(this.data[cpt])
      if(this.hMax!=0)
      {
       rect(pw*cpt, 0, pw, map(this.data[cpt],0,this.hMax,0,-this.h));
      }
    }
    pop();
  }
}
  