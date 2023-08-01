class calc
  {
    constructor(x,y)
    {
      this.posX=x;
      this.posY=y
      this.vectPoint=[];
      this.vectM0=[];
      this.vectM1=[];
      this.vectM2=[];
      this.vectb=[];

      this.nameTag0 = createDiv("M0=");
      this.nameTag0.style('font-size', '16px');
      this.nameTag0.style('color',"#FF0000");
      this.nameTag0.position(this.posX+20,this.posY+10);
      this.nameTag0.hide();
      
      this.nameTag1 = createDiv("M1=");
      this.nameTag1.style('font-size', '16px');
      this.nameTag1.style('color',"#00FF00");
      this.nameTag1.position(this.posX+20,this.posY+30);
      this.nameTag1.hide();
      
  
      this.nameTag2 = createDiv("M2=");
      this.nameTag2.style('font-size', '16px');
      this.nameTag2.style('color',"#0000FF");
      this.nameTag2.position(this.posX+20,this.posY+50);
      this.nameTag2.hide();
    }
    addObj(Obj)
    {
      let maxV=0;
      this.vectPoint=[];
      for (let p = 0; p < Obj.length; p++)
      {
        maxV=max(maxV,Obj[p].posX+Obj[p].duration); 
        
      }
     // print(maxV);
      for (let p = 0; p < maxV; p++)
      {
        this.vectPoint[p]=0;  
      }
      for (let p = 0; p < Obj.length; p++)
      {
        let sp=split(Obj[p].name, '_');
        if(sp[0]!='RF')
        {

           let lt=Obj[p].start;
           let lend=lt+Obj[p].ramp1;
           for(let k=lt;k<lend; k++)
            {
               this.vectPoint[k]+=-Obj[p].amp*(k-lt)/Obj[p].ramp1;
            }
            lt=lend;
            lend=lt+Obj[p].flat;
            for(let k=lt;k<lend; k++)
            {
               this.vectPoint[k]+=-Obj[p].amp;
            }
            lt=lend;
            lend=lt+Obj[p].ramp2;
            for(let k=lt;k<lend; k++)
            {
               this.vectPoint[k]+=-Obj[p].amp*(+lend-k)/Obj[p].ramp1;
            }
        }
        
        
        
        
      }
      for (let p = 0; p < Obj.length; p++)
        {
          let sp=split(Obj[p].name, '_');
          if(sp[0]==="RF")
          {
           // print(sp)
            for(let k=Obj[p].posX;k<maxV; k++)
            {
              this.vectPoint[k]=-this.vectPoint[k];
            }
          }
        }
      this.moment();
      
      //this.name="RF";
    }
    show(dx,dy)
    {
      noFill();
      stroke(120, 120, 120);
      strokeWeight(4);
        beginShape();
        for (let pt = 0; pt < this.vectPoint.length; pt++)
        {
          vertex( this.posX+pt + dx, this.posY + this.vectPoint[pt] + dy);
        }
        endShape();
      // M0
      stroke(255, 0, 0);
      strokeWeight(4);
        beginShape();
        for (let pt = 0; pt < this.vectM0.length; pt++)
        {
          vertex( this.posX+pt + dx, this.posY + this.vectM0[pt] + dy);
        }
        endShape();
      // M1
      stroke(0, 255, 0);
      strokeWeight(4);
        beginShape();
        for (let pt = 0; pt < this.vectM1.length; pt++)
        {
          vertex( this.posX+pt + dx, this.posY + this.vectM1[pt] + dy);
        }
        endShape();
      
      // M2
      stroke(0, 0, 255);
      strokeWeight(4);
        beginShape();
        for (let pt = 0; pt < this.vectM2.length; pt++)
        {
          vertex( this.posX+pt + dx, this.posY + this.vectM2[pt] + dy);
        }
        endShape();
    }
    bval()
    {
      
    
     let dat =[];
    let tmp = [];
    for (let p = 0; p < this.SeqObj.length; p++) {
      tmp=this.SeqObj[p].getData();
      dat.push(tmp);
    }
    }
    moment()
    {
        this.vectM0=[];
        this.vectM1=[];
        this.vectM2=[];
        this.vectb=[];
      
        let max0,max1,max2;
        for (let pt = 0; pt < this.vectPoint.length; pt++)
        {
          if (pt>0)
          {
            this.vectM0[pt]=this.vectM0[pt-1]+this.vectPoint[pt];
            this.vectM1[pt]=this.vectM1[pt-1]+this.vectPoint[pt]*pt;
            this.vectM2[pt]=this.vectM2[pt-1]+this.vectPoint[pt]*pt*pt;
            max0=max(abs(this.vectM0[pt]),max0);
            max1=max(abs(this.vectM1[pt]),max1);
            max2=max(abs(this.vectM2[pt]),max2);
          }
          else
          {
            this.vectM0[pt]=this.vectPoint[pt];
            this.vectM1[pt]=this.vectPoint[pt];
            this.vectM2[pt]=this.vectPoint[pt];
          }  
        }
        
      
       this.nameTag0.html('M0='+this.vectM0[this.vectM0.length-1]);
       this.nameTag0.show();
      
       this.nameTag1.html('M1='+this.vectM1[this.vectM1.length-1]);
       this.nameTag1.show();
       this.nameTag2.html('M2='+this.vectM2[this.vectM2.length-1]);
       this.nameTag2.show();
      
        for (let pt = 0; pt < this.vectPoint.length; pt++)
        {
          
            this.vectM0[pt]=60*this.vectM0[pt]/max0;
            this.vectM1[pt]=60*this.vectM1[pt]/max1;
            this.vectM2[pt]=60*this.vectM2[pt]/max2;
        }
        
      }

  };