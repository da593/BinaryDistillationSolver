//McCabe-Thiele graphical method for the number of theoretical stages required for a binary distillation
//Author: Dylan Au

/*This function returns the equilibrium mol fractions based on the relative volatility of the two components being separated
*/ 
function equilibriumCurve(α) {
    var x = [0];
    var y = [0];
    const step = 0.01;
    var xVal= 0;
    for (let i=0;i < 100;i++) {
        xVal = xVal + step;
        x.push(xVal);
        y.push(α*xVal/(1+(α-1)*xVal));
    }
    return [x,y];
}

/*This function returns the liquid mol fraction (x) in equilibrium of the given gas mol fraction (y)
*/
function x_eq(a,y){
    var x = y/ (a * (1 - y) + y)
    return x;
}