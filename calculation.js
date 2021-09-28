//McCabe-Thiele graphical method for the number of theoretical stages required for a binary distillation
//Author: Dylan Au

var numStages = 0;
var feedStage = 0;
var minReflux = 0;
//Calls the various functions required to calculate and generate the McCabe-Thiele Graph
function calculationSequence(z,yD,xB,q,refluxRatio,alpha) {
    resetValues();
    var minPoint= calculateMinPoint(q,alpha,z)
    var minInt = stripLine(0,yD,minPoint[0],minPoint[1])
    minReflux = calculateMinimumRefluxRatio(minInt,yD)
    if (minReflux === "Error" || refluxRatio < minReflux) {
      return ["N/A","N/A","N/A"]
    }
    else {
      var intersectionPoint = calcIntersectionPoint(z,yD,q,refluxRatio);
      var feedLine = createLines(z,intersectionPoint[0],z,intersectionPoint[1]);
      var strippingLine =createLines(yD,intersectionPoint[0],yD,intersectionPoint[1]) ;
      var rectifyingLine =createLines(xB,intersectionPoint[0],xB,intersectionPoint[1]) ;
      var botComp = createLines(xB,xB,0,xB);
      var feedComp = createLines(z,z,0,z);
      var distlComp = createLines(yD,yD,0,yD);
      var minLine = createLines(0,yD,minInt,yD)
      
      
      
      var equilibriumValues = equilibriumCurve(alpha);
      var diagonalLineValues = diagonalLine()
  
      var feedLineData = jsonDataFormat(feedLine[0],feedLine[1],"Feed Line","rgb(10,97,247)");
      var strippingLineData = jsonDataFormat(strippingLine[0],strippingLine[1],"Stripping Line","rgb(211,69,233)");
      var rectifyingLineData = jsonDataFormat(rectifyingLine[0],rectifyingLine[1],"Rectifying Line","rgb(55,220,72)");
      var equilData = jsonDataFormat(equilibriumValues[0],equilibriumValues[1],"Equilibrium Curve","rgb(200,0,0)")
      var diagonalLineData = jsonDataFormat(diagonalLineValues[0],diagonalLineValues[1],"","rgb(0,0,0)");
      var botCompData = jsonDataFormat(botComp[0],botComp[1],"","rgb(240,136,44)");
      var feedCompData = jsonDataFormat(feedComp[0],feedComp[1],"","rgb(240,136,44)");
      var distlCompData = jsonDataFormat(distlComp[0],distlComp[1],"","rgb(240,136,44)");
      var minLineData = jsonDataFormat(minLine[0],minLine[1],"Minimum Reflux","grey")
      stepOff(xB,yD,intersectionPoint[0],intersectionPoint[1],refluxRatio,alpha);
      
      addDataArray(feedLineData);
      addDataArray(strippingLineData);
      addDataArray(rectifyingLineData);
      addDataArray(equilData);
      addDataArray(diagonalLineData);
      addDataArray(botCompData);
      addDataArray(feedCompData);
      addDataArray(distlCompData);
      addDataArray(minLineData)
      renderChart(dataArray);
      return [numStages,feedStage,minReflux.toFixed(2)];

    }
   
    

}

//Calculates the intersection point of the stripping, rectifying, and feed line
function calcIntersectionPoint(z,yD,q,refluxRatio) {
  var xIntersect = (-(q-1)*(1-refluxRatio/(refluxRatio+1))*yD-z)/((q-1)*refluxRatio/(refluxRatio+1)-q);
  var yIntersect = (z+yD*q/refluxRatio)/(1+q/refluxRatio);
  return [xIntersect,yIntersect];
}

//Generates the y=x reference line
function diagonalLine(){
    var x = [0];
    const step = 0.1;
    var xVal= 0;
    for (let i=0;i < 10;i++) {
        xVal = xVal + step;
        x.push(xVal);
    }
    var y = x;
    return [x,y]
}

//Calculates the y mol fraction value of the rectifying line
function recLine(x,yD,refluxRatio) {
  var y = refluxRatio/(refluxRatio+1)*x + yD/(refluxRatio+1);
  return y;
}

//Calculates the y mol fraction value of the stripping line
function stripLine(x,xB,xI,yI) {
  var stripSlope = (xB - yI)/(xB-xI);
  var int = yI-stripSlope*xI;
  var y = stripSlope*x + int;
  return y;
}



//Calculates the intersection points of the staircase, number of stages required to achieve the desired distillate composition, and the optimal feed stage
function stepOff(xB,yD,xI,yI,refluxRatio,alpha) {
  //Rectifying Section
  var xStep=yD;
  var yStep=yD;
  var xStripStep;
  while (xStep>xI){
    var xRectStop = x_eq(alpha,yStep);
    var xRectLine = createLines(xStep,xRectStop,yStep,yStep);
    var xRectData = jsonDataFormat(xRectLine[0],xRectLine[1],"","rgb(0,0,0");
    addDataArray(xRectData);
    if (xRectStop<xI) {
      xStripStep = xRectStop;

      break;
    }
    
    var yRectStop = recLine(xRectStop,yD,refluxRatio);
    var yRectLine = createLines(xRectStop,xRectStop,yStep,yRectStop);
    var yRectData = jsonDataFormat(yRectLine[0],yRectLine[1],"","rgb(0,0,0");
    addDataArray(yRectData);
    xStep = xRectStop;
    yStep = yRectStop;
    
    numStages++;
   
  }
   
  // Stripping section
  feedStage = numStages + 1;
  while (xStripStep>xB) {
    var yStripStop = stripLine(xStripStep,xB,xI,yI);
    var yStripLine = createLines(xStripStep,xStripStep,yStep,yStripStop);
    var yStripData = jsonDataFormat(yStripLine[0],yStripLine[1],"","rgb(0,0,0");
    addDataArray(yStripData);

    var xStripStop = x_eq(alpha,yStripStop);
    var xStripLine = createLines(xStripStep,xStripStop,yStripStop,yStripStop);
    var xStripData = jsonDataFormat(xStripLine[0],xStripLine[1],"","rgb(0,0,0)")
    addDataArray(xStripData);

    xStripStep = xStripStop;
    yStep = yStripStop;
    numStages++;

    if (xStripStep<xB) {
      yStripStop = xStripStep
      yStripLine = createLines(xStripStep,xStripStep,yStep,yStripStop);
      yStripData = jsonDataFormat(yStripLine[0],yStripLine[1],"staircase","rgb(0,0,0");
      addDataArray(yStripData);
      break;
    }

  }
}

function calculateMinPoint(q,alpha,z) {
  let a = q*(alpha-1)
  let b = q - z * (alpha-1) - alpha*(q-1)
  let c = -z
  var discriminant = b*b - 4 * a * c
  
  var root1, root2;
  var x1 
  if (a == 0) {
    return "Error"
  }

  if (discriminant < 0 ) {
    return "Error"
  }
  else if (discriminant > 0) {
    root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    if ( root1 > 1 && root2 > 1) {
     return "Error"
    }
    else if (root1 > 0 && root1 < 1) {
      x1 = root1
    }
    else {
      x1 = root2
    }
  }
  else {
    root1 = root2 = -b / (2 * a);
    x1 = root1
  }

  var y1 = alpha*x1 / (1+x1*(alpha-1))
  
  return [x1,y1]
    
}

function calculateMinimumRefluxRatio(int,xD) {
  return xD/int - 1
}



