//McCabe-Thiele graphical method for the number of theoretical stages required for a binary distillation
//Author: Dylan Au

//The functions below are utility functions that aid to transform data and to help generate the graph
var dataArray = [];
function createLines(xStart,xEnd,yStart,yEnd) {
    var xPoints = [xStart,xEnd];
    var yPoints = [yStart,yEnd];
    return [xPoints,yPoints];
  }
  
function jsonDataFormat(x,y,name,color) {
    if (name =="") {
        var data =  {
            x:x,
            y:y,
            mode:"lines",
            type:"scatter",
  
            line: {
              color:color
  
            },
            showlegend:false
        };
    }
    else {
        var data =  {
            x:x,
            y:y,
            mode:"lines",
            type:"scatter",
  
            line: {
              color:color
  
            },
            name:name
        };
    }
  
    return data;
  }
  
function addDataArray(data) {
    dataArray.push(data);
    return dataArray;
  }
  
function renderChart(dataArray) {
  
    var data = dataArray;
    var layout = {
        title:"<b>McCabe-Thiele Y-X Diagram </b>",
        width:1000,
        xaxis: {
            title: {
              text: 'x',
              font: {
                family:  "Helvetica,Arial,sans-serif",
                size: 18,
                color: '#030303'
              }
            },
          },
          yaxis: {
            title: {
              text: 'y',
              font: {
                family: "Helvetica,Arial,sans-serif",
                size: 18,
                color: '#030303'
              }
            }
          }      
    }
    const graph = document.getElementById("graph");
    Plotly.newPlot(graph,data,layout);
  }
  
function resetValues() {
    numStages = 0;
    feedStage = 0;
  }