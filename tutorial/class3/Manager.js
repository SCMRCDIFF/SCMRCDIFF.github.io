class layoutManager
  {
    constructor(x,y)
    {
      this.Object=[];
      this.Order=0;
      this.posX=x;
      this.posY=y; 
      this.spacingX=20;
      this.spacingY=20;
      this.addModule();
      
      //this.eManager = new editorManager(0,0);
      this.table = new TableUI(x+250,y+this.Object[0].spacingY*3);
      this.indexDclick=false;
      this.FOV=[0.25, 0.25, 0.004];
      this.Matrix=[128, 128, 1];
      this.SeqName="randomSeq_KM";
      
      this.buttonGx = createButton('G+');
      this.buttonGx.position(x+600,y+this.Object[0].spacingY*3);
      this.buttonGx.id(0+"_"+1);
      this.buttonGx.mousePressed(plusObject);

      this.buttonGy = createButton('Rf+');
      this.buttonGy.position(x+600, y+this.Object[0].spacingY*3+40);
      this.buttonGy.id(0+"_"+2);
      this.buttonGy.mousePressed(plusObject);

     //  this.buttonGy = createButton('Calculate');
     // this.buttonGy.position(x+600, y+380);
     // this.buttonGy.id(0+"_"+3);
     // this.buttonGy.mousePressed(Calculate);  
      
      // this.addModule();
       this.generateTable();
      
    }
    addLoop()
    {
      let l=new Looper(this.posX,this.posY);
      this.Object.push(l);
      this.updateID();
    }
    addModule()
    {
      let m=new Module(this.posX,this.posY);
      this.Object.push(m);
      this.updateID();
    }
    addProbe()
    {
      let m=new Probe(this.posX,this.posY);
      this.Object.push(m);
      this.updateID();
    }
    updateObj2Table()
    {
      for(let k=0;k<this.Object.length;k++)
      {
         if(this.Object[k].isDoubleSelected)
         {
            this.table.UpdateTable(this.Object[k]);
         }
      }
    }
    updateTable2Obj()
    {
      for(let k=0;k<this.Object.length;k++)
      {
         if(this.Object[k].isDoubleSelected)
         {
           this.table.updateObj(this.Object[k]);
         }
      }
      this.update();
    }
    generateTable()
    {
      this.table.destruct();
      for(let k=0;k<this.Object.length;k++)
      {
         if(this.Object[k].isDoubleSelected)
         {
           this.table.AddObject(this.Object[k]);
         }
      }
      this.updatePosition();
      
    }
    removeTable()
    {
      this.table.destruct(); 
      this.updatePosition();
    }
    updatePosition()
    {
       
    }
    show()
    {
      this.Object[0].calculate();
      let Gap=this.posY;
      for(let k=0;k<this.Object.length;k++)
      {
        Gap+=this.Object[k].show(k*this.spacingX,Gap)+this.spacingY;
      }
      
      for(let k=this.Object.length-1;k>=0;k--)
      {
           Gap+=this.Object[k].showGap(k*this.spacingX,Gap)+this.spacingY; 
        // print(Gap)
      }
      //this.generateTable()
      // 
     // let GapTable= this.eManager.l;
     // GapTable+=this.table.show(0,GapTable,"test");
      
    }
    doubleUnselect()
    {
       for(let k=0;k<this.Object.length;k++)
      {
        //this.Object[k].unselect(); 
        this.Object[k].doubleUnselect();
      }
    }
    unselect()
    {
      for(let k=0;k<this.Object.length;k++)
      {
        this.Object[k].unselect(); 
        //this.Object[k].doubleUnselect();
      }
    }
    isClick(moX,moY,ctr_key)
    {
      let check=false;
      for(let k=0;k<this.Object.length;k++)
      {
        if(!this.Object[k].childSelected)
        {
            if(this.Object[k].isClick(moX,moY))
            {
                this.Object[k].select_();
              check=true;
            }
            else
            {
              if(!ctr_key)
              {  
                this.Object[k].unselect();
              }
           }
        }
        
      }
      return check;
    }
    isDoubleClick(moX,moY,ctr_key)
    {
      this.indexDclick=false;

      //this.editor.contentEmpty();
      for(let k=0;k<this.Object.length;k++)
      {      
          if(this.Object[k].isDoubleClick(moX,moY))
          {
              this.Object[k].doubleSelect_();
              this.indexDclick=true;
             
          }
         else
          {
            if(!ctr_key)
            {  
              this.Object[k].doubleUnselect();
            }
          }
         /* if(this.Object[k].childSelected)
          {
            this.editor.contentFill(this.Object[k].getChild());    
          } */     
          
      }
      if(this.indexDclick)this.generateTable();
      else this.removeTable();
      return this.indexDclick;
    }
    dragged(dX,dY,cX,cY)
    {
      let listD=[];
      for(let k=0;k<this.Object.length;k++)
      {
          if(this.Object[k].isSelected||this.Object[k].childSelected)
          {
            this.Object[k].dragged(dX,dY);
            listD.push(k);
          }
      }
      for(let k=0;k<this.Object.length;k++)
      {
        if(!this.Object[k].isSelected)
        {
          if(this.Object[k].isClick(cX,cY))
          {
            this.Object[k].isSelected=false;
            for (let d=0;d<listD.length;d++)
            {
              this.moveElement(listD[d],k+d);
            }
            break;
          }
        }
      }
    }
    moveElement(fromIndex, toIndex) 
    {
      const element = this.Object.splice(fromIndex, 1)[0];
      //console.log(element);

      this.Object.splice(toIndex, 0, element);
      this.updateID();
    }

    deleteSelected()
    {
      //print(this.indexDclick)
      for(let k=this.Object.length-1;k>=0;k--)
      {
        if(this.Object[k].isDoubleSelected)
        {
          this.Object[k].destruct();
        }
      }
      this.generateTable();
    }
    update()
    {
      for(let k=0;k<this.Object.length;k++)
      {
        this.Object[k].update();
      }
    }
    updateID()
    {
      for(let k=0;k<this.Object.length;k++)
      {
        this.Object[k].updateID(k);
      }
    }
    eventID(k,n)
    {
      this.Object[k].eventID(n);
      this.generateTable();
    }

    getObj(nameID)
    {
      for(let k=0;k<this.Object.length;k++)
      {
        if(this.Object[k].name===nameID)
        {
          return this.Object[k];
        }
        else
        {
            for(let p=0;p<this.Object[k].SeqObj.length;p++)
            { 
              if(this.Object[k].SeqObj[p].name===nameID)
              {
                return this.Object[k].SeqObj[p];
              }
            }
        }
      }
      return NaN;
    }
    calculate()
    {
      this.Object[0].calculate();
    }
    
    
  }

