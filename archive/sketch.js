
let table=[];
let TT=[];
let TTsub=[];
let TTd=[];
let ytick=[0, 1, 2, 3, 4, 5];
let yticklabel=['0','1e-3','2e-3','3e-3','4e-3','5e-3']
let searchBar=[];
let Pltmin=0;
let PltMax=0;
let tbl=[];
let radio=[];
let Ytext=[];
let Ymax=[];
let Ydrift=0;
function preload() 
{
  table = loadTable('database.csv', 'csv');
}
function setup() 
{
  createCanvas(1500, 1500);
   for (let r = 0; r < table.getRowCount(); r++)
     {
       TT[r]=[];
     for (let c = 0; c < table.getColumnCount(); c++) {
        TT[r][c]=(table.getString(r, c)); //4
        //TTd[r][c]=float(table.getString(r, 5)); //5
       }
    }
  TTsub=TT;
    
    searchBar = createInput();
    searchBar.position(400, 800+Ydrift);
    searchBar.input(mySearchEvent);
    searchBar.size(650);
    searchText = createElement('h2', 'Search Keywords (each Keyword needs to be separated by ";" )');
    searchText.position(400, 750+Ydrift);
    searchText.size(660);
    
    Ytext = createElement('h2', 'Ylim' );
    Ytext.position(100, 750+Ydrift);
    Ymax = createInput("5");
    Ymax.position(100,800+Ydrift);
    //Ymax.input(myYlim);
    Ymax.size(50);
  
    radio = createRadio();
    radio.option('1', 'MD/ADC/D');
    radio.option('2', 'FA');
    radio.option('3', 'D*');
    radio.option('4', 'f');
    radio.style('width', '300px');
    radio.selected('1');
    radio.position(100,850+Ydrift);
    textAlign(CENTER);
   
   
   tableCreate(TT) ;
}

function draw() {
  
  background(255);
  axis (100,700,1200,400 ,TTsub,(radio.value()-1)*2,ytick,yticklabel);
}

function mySearchEvent()
{
  if(searchBar.value()==="")
  {
      TTsub=TT;
  }
  else
  {
      createSubTable(searchBar.value());
      
    //print(searchBar.value());
  }
  tbl.remove();
  tableCreate(TTsub);
}
function axis (posX,posY,xlim,ylim,data,opt,ytick,yticklabel)
{
   stroke("#000000");
   strokeWeight(5);
   line(posX,posY,posX,posY-ylim);
   line(posX,posY,posX+xlim,posY);
    
   strokeWeight(2);
   let data_map=0;
   let data_dmap=0;
   let data_x=0;

   for (let k=0;k<data.length;k++)
   { 
       
        if(!isNaN(data[k][opt]))
        {
            data_map=map(float(data[k][opt]),0, Ymax.value(),posY ,posY-ylim);
            data_x=map(k,0,data.length,posX,posX+xlim);
            data_dmap=map(float(data[k][opt+1]),0,  Ymax.value(),0 ,ylim);
            stroke("#000000");
            line(data_x, data_map+data_dmap, data_x, data_map-data_dmap);
            ellipse(data_x, data_map, 15, 15);
            
            // stroke("#E4EE0F");
            //ellipse(data_x, data_dmap, 15, 15);
            
        }
   }
  //stroke("#EE0F0F");
  //strokeWeight(5);
  //data_map=map(-3,0, 5,posY ,posY+ylim);
  //line(posX,data_map,posX+xlim,data_map);
  for (let k=0;k<ytick.length;k++)
  {
     data_map=map(-ytick,0, 5,posY ,posY+ylim);
     //text(yticklabel[k], posX, data_map);
  }
   // TT[r]=map(float(table.getString(r, 4)),0, 5e-3,0 ,100);
   //   TTd[r]=map(float(table.getString(r, 5)),0, 5e-3,0 ,100);
}
function createSubTable(keywords)
{
  let sp=split(keywords.trim(), ';');
  let k=0;
  TTsub=[];
  TTsub[0]=[];
  for (var j = 0; j < TT[0].length; j++) 
  { 
    TTsub[0][j]=TT[0][j];
  }
  k++;
  for (var i = 1; i < TT.length; i++) 
  {
    var subString=TT[i][8].trim();   
    
    for(var s=0;s<sp.length; s++)
    {
    
      if (sp[s]!=="")
      {
         
        if(subString.toLowerCase().includes(sp[s].trim().toLowerCase()))
        {
          
          TTsub[k]=[];
          for (var j = 0; j < TT[i].length; j++) 
          { 
            TTsub[k][j]=TT[i][j];
          }
          k++;
         //reak;
        }
      }
    }
  }
}
function tableCreate(data) 
{
  //var body = document.getElementsByTagName('body')[0];
  
  
  tbl = createElement('table');
  var tbdy = createElement('tbody');
  for (var i = 0; i < data.length; i++) 
  {
    var tr = createElement('tr');
    var td0 = createElement('td');
    td0.html(String(i));
    tr.child(td0)
    for (var j = 0; j < data[i].length; j++) 
    {
        var td = createElement('td');
      if (j<8)
      {
        if(data[i][j])
        {
            td.html(data[i][j]+"\u00B1"+data[i][j+1]);
        }
        else
        {
            td.html(" ");
        }
        //td.size=200;
        j++;
      }
      else
      {
        td.html(data[i][j]);
        //td.size=200;
        //j++;
      }
        //td.child(document.createTextNode('\u0020'))
       // i == 1 && j == 1 ? td.attribute('rowSpan', '2') : null;
        tr.child(td)
    }
    tbdy.child(tr);
  }
  tbl.child(tbdy);
  tbl.size(1200);
  tbl.position(100,900+Ydrift);
   tbl.style.width = '100%';
   tbl.attribute('border', '1');
  //body.appendChild(tbl)
}
