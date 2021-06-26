//McCabe-Thiele graphical method for the number of theoretical stages required for a binary distillation
//Author: Dylan Au

//This script handles the webpage interface and interactions
document.addEventListener("DOMContentLoaded", function() {
    
    function getInputs() {  
       var z = parseFloat(document.getElementById("z").value);
       var yD = parseFloat(document.getElementById("yD").value);
       var xB = parseFloat(document.getElementById("xB").value);
       var q = parseFloat(document.getElementById("q").value);
       var refluxRatio = parseFloat(document.getElementById("L/D").value);
       var alpha = parseFloat(document.getElementById("α").value);
       var stages = calculationSequence(z,yD,xB,q,refluxRatio,alpha);
       document.getElementById("N").innerHTML = stages[0];
       document.getElementById("feedStage").innerHTML = stages[1];

    }

    function clearInputs() {

        document.getElementById("z").value= 0;
        document.getElementById("yD").value= 0;
        document.getElementById("xB").value= 0;
        document.getElementById("q").value= 0;
        document.getElementById("L/D").value= 0;
        document.getElementById("α").value=0;
        document.getElementById("N").innerHTML = 0;
        document.getElementById("feedStage").innerHTML = 0;
        clearGraph();
    }   

    function clearGraph() {
         while(graph.data.length>0) {
             Plotly.deleteTraces(graph, [0])
            }
    }

    getInputs();

    document.getElementById("solveButton").addEventListener("click",function() {clearGraph(),getInputs()} );
    document.getElementById("clearButton").addEventListener("click",function() {clearInputs()} );

    
});
    


